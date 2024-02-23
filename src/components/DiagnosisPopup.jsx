import React, { useEffect } from 'react'
import './DiagnosisPopup.css'
import { useState } from "react"
import { forwardRef, useImperativeHandle} from 'react';

// Define a class to represent your data
class annotation {
  constructor(comment, diagnosis, location, img) {
    this.comment = comment;
    this.diagnosis = diagnosis;
    this.location = location;
    this.img = img;
  }
}

const DiagnosisPopup = forwardRef((props, ref) => {
  console.log(props);
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

  const [annotations, setAnnotations] = useState(new Map());
  var comment = '';
  var location = 'Select...';
  var diagnosis = 'Select...';
  const irisRadius = 195;
  const irisCenter = 590;
  var image_type = "";

  if(props.image.includes("inner")){ image_type= "inner"; }
  if(props.image.includes("left")){ image_type= "left"; }
  if(props.image.includes("right")){ image_type= "right"; }

  let type = null;
  let options = ["Select..."];
  props.updatePoints(annotations);

  const childFunction = (id, img) => {
    // Your code here
    let tempMap = new Map(annotations);
    tempMap.set(id, new annotation("", "Select...", "Select...", img));
    setAnnotations(tempMap);
    console.log('Child function called!');
  };

  // Expose the function to the parent component
  useImperativeHandle(ref, () => ({
    childFunction
  }));


  function handleComment(e) {
    let tempMap = new Map(annotations);
    let attempt = annotations.get(props.circle_key);
    if(attempt != null){tempMap.set(props.circle_key, new annotation(e.target.value, attempt.diagnosis, attempt.location, image_type))}
    else{tempMap.set(props.circle_key, new annotation(e.target.value, diagnosis, location, image_type))} 
    setAnnotations(tempMap);
    props.updatePoints(tempMap);
    comment = e.target.value;
  }

  function handleDiagnosis(e) {
    let tempMap = new Map(annotations);
    let attempt = annotations.get(props.circle_key);
    if(attempt != null){tempMap.set(props.circle_key, new annotation(attempt.comment, e.target.value, attempt.location, image_type))}
    else{tempMap.set(props.circle_key, new annotation(comment, e.target.value, location, image_type))}
    setAnnotations(tempMap); 
    props.updatePoints(tempMap);
    diagnosis = e.target.value;
  }

  function handleLocation(e) {
    let tempMap = new Map(annotations);
    let attempt = annotations.get(props.circle_key);
    if(attempt != null){tempMap.set(props.circle_key, new annotation(attempt.comment, attempt.diagnosis, e.target.value, image_type))}
    else{tempMap.set(props.circle_key, new annotation(comment, diagnosis, e.target.value, image_type))}
    setAnnotations(tempMap);
    props.updatePoints(tempMap);
    location = e.target.value; 
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
  }

  var attempt = annotations.get(props.circle_key);
  if (attempt != null){
    comment = attempt.comment;
    diagnosis = attempt.diagnosis;
    if (attempt.location === "Disc") {
      location = "Disc"; 
      type = disc; 
    } else if (attempt.location === "Macula") {
      location = "Macula"; 
      type = macula; 
    } else if (attempt.location === "Vessels") { 
      location = "Vessels";
      type = vessels; 
    } else if (attempt.location === "Iris") { 
      location = "Iris";
      type = iris;
    }
  } else if ((Math.pow(props.X - irisCenter, 2) + Math.pow(props.Y - irisCenter, 2)) <= Math.pow(irisRadius, 2)){
    let tempMap = new Map(annotations);
    tempMap.set(props.circle_key, new annotation(comment, diagnosis, "Iris", image_type));
    setAnnotations(tempMap);
    props.updatePoints(tempMap);
    type = iris;
    location = "Iris";
  } else {
    type = null;
  }
    if (type) { 
    options = type.map((el) => <option key={el}>{el}</option>); 
  } else {
    options = empty.map((el) => <option key={el}>{el}</option>); 
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
            <select className = "form-select" value = {annotations.has(props.circle_key) ? annotations.get(props.circle_key).diagnosis : 'Select...'} onChange = {handleDiagnosis}>
              {options}
            </select>
        </div>
        <h3>Comments</h3>
          <textarea name = "comment" type = "text" id = "comment" value = {annotations.has(props.circle_key) ? annotations.get(props.circle_key).comment : ''} onChange={handleComment}></textarea>
        <br/>
        <br/>
        <button className="done-button" onClick= {() => {
          let tempMap = new Map(annotations);
          let attempt = annotations.get(props.circle_key);
          if(attempt == null){
            tempMap.set(props.circle_key, new annotation(comment, diagnosis, location, image_type));
            setAnnotations(tempMap);
          }
          props.updatePoints(tempMap);
          props.setTrigger(false);

          props.onSave(tempMap);
          }
        }>Done</button>
        <button className="delete-button" onClick= {() => {
          let tempMap = new Map(annotations);
          let attempt = annotations.get(props.circle_key);
          if(attempt != null){tempMap.delete(props.circle_key)}
          setAnnotations(tempMap);
          props.updatePoints(tempMap);
          props.onSave(tempMap);
          props.setTrigger(false); 
          props.delete_circle(props.circle_key);
        }}>Delete</button>
      </div>
    </div>
  ) : ""
});
export default DiagnosisPopup