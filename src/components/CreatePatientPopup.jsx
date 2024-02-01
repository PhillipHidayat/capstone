import React from 'react'
import './CreatePatientPopup.css'
import { PatientCreateForm } from '../ui-components'
import { Button } from "@aws-amplify/ui-react";

function CreatPatientPopup(props) {
  // console.log(props.delete_circle)
  // console.log(props.circle_key)
  const overrides = {
    "PatientCreateForm":{
        "templateColumns": "1fr 1fr",
        "templateRows": "5rem 5rem 5rem 5rem 5rem"
    },
    "CTAFlex":{
        "columnSpan": "2"
    }
  }
  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <Button style={{float:'right', border:'none', borderRadius:'20px'}} onClick={()=>{
            props.setTrigger(false);
        }}> x </Button>
        <PatientCreateForm overrides={overrides} onSuccess={()=>{
            props.setTrigger(false);
            props.refreshPatientList()
        }}></PatientCreateForm>
      </div>
    </div>
  ) : ""
}

export default CreatPatientPopup