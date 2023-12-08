import React from 'react'
import './DiagnosisPopup.css'
import DiagnosisList from "./DiagnosisList"
import { useState } from "react"

function DiagnosisPopup(props) {
  // console.log(props.delete_circle)
  // console.log(props.circle_key)
  const [comments, setComments] = useState(['sample comment', 'sample comment', 'sample comment', 'sample comment', 'sample comment', 'sample comment']);
  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Select Diagnosis</h3>
        <DiagnosisList/>
        <h3>Comments</h3>
        <textarea name = "comment" type = "text" id = "comment" value = {comments[props.circle_key]} onChange={e => {
            const updatedComments = [...comments];
            updatedComments[props.circle_key] = e.target.value;
            setComments(updatedComments);
          }}></textarea>
        <br/>
        <br/>
        <button className="done-button" onClick= {() => {
          props.setTrigger(false);
          // if(props.circle_key + 1 == comments.length) {
          // setComments(...comments, !!VALUE_IN_TEXTAREA!! )
          }
        }>Done</button>
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
