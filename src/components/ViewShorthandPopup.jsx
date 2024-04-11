import React from 'react'
import './CreatePatientPopup.css'
import { ShorthandCreateForm } from '../ui-components'
import { Button, Grid, Text, Accordion, SelectField, ThemeProvider, Theme } from "@aws-amplify/ui-react";
import { DataStore } from '@aws-amplify/datastore';

function ViewShorthandPopup(props) {
  const overrides = {
    "ShorthandCreateForm":{
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
        <br></br>
        <br></br>   
        <Accordion.Container>
        {props.shorthandList.map(shorthand => (
          <Accordion.Item 
          value={shorthand.id} 
          marginBottom="4px"
          marginTop="4px"
          borderRadius="1rem"
          key={shorthand.id} 
          >
            <Accordion.Trigger style={{borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}}>
            <Grid templateColumns="1fr 1fr" templateRows="2rem" width="100%" >
                  <Text fontSize="20">{shorthand.key}</Text>
                </Grid>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content >
            <Text>{shorthand.value}</Text>
            <Button style={{display: 'block', margin: 'auto', border:'none', borderRadius:'20px'}} onClick={()=>{
                DataStore.delete(shorthand);
                props.setTrigger(false);
            }}> Delete </Button>
            </Accordion.Content>
          </Accordion.Item>
          ))}
        </Accordion.Container>
        <br></br>
        <br></br>
        <Button style={{float:'middle', border:'none', borderRadius:'20px'}} onClick={()=>{
            props.setCreate(true);
        }}> Add New Shortcode </Button>
      </div>
    </div>
  ) : ""
}

export default ViewShorthandPopup