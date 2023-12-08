import React from 'react'
import './DiagnosisPopup.css'
import DiagnosisList from "./DiagnosisList"
import { useState } from "react"

function DiagnosisPopup(props) {
  // console.log(props.delete_circle)
  // console.log(props.circle_key)
  const [comments, setComments] = useState('sample comment')
  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Select Diagnosis</h3>
        <DiagnosisList/>
        <h3>Comments</h3>
        <textarea name = "comment" type = "text" id = "comment" value = {comments} onChange={e => setComments(e.target.value)}></textarea>
        <br/>
        <br/>
        <button className="done-button" onClick= {() => props.setTrigger(false)}>Done</button>
        <button className="delete-button" onClick= {() => {
          // console.log(props.delete_circle);
          // console.log(props.circle_key);
          props.setTrigger(false); 
          props.delete_circle(props.circle_key)}}>Delete</button>
      </div>
    </div>
  ) : ""
}

export default DiagnosisPopup
