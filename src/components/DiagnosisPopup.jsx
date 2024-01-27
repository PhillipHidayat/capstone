import React from 'react'
import './DiagnosisPopup.css'
import { useState } from "react"

function DiagnosisPopup(props) {

  const disc = ["Absent spontaneous venous pulsation", "Atrophy", "Cotton wool spots", "Drusen", 
  "Edema", "Hemorrhage", "Hypoplasia", "Neovascularization", "Optic neuritis", "Pallor", 
  "Peripapillary atrophy", "Thin rim", "Tilted cup", "Tilted disc"]; 
  const macula = ["ARMD", "Atrophy", "Choroidal nevus", "CSME", "Cystoid macular edema", "Disciform scar", 
  "Drusen", "Edudates", "Foveal hypoplasia", "Hemorrhage", "Lesion", "Macular hole", "Macular thickening", 
  "Membrane", "Microaneurysms", "Mottling", "Retinal pigment epithelial detatchment", "Subretinal fibrosis"]; 
  const vessels = ["Arteriolar narrowing", "AV nicking", "Dilation", "Embolus", "Macroaneurysm", 
  "Periarterial plaques", "Periarteritis", "Periphlebitis", "Retinopathy", "Sheathing", 
  "Telangiectasia", "Tortuous", "Vascular attenuation"]; 
  const iris = ["Anterior synechiae", "Iris atrophy", "Irregular pupil", "Neovascularization", "Nevus", "Nodules", 
  "Periph iridectomy", "Posterior synechiae", "Pseudoexfoliation", "Sphincter tear", "Transillumination defects"]
  const empty = ["Select..."]

  const [comments, setComments] = useState(new Map());
  const [diagnoses, setDiagnoses] = useState(new Map());
  const [locations, setLocations] = useState(new Map());

  let type = null;
  let options = ["Select..."];

  function handleComment(e) {
    const updatedComments = new Map(comments);
    updatedComments.set(props.circle_key, e.target.value);
    setComments(updatedComments);
  }

  function handleDiagnosis(e) {
    const updatedDiagnoses= new Map(diagnoses);
    updatedDiagnoses.set(props.circle_key, e.target.value);
    setDiagnoses(updatedDiagnoses);
  }

  function handleLocation(e) {
    const updatedLocations= new Map(locations);
    updatedLocations.set(props.circle_key, e.target.value);
    setLocations(updatedLocations);
  }

  if (locations.has(props.circle_key)){
    if (locations.get(props.circle_key) === "Disc") { 
      type = disc; 
    } else if (locations.get(props.circle_key) === "Macula") { 
      type = macula; 
    } else if (locations.get(props.circle_key) === "Vessels") { 
      type = vessels; 
    } else if (locations.get(props.circle_key) === "Iris") { 
      type = iris;
    }
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
            <select className= "location-select" value = {locations.get(props.circle_key)} onChange={handleLocation}>
                <option>Select...</option>
                <option>Disc</option>
                <option>Macula</option>
                <option>Vessels</option>
                <option>Iris</option>
            </select>
        </div>
        <h3>Diagnosis</h3>
        <div className= "dropdown">
            <select className = "form-select" value = {diagnoses.get(props.circle_key)} onChange = {handleDiagnosis}>
              {options}
            </select>
        </div>
        <h3>Comments</h3>
          <textarea name = "comment" type = "text" id = "comment" value = {comments.get(props.circle_key)} onChange={handleComment}></textarea>
        <br/>
        <br/>
        <button className="done-button" onClick= {() => {
          props.setTrigger(false);
          }
        }>Done</button>
        <button className="delete-button" onClick= {() => {
          props.setTrigger(false); 
          props.delete_circle(props.circle_key)
          
          let updatedDiagnoses= new Map();
          let updatedLocations= new Map();
          let updatedComments= new Map();
          for (let i = 0; i < props.circle_key; i++){
            updatedDiagnoses.set(i, diagnoses.get(i));
            updatedLocations.set(i, locations.get(i));
            updatedComments.set(i, comments.get(i));
          }
          for (let i = props.circle_key; i < diagnoses.size - 1; i++){
            updatedDiagnoses.set(i, diagnoses.get(i + 1));
            updatedLocations.set(i, locations.get(i + 1));
            updatedComments.set(i, comments.get(i + 1));
          }
          setDiagnoses(updatedDiagnoses);
          setLocations(updatedLocations);
          setComments(updatedComments);
        }}>
            Delete
          </button>

      </div>
    </div>
  ) : ""
}

export default DiagnosisPopup
