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

const DiagnosisPopup = (props) => {
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

  //New Categories
  const vitreous = ["Normal", "Asteroid Hyalosis", "Cells", "Central Vitreous Floaters", "Haze", "Hemmorrhage", "Membranes",
  "Posterior Vitreous Detachment", "Shafer's Sign", "Vitreous Syneresis", "Weiss Ring"];
  const lens = ["Normal", "AC IOL", "Ant cortical changes", "ASC", "Aphakia", "Cortical cataract", "Cortical spokes", "Mittendorf dot",
  "Nuclear sclerosis", "Open posterior capsule", "Pigment deposits", "PCO", "PC IOL", "PSC", "Pseudoexfoliation", "Subluxed", "Vacuoles"];
  const AC = ["Normal", "Cell", "Fibrin", "Flare", "Flat", "Gas Bubble", "Hyphema", "Narrow angle", "Shallow", "Tube", "Vitreous strands"];
  const cornea = ["Normal", "Clear incision", "Debris in tear film", "Degeneration", "Dendrite", "Descemet's folds", "Dystrophy", "Edema", "Epithelial defect",
  "Guttata", "Infiltrates", "Keratic precipitates", "Keratitis", "Krukenberg's spindle", "Neovascularization", "Opacity", "Keratoplasty", "PEE", "Scar", "Striae"];
  const conjunctiva = ["Normal", "Bleb", "Chemosis", "Concretions", "Conjuctivochalasis", "Cyst", "Episcleritis", "Exudate", "Follicles", "GDD Implant", "Injection",
  "Limbal flush", "Neoplasm", "Papilla", "Pigmentation", "Pinguecula", "Pterygium", "Scleritis", "Subconj hemmorrhage", "Trauma"];
  const lids = ["Normal", "Blepharitis", "Chalazlon", "Collarettes", "Dermatochalasis UL", "Dermatochalasis LL", "Eccymosis", "Ectropion", "Entropion",
  "Hordeolum", "Irregular lid margins", "Lid retraction", "Lid Thickening", "MGD", "Ptosis", "Scieral show", "Scurf", "Telangiectasia", 
  "Trichiasis UL", "Trichiasis LL", "Xanthelasma"];

  var comment = '';
  var location = 'Select...';
  var diagnosis = 'Select...';
  const irisRadius = 195;
  const irisCenter = 590;
  var image_type = "";

  let imgOptions = ["Other"];

  if(props.image.includes("inner")){ image_type= "inner"; imgOptions = ["Select...", "Lens", "Conjunctiva", "Anterior Chamber" , "Iris", "Vitreous" , "Other"];}
  else if(props.image.includes("left-eye")){ image_type= "left-eye"; imgOptions = ["Select...", "Lens", "Lids/Lashes", "Anterior Chamber", "Iris", "Disc", "Conjunctiva", "Cornea", "Vitreous" ,"Other"];}
  else if(props.image.includes("right-eye")){ image_type= "right-eye"; imgOptions = ["Select...", "Lens", "Lids/Lashes", "Anterior Chamber" ,"Iris", "Disc", "Conjunctiva", "Cornea", "Vitreous" ,"Other"];}
  else if(props.image.includes("macula_left")){image_type = "macula_left"; imgOptions = ["Select...", "Macula", "Vessels", "Other"];}
  else if(props.image.includes("macula_right")){image_type = "macula_right"; imgOptions = ["Select...", "Macula", "Vessels", "Other"];}

  let type = null;
  let options = ["Select..."];

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

  function handleComment(e) {
    let tempMap = new Map(props.annotations);
    let attempt = props.annotations.get(props.circle_key);
    if(attempt != null){tempMap.set(props.circle_key, new annotation(e.target.value, attempt.diagnosis, attempt.location, image_type))}
    else{tempMap.set(props.circle_key, new annotation(e.target.value, diagnosis, location, image_type))} 
    props.setAnnotations(tempMap);
    comment = e.target.value;
  }

  function handleDiagnosis(e) {
    let tempMap = new Map(props.annotations);
    let attempt = props.annotations.get(props.circle_key);
    if(attempt != null){tempMap.set(props.circle_key, new annotation(attempt.comment, e.target.value, attempt.location, image_type))}
    else{tempMap.set(props.circle_key, new annotation(comment, e.target.value, location, image_type))}
    props.setAnnotations(tempMap);
    diagnosis = e.target.value;
  }

  function handleLocation(e) {
    let tempMap = new Map(props.annotations);
    let attempt = props.annotations.get(props.circle_key);
    if (attempt != null && attempt.diagnosis == "Select..."){attempt.diagnosis="Normal";}
    if(attempt != null){tempMap.set(props.circle_key, new annotation(attempt.comment, attempt.diagnosis, e.target.value, image_type))}
    else{tempMap.set(props.circle_key, new annotation(comment, diagnosis, e.target.value, image_type))}
    props.setAnnotations(tempMap);
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
      case "Lens":
        type = lens;
        break;
      case "Lids/Lashes":
        type = lids;
        break;
      case "Anterior Chamber":
        type = AC;
        break;
      case "Cornea":
        type = cornea;
        break;
      case "Vitreous":
        type = vitreous;
        break;
      case "Conjunctiva":
        type = conjunctiva;
        break;
      default:
        type = empty;
        break;
    }
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  var attempt = props.annotations.get(props.circle_key);
  if (attempt != null){
    comment = attempt.comment;
    diagnosis = attempt.diagnosis;
    switch(attempt.location){
      case "Disc":
        location = "Disc";
        type = disc;
        break;
      case "Iris":
        location = "Iris";
        type = iris;
        break;
      case "Macula":
        location = "Macula";
        type = macula;
        break;
      case "Vessels":
        location = "Vessels";
        type = vessels;
        break;
      case "Lens":
        location = "Lens";
        type = lens;
        break;
      case "Lids/Lashes":
        location = "Lids/Lashes";
        type = lids;
        break;
      case "Anterior Chamber":
        location = "Anterior Chamber";
        type = AC;
        break;
      case "Cornea":
        location = "Cornea";
        type = cornea;
        break;
      case "Vitreous":
        location = "Vitreous";
        type = vitreous;
        break;
      case "Conjunctiva":
        location = "Conjunctiva";
        type = conjunctiva;
        break;
      default:
        type = empty;
        break;
    }
  } else if ((Math.pow(props.X - irisCenter, 2) + Math.pow(props.Y - irisCenter, 2)) <= Math.pow(irisRadius, 2)){
    let tempMap = new Map(props.annotations);
    tempMap.set(props.circle_key, new annotation(comment, diagnosis, "Iris", image_type));
    props.setAnnotations(tempMap);
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
            <select className= "location-select" value = {props.annotations.has(props.circle_key) ? props.annotations.get(props.circle_key).location : 'Select...'} onChange={handleLocation}>
            {imgOptions.map((el) => <option key={el}>{el}</option>)}
            </select>
        </div>
        <h3>Diagnosis</h3>
        <div className= "dropdown">
            <select className = "form-select" value = {props.annotations.has(props.circle_key) ? props.annotations.get(props.circle_key).diagnosis : 'Select...'} onChange = {handleDiagnosis}>
              {options}
            </select>
        </div>
        <h3>Comments</h3>
          <textarea name = "comment" type = "text" id = "comment" value = {props.annotations.has(props.circle_key) ? props.annotations.get(props.circle_key).comment : ''} onChange={handleComment}></textarea>
        <br/>
        <h3>Preview:</h3>
        <textarea disabled value={convertShorthand(comment)}></textarea>
        <br/>
        <button className="done-button" onClick= {() => {
          let tempMap = new Map(props.annotations);
          let attempt = props.annotations.get(props.circle_key);
          if(attempt == null){
            tempMap.set(props.circle_key, new annotation(comment, diagnosis, location, image_type));
          }
          props.setAnnotations(tempMap);
          props.setTrigger(false);
          props.onSave(tempMap);
          if(props.pdfToggled) {
            props.reloadPDF(tempMap);
          }
        }
        }>Done</button>
        <button className="delete-button" onClick= {() => {
          let tempMap = new Map(props.annotations);
          let attempt = props.annotations.get(props.circle_key);
          if(attempt != null){tempMap.delete(props.circle_key)}
          props.setAnnotations(tempMap);
          if(props.pdfToggled){
            props.reloadPDF(tempMap);
          }
          // props.onSave(tempMap);
          props.setTrigger(false); 
          props.delete_circle(props.circle_key);
          props.onDelete(props.circle_key)
        }}>Delete</button>
      </div>
    </div>
  ) : ""
};
export default DiagnosisPopup