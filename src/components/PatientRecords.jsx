import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { Button, Grid, Text, Accordion, SelectField } from "@aws-amplify/ui-react";
import CreatPatientPopup from './CreatePatientPopup';
import { SearchField } from '@aws-amplify/ui-react';
import './PatientRecords.css'
import { func } from 'prop-types';

function PatientRecords() {
  const [patientList, setPatientList] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false)
  const [search, setSearch] = React.useState('');
  const [searchBy, setSearchBy] = React.useState("firstName");

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
          // by first name
          else if (patients[i].createdAt!=null && patients[i].First_Name.toLowerCase().includes(search.toLowerCase()) && searchBy == "firstName"){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
          // by last name
          else if (patients[i].createdAt!=null && patients[i].Last_Name.toLowerCase().includes(search.toLowerCase()) && searchBy == "lastName"){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
          else if (patients[i].createdAt!=null && patients[i].Age==search && searchBy == "age"){
            console.log(patients[i])
            tempPatients.push(patients[i]);
          }
          // by provider
          else if (patients[i].createdAt!=null && patients[i].Provider.toLowerCase().includes(search.toLowerCase()) && searchBy == "provider"){
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
        <Button style={{backgroundColor: 'white'}} onClick={()=>{
          setPopupVisible(true)
        }}>Add New Patient</Button>

        <div className='search'>
          <SearchField
            placeholder={"Search by " + {searchBy}.searchBy}
            label="search"
            onChange={onChange}
            onClear={onClear}
            onSubmit={onSearch}
            value={search}
            marginTop = {20}
            backgroundColor={'white'}
          />
          <SelectField
                        label = "Search By :"
                        value = {searchBy}
                        marginTop = {20}
                        onChange={(e) => setSearchBy(e.target.value)}
                      >
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="age">Age</option>
                        <option value="provider">Provider</option>                       
                        
          </SelectField>
        </div>

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
      <Grid fontSize="20px" templateColumns="1fr 1fr" templateRows="2rem">
        <Text rowSpan={2} columnSpan={2} fontSize="2em" style={{borderBottom: "0.2em black solid", textAlign: 'center', paddingRight:"15rem"}}>Patient Profile</Text>
        <Text></Text>
        <Text></Text>
        <Text paddingLeft="30rem" column={1} row={3} paddingTop="10px">First Name: {patient.First_Name}</Text>
        <Text></Text>
        <Text paddingLeft="30rem" column={1} row={4}>Last Name: {patient.Last_Name}</Text>
        <Text></Text>
        <Text paddingLeft="30rem" column={1} row={5}>Age: {patient.Age}</Text>        
        <Text></Text>
        <Text paddingLeft="30rem" column={1} row={6}>Date of Birth: {patient.Date_Of_Birth}</Text>
        <Text></Text>
        <Text paddingLeft="30rem" column={1} row={7}>Sex: {patient.Sex}</Text>
        <Text></Text>        
        <Text paddingLeft="30rem" column={1} row={8}>Provider: {patient.Provider}</Text>
        <Text></Text>
        <Text column={2} row={4}>Phone: {patient.Phone}</Text>
        <Text></Text>
        <Text column={2} row={5}>Email: {patient.Email}</Text>
        <Text></Text>
        <Text column={2} row={6}>Address: {patient.Address}</Text>
        <Text></Text>
        <Text column={2} row={8}>Last Change: ({patient.updatedAt.substring(5,7)},{patient.updatedAt.substring(8,10)},{patient.updatedAt.substring(0,4)})</Text>
        <Text></Text>
        <Button marginLeft="30rem" width="200px" marginTop={30}>Delete User</Button>
        <Button width="200px" marginTop={30} as="a" href={"/examination/"+patient.id}>Create Exam</Button>
      </Grid>
      {/* Patient record details */}
    </div>
  );
}

export default PatientRecords;

