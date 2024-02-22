import React, { useEffect } from 'react'
import './DiagnosisPopup.css'
import { useState } from "react"

// Define a class to represent your data
class annotation {
  constructor(comment, diagnosis, location) {
    this.comment = comment;
    this.diagnosis = diagnosis;
    this.location = location;
  }
}

function DiagnosisPopup(props) {

  const disc = ["Normal", "Absent spontaneous venous pulsation", "Atrophy", "Cotton wool spots", "Drusen", 
  "Edema", "Hemorrhage", "Hypoplasia", "Neovascularization", "Optic neuritis", "Pallor", 
  "Peripapillary atrophy", "Thin rim", "Tilted cup", "Tilted disc"]; 
  const macula = ["Normal", "ARMD", "Atrophy", "Choroidal nevus", "CSME", "Cystoid macular edema", "Disciform scar", 
  "Drusen", "Edudates", "Foveal hypoplasia", "Hemorrhage", "Lesion", "Macular hole", "Macular thickening", 
  "Membrane", "Microaneurysms", "Mottling", "Retinal pigment epithelial detatchment", "Subretinal fibrosis"]; 
  const vessels = ["Normal", "Arteriolar narrowing", "AV nicking", "Dilation", "Embolus", "Macroaneurysm", 
  "Periarterial plaques", "Periarteritis", "Periphlebitis", "Retinopathy", "Sheathing", 
  "Telangiectasia", "Tortuous", "Vascular attenuation"]; 
  const iris = ["Normal", "Anterior synechiae", "Iris atrophy", "Irregular pupil", "Neovascularization", "Nevus", "Nodules", 
  "Periph iridectomy", "Posterior synechiae", "Pseudoexfoliation", "Sphincter tear", "Transillumination defects"];
  const empty = ["Select..."];

  const [imgAnnotations, setImgAnnotations] = useState(new Map());
  const [annotations, setAnnontations] = useState(new Map());
  const [comment, setComment] = useState("");
  const [diagnosis, setDiagnosis] = useState("Select...");
  const [location, setLocation] = useState("Select...");
  const irisRadius = 195;
  const irisCenter = 590;
  var image_type = "";

  if(props.image.includes("inner")){ image_type= "inner"; }
  if(props.image.includes("left")){ image_type= "left"; }
  if(props.image.includes("right")){ image_type= "right"; }

  let type = null;
  let options = ["Select..."];

  function handleComment(e) {
    const newComment = e.target.value.slice(0);
    setComment(newComment);
  }

  function handleDiagnosis(e) {
    setDiagnosis(e.target.value);
  }

  function handleLocation(e) {
    const newLocation = e.target.value.slice(0);
    setLocation(newLocation);
    switch(e.target.value){
      case "Disc":
        type = disc;
        break;
      case "Iris":
        type = iris;
        break;
      case "Macula":
        type = macula;
        break;
      case "Vessels":
        type = vessels;
        break;
      default:
        type = empty;
        break;
    }
    options = type.map((el) => <option key={el}>{el}</option>);
    if(annotations.has(props.circle_key)){annotations.get(props.circle_key).location = e.target.value}
    else{annotations.set(props.circle_key, new annotation(comment, diagnosis, e.target.value))} 
  }

  function updateFields(val) { 
    var attempt = annotations.get(props.circle_key);
      if (attempt != null){
        if(attempt.location != "") {setLocation(attempt.location)}
        if(attempt.diagnosis != "") {setDiagnosis(attempt.diagnosis)}
        setComment(attempt.comment);
      }
    if (attempt != null){
      if (attempt.location === "Disc") { 
        type = disc; 
      } else if (attempt.location === "Macula") { 
        type = macula; 
      } else if (attempt.location === "Vessels") { 
        type = vessels; 
      } else if (attempt.location === "Iris") { 
        type = iris;
      }
    } else if ((Math.pow(props.X - irisCenter, 2) + Math.pow(props.Y - irisCenter, 2)) <= Math.pow(irisRadius, 2)){
      type = iris;
    } else {
      type = null;
    }
  
    if (type) { 
      options = type.map((el) => <option key={el}>{el}</option>); 
    } else {
      options = empty.map((el) => <option key={el}>{el}</option>); 
    }

    switch (val){
      case "comment":
        return comment;
      case "diagnosis":
        return diagnosis;
      case "location":
        return location;
    }

  }

  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Location</h3>
        <div className= "location-dropdown">
            <select className= "location-select" value = {annotations.has(props.circle_key) ? annotations.get(props.circle_key).location : 'Select...'} onChange={handleLocation}>
                <option>Select...</option>
                <option>Disc</option>
                <option>Macula</option>
                <option>Vessels</option>
                <option>Iris</option>
            </select>
        </div>
        <h3>Diagnosis</h3>
        <div className= "dropdown">
            <select className = "form-select" value = {updateFields("diagnosis")} onChange = {handleDiagnosis}>
              {options}
            </select>
        </div>
        <h3>Comments</h3>
          <textarea name = "comment" type = "text" id = "comment" value = {updateFields("comment")} onChange={handleComment}></textarea>
        <br/>
        <br/>
        <button className="done-button" onClick= {() => {
          let updateData = new Map(annotations);
          updateData.set(props.circle_key, new annotation(comment, diagnosis, location));
          setAnnontations(updateData);
          console.log(updateData);
          props.setTrigger(false);
          //props.onSave(comments, diagnoses, locations);
          }
        }>Done</button>
        <button className="delete-button" onClick= {() => {
          // props.setTrigger(false); 
          // props.delete_circle(props.circle_key);
          
          // let updatedDiagnoses= new Map();
          // let updatedLocations= new Map();
          // let updatedComments= new Map();
          // for (let i = 0; i < props.circle_key; i++){
          //   updatedDiagnoses.set(i, diagnoses.get(i));
          //   updatedLocations.set(i, locations.get(i));
          //   updatedComments.set(i, comments.get(i));
          // }
          // for (let i = props.circle_key; i < diagnoses.size - 1; i++){
          //   updatedDiagnoses.set(i, diagnoses.get(i + 1));
          //   updatedLocations.set(i, locations.get(i + 1));
          //   updatedComments.set(i, comments.get(i + 1));
          // }
          // setDiagnoses(updatedDiagnoses);
          // setLocations(updatedLocations);
          // setComments(updatedComments);
          // let updatedImgComments = new Map(imgComments);
          // let updatedImgDiagnoses = new Map(imgDiagnoses);
          // let updatedImgLocations = new Map(imgLocations);
          // updatedImgComments.set(image_type, updatedComments);
          // updatedImgDiagnoses.set(image_type, updatedDiagnoses);
          // updatedImgLocations.set(image_type, updatedLocations);
          // setImgComments(updatedImgComments);
          // setImgDiagnoses(updatedImgDiagnoses);
          // setImgLocations(updatedImgLocations);
        }}>
            Delete
          </button>

      </div>
    </div>
  ) : ""
}

export default DiagnosisPopup
