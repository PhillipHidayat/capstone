import React from 'react'
import './DiagnosisPopup.css'
import { useState } from "react"

function DiagnosisPopup(props) {
  // console.log(props.delete_circle)
  // console.log(props.circle_key)

  function handleComment(e) {
    // const updatedComments = [...comments];
    const updatedComments = new Map(comments);
    updatedComments.set(props.circle_key, e.target.value);
    setComments(updatedComments);
  }

  function handleSelect(e) {
    const updatedDiagnoses= new Map(diagnoses);
    updatedDiagnoses.set(props.circle_key, e.target.value);
    setDiagnoses(updatedDiagnoses);
  }

  // Eventually we will load options from database
  const options = [
    {label: "item 0", value: 0},
    {label: "item 1", value: 1},
    {label: "item 2", value: 2},
    {label: "item 3", value: 3},
    {label: "item 4", value: 4},
    {label: "item 5", value: 5},
    {label: "item 6", value: 6},
    {label: "item 7", value: 7},
    {label: "item 8", value: 8},
    {label: "item 9", value: 9}
]

  // const [comments, setComments] = useState(['sample comment', 'sample comment', 'sample comment', 'sample comment', 'sample comment', 'sample comment']);
  const [comments, setComments] = useState(new Map());
  const [diagnoses, setDiagnoses] = useState(new Map());
  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <h3>Select Diagnosis</h3>
        {/* <DiagnosisList display = {diagnoses.get(props.circle_key)} onChange = {handleSelect}/> */}
        <div className= "dropdown">
            <select className= "form-select" value = {diagnoses.get(props.circle_key)} onChange={handleSelect}>
                {options.map(option => (
                    <option value= {option.value}>{option.label}</option>
                ))}
            </select>
        </div>
        <h3>Comments</h3>
        {/* <textarea name = "comment" type = "text" id = "comment" value = {comments[props.circle_key]} onChange={e => {
            const updatedComments = [...comments];
            updatedComments[props.circle_key] = e.target.value;
            setComments(updatedComments);
          }}></textarea> */
          <textarea name = "comment" type = "text" id = "comment" value = {comments.get(props.circle_key)} onChange={handleComment}></textarea>}
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
