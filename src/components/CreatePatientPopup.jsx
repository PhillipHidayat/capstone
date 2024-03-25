import React from 'react'
import './CreatePatientPopup.css'
import { PatientCreateForm } from '../ui-components'
import { Button } from "@aws-amplify/ui-react";

function CreatPatientPopup(props) {
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
            props.refreshPatientList();
        }}> x </Button>
        <PatientCreateForm overrides={overrides} onSuccess={(modelFields)=>{
            props.setTrigger(false);
            props.addPT(modelFields);
        }} onError={(modelFields, errormsg) =>{props.setTrigger(false); props.newError(errormsg);}}></PatientCreateForm>
      </div>
    </div>
  ) : ""
}

export default CreatPatientPopup