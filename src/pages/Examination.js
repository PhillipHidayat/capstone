import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Menu from "../components/Menu";
import "../App.css";
import lefteyeSource from "../images/left-eye.jpg";
import righteyeSource from "../images/right-eye.jpg";
import innereyeSource from "../images/inner-eye.jpg";
import redDotImage from "../images/redDot.jpg";
import CanvasApp from "../components/CanvasApp";
import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import { Amplify, Storage } from 'aws-amplify';
import { withAuthenticator, Button, Flex, Heading, Image, Text, Grid } from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';
import { Patient } from '../models'
import '@aws-amplify/ui-react/styles.css';
import awsconfig from '../aws-exports';
import DroppableComponent from '../components/DroppableComponent';
import DiagnosisPopup from "../components/DiagnosisPopup.jsx";
import html2pdf from 'html2pdf.js';

Amplify.configure(awsconfig);

// enableRipple(true);
// DocumentEditorComponent.Inject(Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog);

let i=0;

function Examination(props) {
  const childRef = useRef();
  const [reloadItems, setReloadItems] = useState(false);
  const [reloadObject, setReloadObject] = useState();
  const [objectState, setObjectState] = useState({
    selected: 0,
    mapping: 0
  });
  const [lineColor, setLineColor] = useState("#000000");
  const [brushSize, setLineWidth] = useState(10);
  const [brushOpacity, setLineOpacity] = useState(1);
  const [popupVisible, setPopupVisible] = useState(false)
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  const [MarkDown, setInput] = useState("");
// setting delete function and key for popup
const [key, setKey] = useState(0);
const [delete_circle, set_delete_circle] = useState();
const [displayPdf, setPDF] = useState("JVBERi0xLjMKJbrfrOAKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA1OTUuMjc5OTk5OTk5OTk5OTcyNyA4NDEuODg5OTk5OTk5OTk5OTg2NF0KL0NvbnRlbnRzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9MZW5ndGggMTA3Cj4+CnN0cmVhbQowLjU2NzAwMDAwMDAwMDAwMDEgdwowIEcKcQo1OTUuMjc5OTk5OTk5OTk5OTcyNyAwIDAgMTguMDAyNDE5MzU0ODM4NzA3NSAwLiA4MjMuODg3NTgwNjQ1MTYxMjc4OSBjbQovSTAgRG8KUQplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSIF0KL0NvdW50IDEKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCi9GaXJzdENoYXIgMzIKL0xhc3RDaGFyIDI1NQo+PgplbmRvYmoKNiAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9IZWx2ZXRpY2EtT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLUJvbGRPYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL0Jhc2VGb250IC9Db3VyaWVyCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllci1Cb2xkCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllci1PYmxpcXVlCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjEyIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvQ291cmllci1Cb2xkT2JsaXF1ZQovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxMyAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLVJvbWFuCi9TdWJ0eXBlIC9UeXBlMQovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwovRmlyc3RDaGFyIDMyCi9MYXN0Q2hhciAyNTUKPj4KZW5kb2JqCjE0IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtQm9sZAovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNSAwIG9iago8PAovVHlwZSAvRm9udAovQmFzZUZvbnQgL1RpbWVzLUl0YWxpYwovU3VidHlwZSAvVHlwZTEKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKL0ZpcnN0Q2hhciAzMgovTGFzdENoYXIgMjU1Cj4+CmVuZG9iagoxNiAw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PAovUHJvY1NldCBbL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSV0KL0ZvbnQgPDwKL0YxIDUgMCBSCi9GMiA2IDAgUgovRjMgNyAwIFIKL0Y0IDggMCBSCi9GNSA5IDAgUgovRjYgMTAgMCBSCi9GNyAxMSAwIFIKL0Y4IDEyIDAgUgovRjkgMTMgMCBSCi9GMTAgMTQgMCBSCi9GMTEgMTUgMCBSCi9GMTIgMTYgMCBSCi9GMTMgMTcgMCBSCi9GMTQgMTggMCBSCj4+Ci9YT2JqZWN0IDw8Ci9JMCAxOSAwIFIKPj4KPj4KZW5kb2JqCjIwIDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMi41LjEpCi9DcmVhdGlvbkRhdGUgKEQ6MjAyNDAxMjUyMTQ4NTAtMDcnMDAnKQo+PgplbmRvYmoKMjEgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCi9PcGVuQWN0aW9uIFszIDAgUiAvRml0SCBudWxsXQovUGFnZUxheW91dCAvT25lQ29sdW1uCj4+CmVuZG9iagp4cmVmCjAgMjIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzEwIDAwMDAwIG4gCjAwMDAwMDUzOTEgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTUyIDAwMDAwIG4gCjAwMDAwMDAzNjcgMDAwMDAgbiAKMDAwMDAwMDQ5MiAwMDAwMCBuIAowMDAwMDAwNjIyIDAwMDAwIG4gCjAwMDAwMDA3NTUgMDAwMDAgbiAKMDAwMDAwMDg5MiAwMDAwMCBuIAowMDAwMDAxMDE1IDAwMDAwIG4gCjAwMDAwMDExNDQgMDAwMDAgbiAKMDAwMDAwMTI3NiAwMDAwMCBuIAowMDAwMDAxNDEyIDAwMDAwIG4gCjAwMDAwMDE1NDAgMDAwMDAgbiAKMDAwMDAwMTY2NyAwMDAwMCBuIAowMDAwMDAxNzk2IDAwMDAwIG4gCjAwMDAwMDE5MjkgMDAwMDAgbiAKMDAwMDAwMjAzMSAwMDAwMCBuIAowMDAwMDAyMTI3IDAwMDAwIG4gCjAwMDAwMDU2NTAgMDAwMDAgbiAKMDAwMDAwNTczNiAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIyCi9Sb290IDIxIDAgUgovSW5mbyAyMCAwIFIKL0lEIFsgPEYxNDU5QTQ3QkEzRjEwOTgxNDcxNDU2NkE0Q0M1RjU2PiA8RjE0NTlBNDdCQTNGMTA5ODE0NzE0NTY2QTRDQzVGNTY+IF0KPj4Kc3RhcnR4cmVmCjU4NDAKJSVFT0Y=");
const [patient, setPatient] = useState("");
const [imagePath, setImagePath] = useState(lefteyeSource);
const [annotations, setNotes] = useState();

//Function used to define the HTML formatting for the PDF Preview
const reloadPDF = (comments, diagnoses, locations) => {
  if (!comments || !diagnoses || !locations) {
    if(!comments){
      console.error("Comments are undefined.");
    }
    if(!diagnoses){
      console.error("Diagnoses are undefined.");
    }
    if(!locations){
      console.error("Locations are undefined.");
    }
    return;
  }
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

  var locationList = ["Iris", "Vessels", "Macula", "Disc", "Select..."];

  locationList.forEach((category) => {
    var isFirst = true;
    var diagnosesAdded = false;
    if(category == "Select..."){s +="\n<tr><td>Other Comments</td><td>";}
    else{s +="\n<tr><td>" + category + "</td><td>";}
    if(category != "Select..."){
    s += "Diagnoses: "
    locations.forEach((values, keys) => {
      if(values == category){
        if(diagnoses.has(keys)){
          diagnosesAdded = true;
          if(isFirst){
            s+= " " + diagnoses.get(keys);
            isFirst = false;
          }
          else{
          s += ", " + diagnoses.get(keys);
          }
        }
      }
      });
      if(!diagnosesAdded){s += " Normal"}
    }
    isFirst = true;
    if(category != "Select..."){s += "<br>Comments: ";}
    else{s += "Comments: ";}
    locations.forEach((values, keys) => {
      if(values == category){
        if(comments.has(keys)){
          if(isFirst){
            s+= " " + comments.get(keys);
            isFirst = false;
          }
          else{
          s += ", " + comments.get(keys);
          }
        }
      }
      });
    s += "</td></tr>";
   });
  s += "\n</table>\n</body>\n</html>";
  html2pdf().from(s).outputPdf().then(function(pdf) {
        setPDF(btoa(pdf));
    });
}

useEffect(() => {
  // Fetch list of patients 
  //console.log("called");
  fetchPatients(props.patient) 
    .then(pt => {
      //console.log(pt);
      setPatient(pt);
    });
}, [])

//Updates the PDF after the patient information has been saved
useEffect(() => {
  reloadPDF([], [], []);
}, [patient]);

async function fetchPatients(id) {
  // API call to get patients
  try {
    const posts = await DataStore.query(Patient, id);
    // console.log('Posts retrieved successfully!');
    //console.log(posts);
    return posts;
  } catch (error) {
    console.log('Error retrieving posts', error);
  }
  return []
}

var method = setObjectState
if (i==0){
    method();
    i++
}
  


const onDragEnd = (result)=> {
  setReloadItems(true);
  setReloadObject(result);
}

const handleSetPopUp = (value,delete_function,key)=> {
  set_delete_circle(()=>delete_function);
  setKey(key);
  setPopupVisible(value);
}

function setAnnotations(map){
  setNotes(map);
}

const handleCoords = (x, y) => {
  setXCoord(x);
  setYCoord(y);
};

const addAnnotation = (id, sourceImg) =>{
  console.log(childRef);
  childRef.current.childFunction(id, sourceImg);
}

  return (
    //style={{backgroundImage: `url(${imgSource})`}}
    <div className="App" >
      <h1>MedCapture</h1>
      <Grid templateColumns="1fr 1fr" width="100%" paddingLeft="40px"><h2 float="left">Exam for Patient: {patient?.First_Name} {patient?.Last_Name}</h2></Grid>
      <DiagnosisPopup X = {xCoord} Y = {yCoord} trigger= {popupVisible} setTrigger= {setPopupVisible} delete_circle={delete_circle} circle_key={key}
      onSave={reloadPDF} image={imagePath} updatePoints={setAnnotations} ref={childRef}></DiagnosisPopup>
      <Menu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity}
      brushSize={brushSize} brushOpacity={brushOpacity} />
      <div class="button-container">
      <button onClick={() => {setImagePath(lefteyeSource);}}>Left Eye</button>
      <button onClick={() => {setImagePath(righteyeSource);}}>Right Eye</button>
      <button onClick={() => {setImagePath(innereyeSource);}}>Inner Eye</button>
      </div>
      <div className="draw-area" >
        <div className="background-image" style={{
        backgroundImage: `url(${imagePath})`,
        backgroundSize: '1280px 1000px',
        height: '1000px'
      }}>
        <CanvasApp width={1276} height={1000} popup = {handleSetPopUp} setObjectState={() => method} lineColor={lineColor} brushSize={brushSize} brushOpacity={brushOpacity} 
        returnCoords = {handleCoords} notes={annotations != null ? annotations : new Map()} image={imagePath} addAnnotation={addAnnotation}/>
        </div>
      
      </div>
      <div id="markdown-rectangle">
          {
          <embed src={`data:application/pdf;base64,${displayPdf}`} height= '100%' width='100%' />
          }
      </div>
    </div>
  );
}
export default Examination;