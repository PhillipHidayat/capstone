import { useEffect, useRef, useState } from "react";
import Menu from "../components/Menu";
import "../App.css";
import lefteyeSource from "../images/left-eye.jpg";
import righteyeSource from "../images/right-eye.jpg";
import innereyeSource from "../images/inner-eye.jpg";
import maculaRight from "../images/macula_right.jpg";
import maculaLeft from "../images/macula_left.jpg";
import CanvasApp from "../components/CanvasApp";
import * as React from 'react';
import { Amplify, Storage } from 'aws-amplify';
import { withAuthenticator, Button, Text, Accordion } from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';
import { Diagnoses, Patient, Exam , Shorthand} from '../models'
import '@aws-amplify/ui-react/styles.css';
import awsconfig from '../aws-exports';
import DiagnosisPopup from "../components/DiagnosisPopup.jsx";
import html2pdf from 'html2pdf.js';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'

Amplify.configure(awsconfig);

// Define a class to represent Annotation Data
class annotation {
  constructor(comment, diagnosis, location, img) {
    this.comment = comment;
    this.diagnosis = diagnosis;
    this.location = location;
    this.img = img;
  }
}

function Examination(props) {
  // Properties that are sent to CanvasApp
  const [lines, setLines] = React.useState([]);
  const [state, setState] = React.useState({
    id: -1,
    isDragging: false,
    x: 50,
    y: 50,
    lastLine: -1
  });
  const [lineColor, setLineColor] = useState("#000000");
  const [brushSize, setLineWidth] = useState(10);
  const [brushOpacity, setLineOpacity] = useState(1);
  const [height, setHeight] = useState(834);
  
  //Properties that are sent to DiagnosisPopUp
  const [popupVisible, setPopupVisible] = useState(false)
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  // setting delete function and key for popup
  const [key, setKey] = useState(0);
  const [delete_circle, set_delete_circle] = useState();

  //Global Variables used throughout DiagnosisPopup, CanvasApp, and Examination Page
  const [imagePath, setImagePath] = useState(lefteyeSource);
  const [displayPdf, setPDF] = useState("");
  const [patient, setPatient] = useState("");
  const [exam, setExam] = useState("");
  const [annotations, setAnnotations] = useState(new Map());
  const { id } = useParams() // get patient id from url
  const [pdfToggled, setToggle] = useState(false);


  //Annotations Set Up and functions
  async function onSaveHandler(tempMap){
    tempMap.forEach(async (value, key)=>{
      let diagnosis = {
        Exam: "test",
        Location: value.location,
        examID: exam.id,
        Key: key
      };

      diagnosis.Normal = (value.diagnosis == "Normal");
      diagnosis.Diagnoses = value.diagnosis;
      diagnosis.Notes = value.comment; // diagnosis has comments

      let img = "left-eye";
      if (imagePath.includes("right-eye")) {
        img = "right-eye";
      }else if (imagePath.includes("inner")) {
        img = "inner";
      }else if (imagePath.includes("macula_right")) {
        img = "macula_right";
      }else if (imagePath.includes("macula_left")) {
        img = "macula_left"
      }
      diagnosis.LocationDetails = {x: xCoord, y: yCoord, bSize: brushSize, bColor: lineColor, bOpacity: brushOpacity, img: img};
    
      diagnosis = new Diagnoses(diagnosis);
      const original = await DataStore.query(Diagnoses, (d)=> 
      d.and(d=>[
        d.Key.eq(key), // every diagnosis shouls have a unique key for each patient
        d.examID.eq(exam.id) // makes sure we are searching the correct patient
      ]));
      if (original.length != 0) {
        let actual = original[0];
        // Checks if there is already an entry for the following and will update databse to reflect
        const updatedPost = await DataStore.save(
          Diagnoses.copyOf(actual, updated => {
            updated.Exam = diagnosis.Exam;
            updated.Location = diagnosis.Location;
            updated.Diagnoses = diagnosis.Diagnoses;
            // updated.LocationDetails = diagnosis.LocationDetails;
            updated.Normal = diagnosis.Normal;
            updated.Notes = diagnosis.Notes;
          })
        );
      }else{
        // New Post
        await DataStore.save(diagnosis);
      }
    });
  }
  
  async function loadDiagnosesForPatient(){
    //let exam1 = await DataStore.query(Exam, exam.id) // so data is not stale
    let diagnoses = await exam.Diagnoses?.toArray();
    console.log(diagnoses)
    handleLoad(diagnoses);
  }
  
  
  async function deleteDiagnoses(key){
    let deleted = await DataStore.delete(Diagnoses, d => d.and(d=>[
      d.Key.eq(key), // every diagnosis shouls have a unique key for each patient
      d.examID.eq(exam.id) // makes sure we are searching the correct patient
    ]));
  }

  const handleLoad = (diags) => {
    let l = [];
    let tempMap = new Map(annotations);
    for (let i = 0; i < diags?.length; i++) {
      let d = diags[i];
      let ann = d.LocationDetails;
      tempMap.set(d.Key, new annotation(d.Notes, d.Diagnoses, d.Location, ann.img));
      l.push({ id: d.Key, points: [ann.x, ann.y], bColor: ann.bColor, bSize: ann.bSize, bOpacity: ann.bOpacity});
    }
    setLines(l);
    setAnnotations(tempMap);
    if(pdfToggled){
      reloadPDF(tempMap);
    }
  };

  //Function used to define the HTML formatting for the PDF Preview
  const reloadPDF = (notes) => {
    var s = "<html>\n" +
    "<head>\n" + 
    "<style>\n" + 
    "body { margin: auto; }\n" + 
    "table, th, td {\n" + 
    "border: 1px solid black;\nborder-collapse: collapse;\n}\n" + "table.center{\nmargin-left: auto;\nmargin-right: auto;\n}" + 
    "</style>\n</head>\n<body>\n<h3 style=\"margin-left: 50px;\">" + patient?.First_Name + " " + patient?.Last_Name +
    "<br>" + patient?.Address +
    "<br>Date of Birth: " + patient?.Date_Of_Birth +
    "<br>Phone Number: " + patient?.Phone + "</h3>\n<table class=\"center\"style=\"table-layout:fixed\"width=\"80%\" border=\"1\">";

    var locationList = ["Iris", "Vessels", "Macula", "Disc", "Lens", "Lids/Lashes", "Anterior Chamber", "Vitreous", "Cornea", "Conjunctiva", "Select..."];

    locationList.forEach((category) => {
      var isFirst = true;
      var diagnosesAdded = false;
      if(category == "Select..."){s +="\n<tr><td>Other Comments</td><td>";}
      else{s +="\n<tr><td>" + category + "</td><td>";}
      if(category != "Select..."){
      s += "Diagnoses: "
      notes.forEach((values, keys) => {
        if(values.location == category){
          if(values.diagnosis != "Select..." && values.diagnosis != ""){
            if(isFirst){
              s += " " + values.diagnosis;
              isFirst = false;
            }else{s += ", " + values.diagnosis}
            diagnosesAdded = true;
          }
        }});
        if(!diagnosesAdded){s += " Normal"}
      }
      isFirst = true;
      if(category != "Select..."){s += "<br>Comments: ";}
      else{s += "Comments: ";}
      notes.forEach((values, keys) => {
        if(values.location == category){
          if(values.comment != ""){
          if(isFirst){
            s+= " " + convertShorthand(values.comment);
            isFirst = false;
          }else{s += ", " + convertShorthand(values.comment);}
          }
        }
        });
      s += "</td></tr>";
    });
    s += "\n</table>\n</body>\n</html>";
    html2pdf().from(s).outputPdf('bloburl').then(
      function(pdf)
      {
        setPDF(pdf);
      }
    );
  }

  function convertShorthand(note) {
    let parts = note.split(" ");
    var s = "";
    for(let i = 0; i < parts.length; i++){
      if(props.shorthand.has(parts[i].toLowerCase())){
        s += props.shorthand.get(parts[i].toLowerCase()) + ' ';
      } else {
        s += parts[i] + ' ';
      }
    }
    return s;
  }

  useEffect(() => {
    loadDiagnosesForPatient();
  }, [exam])

  useEffect(() => {
    // Fetch list of patients 
    // console.log(id)
    fetchExam(id) 
      .then(exam => {
        // console.log(exam)
        setExam(exam);
      });
  }, [id]);

  useEffect(() => {
    // Fetch list of patients 
    // console.log(id)
    fetchPatients(exam.patientID) 
      .then(patient => {
        setPatient(patient);
      });
  }, [exam]);

  //Updates the PDF after the patient information has been saved
  useEffect(() => {
    reloadPDF(new Map());
  }, [patient]);

  async function fetchExam(id) {
    // API call to get patients
    try {
      const posts = await DataStore.query(Exam, id);
      // console.log(posts)
      return posts;
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return [];
  }

  async function fetchPatients(id) {
    // API call to get patients
    try {
      // console.log(id)
      const posts = await DataStore.query(Patient, id);
      // console.log(posts)
      return posts;
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return [];
  }

  const handleSetPopUp = (value,delete_function,key)=> {
    set_delete_circle(()=>delete_function);
    setKey(key);
    setPopupVisible(value);
  }

  const handleCoords = (x, y) => {
    setXCoord(x);
    setYCoord(y);
  };

  let button = null;
  if (imagePath.includes("left-eye")) {
    button = <button class="btnRight" onClick={() => {setImagePath(righteyeSource);}}>{'Right'}</button>;
  } else if(imagePath.includes("right-eye")) {
    button = <button class="btnLeft" onClick={() => {setImagePath(lefteyeSource);}}>{'Left'}</button>;
  }
  else if (imagePath.includes("macula_left")) {
    button = <button class="btnRight" style={{height:'983px'}} onClick={() => {setImagePath(maculaRight);}}>{'Right'}</button>;
  } else if(imagePath.includes("macula_right")) {
    button = <button class="btnLeft" style={{height:'983px'}} onClick={() => {setImagePath(maculaLeft);}}>{'Left'}</button>;
  }

  return (
    <div className="App" >
      <div className="box">
        <h1 style={{textAlign: "center", color:'black', margin:"0rem"}}> Examination</h1>
        <h2 style={{textAlign: "left", color:'black', marginTop:"0"}}> Patient: {patient?.First_Name} {patient?.Last_Name}</h2>
      </div>
      <DiagnosisPopup X = {xCoord} Y = {yCoord} trigger= {popupVisible} setTrigger= {setPopupVisible} delete_circle={delete_circle} circle_key={key}
      onSave={onSaveHandler} image={imagePath} onDelete={deleteDiagnoses} reloadPDF={reloadPDF} pdfToggled={pdfToggled} annotations={annotations} 
      setAnnotations={setAnnotations} shorthand={props.shorthand}></DiagnosisPopup>
      <Menu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity}
      brushSize={brushSize} brushOpacity={brushOpacity} />
      <div className="button-container">
        <Button className="image_selection" onClick={() => {setImagePath(lefteyeSource); setHeight(834);}}>Outer Eye</Button>
        <Button className="image_selection" onClick={() => {setImagePath(innereyeSource); setHeight(834);}}>Side View</Button>
        <Button className="image_selection" onClick={() => {setImagePath(maculaLeft); setHeight(979);}}>Macula</Button>
        <Button className="image_selection" onClick={loadDiagnosesForPatient}>Load Annotations</Button>
      </div>
      <div className="draw-area" >
        <div className="background-image" style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize:'1024px ' + height + 'px',
        height: height + 'px'
      }}>
        <CanvasApp width={1024} height={height} popup = {handleSetPopUp} lineColor={lineColor} brushSize={brushSize} brushOpacity={brushOpacity} 
        returnCoords = {handleCoords} annotations={annotations} image={imagePath} setAnnotations={setAnnotations} lines={lines} setLines={setLines} state={state} setState={setState}/>
        </div>
        {button}
      </div>
      <Link to={"/summary/"+id}><Button width="200px" marginTop={30}>Save and Next</Button></Link> 
      <Accordion.Container margin="1rem">
        <Accordion.Item
          marginBottom="4px"
          marginTop="4px"
          borderRadius="1rem"
        >
          <Accordion.Trigger width={1276} style={{borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}} 
          onClick={() => {if(!pdfToggled){reloadPDF(annotations)}; setToggle(!pdfToggled); }}>
            <Text fontSize={20} width="100%" textAlign="center">View PDF</Text>            
            <Accordion.Icon/>
          </Accordion.Trigger>
          <Accordion.Content style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"1rem"}}>
            <div id="markdown-rectangle">
              {
              <iframe src={displayPdf} height= '100%' width='100%' title="EXAM"/>
              }
            </div>
          </Accordion.Content>

        </Accordion.Item>
      </Accordion.Container>
      
    </div>
  );
}
export default Examination;