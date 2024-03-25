import React from 'react'
import './CreatePatientPopup.css'
import { Button } from "@aws-amplify/ui-react";

function ErrorPopup(props) {
  return ( props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <Button style={{float:'right', border:'none', borderRadius:'20px'}} onClick={()=>{
            props.setTrigger(false);
        }}> x </Button>
        <h3>{props.errormsg}</h3>
      </div>
    </div>
  ) : ""
}

export default ErrorPopup