import React from 'react'
import './CreatePatientPopup.css'
import ShorthandCreate from './ShorthandCreate';
import { Button } from "@aws-amplify/ui-react";

function CreateShorthandPopup(props) {
  const overrides = {
    "ShorthandCreateForm":{
        "templateColumns": "1fr 1fr",
        "templateRows": "5rem 5rem"
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
        <ShorthandCreate overrides={overrides} user={props.user} onSuccess={()=>{
            props.setTrigger(false);
        }}></ShorthandCreate>
      </div>
    </div>
  ) : ""
}

export default CreateShorthandPopup