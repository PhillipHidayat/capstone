import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { Button, Grid, Text, Accordion } from "@aws-amplify/ui-react";
import CreatPatientPopup from './CreatePatientPopup';
import { SearchField } from '@aws-amplify/ui-react';
import './PatientRecords.css'
import { func } from 'prop-types';

function PatientRecords() {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false)
  const [search, setSearch] = React.useState('');

  useEffect(() => {
    // Fetch list of patients 
    // console.log("called")
    fetchPatients() 
      .then(patients => {
        let tempPatients = []
        for(let i=0; i<patients.length; i++){
          
          if (patients[i].createdAt!=null){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
        }
        setPatientList(tempPatients);
      })
  }, [])

  async function fetchPatients() {
    // API call to get patients
    try {
      const posts = await DataStore.query(Patient);
      // console.log('Posts retrieved successfully!');
      console.log(posts)
      return posts
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return []
  }

  async function refreshPatientList(){
    fetchPatients() 
      .then(patients => {
        let tempPatients = []
        for(let i=0; i<patients.length; i++){
          
          if (patients[i].createdAt!=null){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
        }
        setPatientList(tempPatients);
      })
  }

  function handlePatientClick(patient) {
    // Fetch and show patient record
    setSelectedPatient(patient);
  }

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  // It is your responsibility to set up onClear
  const onClear = async () => {
    setSearch('');
    await refreshPatientList();
  };
  function onSearch(event){
    // console.log(event)
    // console.log(search)
    fetchPatients() 
      .then(patients => {
        let tempPatients = []
        for(let i=0; i<patients.length; i++){
          // console.log(patients[i].First_Name.toLowerCase())
          // console.log(search.toLowerCase())
          if (patients[i].createdAt!=null && search==""){
            tempPatients.push(patients[i]);
          }
          else if (patients[i].createdAt!=null && patients[i].First_Name.toLowerCase()==search.toLowerCase()){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
        }
        setPatientList(tempPatients);
      })
  }
  
  return (
    <div className="patient-list">
      <CreatPatientPopup trigger= {popupVisible} setTrigger= {setPopupVisible} refreshPatientList={refreshPatientList}></CreatPatientPopup>
        <Button onClick={()=>{
          setPopupVisible(true)
        }}>Add New Patient</Button>
        <SearchField
          placeholder='Search by First Name...'
          label="search"
          onChange={onChange}
          onClear={onClear}
          onSubmit={onSearch}
          value={search}
        />
        {/* <Button onClick={async ()=>{
          await DataStore.delete(Patient, Predicates.ALL);
        }}>Delete All Records</Button> */}
        <Grid style={{borderBottom: "3px solid black"}} paddingTop="20px" paddingBottom="5px" templateColumns="1fr 1fr 1fr 1fr" templateRows="2rem">
              <Text fontSize="1.5em">First Name</Text>
              <Text fontSize="1.5em">Last Name</Text>
              <Text fontSize="1.5em">Age</Text>
              <Text fontSize="1.5em">Provider</Text>
        </Grid>
      
      <Accordion.Container>
        {patientList.map(patient => (
          <Accordion.Item 
          value={patient.id} 
          marginBottom="4px"
          marginTop="4px"
          borderRadius="3px"
          key={patient.id} 
          onClick={()=>{
            setSelectedPatient(patient)
          }
          }>
            <Accordion.Trigger>
            <Grid templateColumns="1fr 1fr 1fr 1fr" templateRows="2rem" width="100%">
                  <Text fontSize="20">{patient.First_Name}</Text>
                  <Text>{patient.Last_Name}</Text>
                  <Text paddingLeft="12px">{patient.Age}</Text>
                  <Text paddingLeft="25px">{patient.Provider}</Text>
                </Grid>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>
              <PatientProfile patient={patient}/> 
            </Accordion.Content>
          </Accordion.Item>
          ))}
        </Accordion.Container>

    </div>
  );
}

function PatientProfile(props,{patient}) {
  // console.log(patient)
  // console.log(props)
  patient = props.patient
  // Show patient profile here 
  return (
    <div>
      {/* <Button style={{float:'right', border:'none', borderRadius:'20px'}} onClick={()=>{
            props.setPatient(false);
        }}> x </Button> */}
      <Grid templateColumns="1fr 1fr" templateRows="2rem">
        <Text rowSpan={2} fontSize="2em" style={{borderBottom: ".5em black solid"}}>Patient Profile</Text>
        <Text></Text>
        <Text></Text>
        <Text fontSize="20px" paddingTop="10px">First Name: {patient.First_Name}</Text>
        <Text></Text>
        <Text fontSize="20px">Last Name: {patient.Last_Name}</Text>
        <Text></Text>
        <Text fontSize="20px">Age: {patient.Age}</Text>
        <Text></Text>
        <Text fontSize="20px">Provider: {patient.Provider}</Text>
        <Text></Text>
        <Text fontSize="20px">Address: {patient.Address}</Text>
        <Text></Text>
        <Text fontSize="20px">Date of Birth: {patient.Date_Of_Birth}</Text>
        <Text></Text>
        <Text fontSize="20px">Sex: {patient.Sex}</Text>
        <Text></Text>
        <Text fontSize="20px">Phone: {patient.Phone}</Text>
        <Text></Text>
        <Text fontSize="20px">Email: {patient.Email}</Text>
        <Text></Text>
        <Text fontSize="20px">Last Change: ({patient.updatedAt.substring(5,7)},{patient.updatedAt.substring(8,10)},{patient.updatedAt.substring(0,4)})</Text>
        <Text></Text>
        <Button>Delete User</Button>
        <Button>Create Exam</Button>
      </Grid>
      {/* Patient record details */}
    </div>
  );
}

export default PatientRecords;

