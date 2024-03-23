import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { Button, Grid, Text, Accordion, SelectField, ThemeProvider, Theme } from "@aws-amplify/ui-react";
import CreatPatientPopup from './CreatePatientPopup';
import { SearchField } from '@aws-amplify/ui-react';
import './PatientRecords.css'
import { func } from 'prop-types';
import { Link } from 'react-router-dom'

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
            // console.log(patients[i])
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
      // console.log(posts)
      return posts
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return []
  }

  async function refreshPatientList(){
    await fetchPatients() 
      .then(patients => {
        // console.log(patients)
        let tempPatients = []
        for(let i=0; i<patients.length; i++){
          
          // if (patients[i].createdAt!=null){
            // console.log(patients[i])
          tempPatients.push(patients[i]);
          // }
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
  
  var patientAges = new Map()
  for(var i=0; i<patientList.length;i++){
    var patient = patientList[i]
    var dob = new Date(patient.Date_Of_Birth);
    //calculate month difference from current date in time
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    // console.log(Date.UTC())
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970); 
    patientAges[patient.id] = age
  }

  return (
    <div className="patient-list">
      <CreatPatientPopup trigger= {popupVisible} setTrigger= {setPopupVisible} refreshPatientList={refreshPatientList}></CreatPatientPopup>
        <Button style={{backgroundColor:"white", borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}} onClick={()=>{
          setPopupVisible(true)
        }}>Add New Patient</Button>
            <SearchField   
              style={{borderRadius:"1rem 0 0 1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}}        
              placeholder={"Search by " + {searchBy}.searchBy}
              label="search"
              onChange={onChange}
              onClear={onClear}
              onSubmit={onSearch}
              value={search}
              marginTop = {20}z
              backgroundColor={'white'}              
            />


          <SelectField 
            style={{borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}}
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
          borderRadius="1rem"
          key={patient.id} 
          onClick={()=>{
            setSelectedPatient(patient)
          }
          }>
            <Accordion.Trigger style={{borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}}>
            <Grid templateColumns="1fr 1fr 1fr 1fr" templateRows="2rem" width="100%" >
                  <Text fontSize="20" >{patient.First_Name}</Text>
                  <Text>{patient.Last_Name}</Text>
                  <Text paddingLeft="12px">{patientAges[patient.id]}</Text>
                  <Text paddingLeft="25px">{patient.Provider}</Text>
                </Grid>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content >
              <PatientProfile patient={patient}/> 
            </Accordion.Content>
          </Accordion.Item>
          ))}
        </Accordion.Container>

    </div>
  );
}

function PatientProfile(props,{patient}) {
  // function displayVal()

  // console.log(patient)
  // console.log(props)
  patient = props.patient
  // Show patient profile here 

  var dob = new Date(patient.Date_Of_Birth);
  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  // console.log(Date.UTC())
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  return (
    <div>
      {/* <Button style={{float:'right', border:'none', borderRadius:'20px'}} onClick={()=>{
            props.setPatient(false);
        }}> x </Button> */}
       <Text rowSpan={2} columnSpan={2} fontSize="2em" style={{borderBottom: "0.2em black solid", textAlign: 'center'}}>Patient Profile</Text>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
      <Grid fontSize="20px" templateColumns="1fr 1fr" templateRows="minmax(2rem,min-content)" columnGap={"5rem"}>
        {/* <Text rowSpan={2} columnSpan={2} fontSize="2em" style={{borderBottom: "0.2em black solid", textAlign: 'center'}}>Patient Profile</Text>
        <Text></Text> */}   
        <Text column={1}></Text>
        <Text column={2}></Text>
        <Grid fontSize="20px" templateColumns="1fr" templateRows="2rem"> 
          <Text>First Name: {patient.First_Name}</Text>
          <Text></Text>
          <Text>Last Name: {patient.Last_Name}</Text>
          <Text></Text>
          <Text>Age: {age}</Text>        
          <Text></Text>
          <Text>Date of Birth: {patient.Date_Of_Birth}</Text>
          <Text></Text>
          <Text>Sex: {patient.Sex}</Text>
          <Text></Text>        
          <Text>Provider: {patient.Provider}</Text>
          <Text></Text>
          <Button width="200px" marginTop={30}>Delete User</Button>
        </Grid>
        <Grid fontSize="20px" templateColumns="1fr" templateRows="2rem">   
          <Text></Text>
          <Text></Text>
          <Text>Phone: {patient.Phone}</Text>
          <Text></Text>
          <Text>Email: {patient.Email}</Text>
          <Text></Text>
          <Text>Address: {patient.Address}</Text>
          <Text></Text>
          <Text height={20}></Text>
          <Text></Text>
          <Text>Last Change: ({patient.updatedAt?.substring(5,7)},{patient.updatedAt?.substring(8,10)},{patient.updatedAt?.substring(0,4)})</Text>
          <Text></Text>
          <Link to={"/exams/"+patient.id}><Button width="200px" marginTop={30}>View Exams</Button></Link>          
        </Grid>
      </Grid>
      </div>
      {/* Patient record details */}
    </div>
  );
}

export default PatientRecords;

