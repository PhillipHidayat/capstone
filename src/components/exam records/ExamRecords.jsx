import React, { useState, useEffect } from 'react';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import {Exam, Patient} from '../../models'
import { Button, Grid, Text, Accordion, SelectField, ThemeProvider, Theme } from "@aws-amplify/ui-react";
import CreatPatientPopup from '../CreatePatientPopup';
import { SearchField } from '@aws-amplify/ui-react';
import './ExamRecords.css'
import { func } from 'prop-types';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

function ExamRecords() {
  const [examList, setExamList] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false)
  const [search, setSearch] = React.useState('');
  const [searchBy, setSearchBy] = React.useState("firstName");
  const [patient, setPatient] = useState();
  const { id } = useParams() // get patient id from url

  useEffect(() => {
    // Fetch list of patients 
    // console.log(id)
    fetchPatients(id) 
      .then(pt => {
        setPatient(pt);
      });
  }, [id]);

  useEffect(() => {
    // Fetch list of Exams 
    // console.log(patient)
    if (patient != null){
    fetchExams() 
      .then(exams => {
        let tempexams = []
        for(let i=0; i<exams.length; i++){
          
          if (exams[i].createdAt!=null){
            // console.log(patients[i])
            tempexams.push(exams[i]);
          }
        }
        setExamList(tempexams);
      })
    }
  }, [patient])

  async function fetchPatients(id) {
    // API call to get patients
    try {
      const posts = await DataStore.query(Patient, id);
      return posts;
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return [];
  }

  async function createExam(){
    const date = new Date();

  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear();
  console.log(month)
  if (month.length == 1){
    month = "0" + month
  }
  console.log(month)
  if (day.length == 1){
    day = "0" + day
  }

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate); // "17-6-2022"
  console.log(patient)
    const exam = await DataStore.save(
      new Exam({
        Date: currentDate,
        patientID: patient.id,
        IntakeForm: {},
        Summary: {}
      })
    ).then(refreshExamList())
  }

  async function fetchExams() {
    // API call to get patients
    try {
      // console.log(patient)
      const posts = await patient.Exams.toArray()
      // console.log('Posts retrieved successfully!');
      console.log(posts)
      return posts
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return []
  }

  async function refreshExamList(){
    fetchExams() 
      .then(exams => {
        let tempExams = []
        for(let i=0; i<exams.length; i++){
          
          // if (patients[i].createdAt!=null){
            // console.log(patients[i])
          tempExams.push(exams[i]);
          // }
        }
        setExamList(tempExams);
      })
  }

  function handleExamClick(patient) {
    // Fetch and show patient record
    setSelectedExam(patient);
  }

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  // It is your responsibility to set up onClear
  const onClear = async () => {
    setSearch('');
    await refreshExamList();
  };
  function onSearch(event){
    // console.log(event)
    // console.log(search)
    fetchExams() 
      .then(patients => {
        let tempPatients = []
        for(let i=0; i<patients.length; i++){
          // console.log(patients[i].First_Name.toLowerCase())
          // console.log(search.toLowerCase())
          if (patients[i].createdAt!=null && search==""){
            tempPatients.push(patients[i]);
          }
          // by first name
          else if (patients[i].createdAt!=null && patients[i].Date.toLowerCase().includes(search.toLowerCase()) && searchBy == "Date"){
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
        setExamList(tempPatients);
      })
  }

  return (
    <div className="patient-list">
        <Button style={{backgroundColor:"white", borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}} 
        onClick={createExam}
        >Add New Exam</Button>
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
            <option value="Date">Date</option>                               
          </SelectField>

        {/* <Button onClick={async ()=>{
          await DataStore.delete(Patient, Predicates.ALL);
        }}>Delete All Records</Button> */}
        <Grid style={{borderBottom: "3px solid black"}} paddingTop="20px" paddingBottom="5px" templateColumns="1fr 1fr 1fr 1fr" templateRows="2rem">
              <Text fontSize="1.5em">Date</Text>
        </Grid>
      
      <Accordion.Container>
        {examList.map(exam => (
          <Accordion.Item 
          value={exam.id} 
          marginBottom="4px"
          marginTop="4px"
          borderRadius="1rem"
          key={exam.id} 
          onClick={()=>{
            setSelectedExam(exam)
          }
          }>
            <Accordion.Trigger style={{borderRadius:"1rem", boxShadow:"0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1)"}}>
            <Grid templateColumns="1fr 1fr 1fr 1fr" templateRows="2rem" width="100%" >
                  <Text fontSize="20" >{exam.Date}</Text>
                </Grid>
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content >
              {/* <ExamProfile exam={exam}/>  */}
              <Text>Hi</Text>
            </Accordion.Content>
          </Accordion.Item>
          ))}
        </Accordion.Container>

    </div>
  );
}

// function ExamProfile(props,{exam}) {
//   // console.log(patient)
//   // console.log(props)
//   exam = props.exam
//   // Show patient profile here 

//   return (
//     <div>
//       {/* <Button style={{float:'right', border:'none', borderRadius:'20px'}} onClick={()=>{
//             props.setPatient(false);
//         }}> x </Button> */}
//        <Text rowSpan={2} columnSpan={2} fontSize="2em" style={{borderBottom: "0.2em black solid", textAlign: 'center'}}>Patient Profile</Text>
//         <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
//       <Grid fontSize="20px" templateColumns="1fr 1fr" templateRows="minmax(2rem,min-content)" columnGap={"5rem"}>
//         {/* <Text rowSpan={2} columnSpan={2} fontSize="2em" style={{borderBottom: "0.2em black solid", textAlign: 'center'}}>Patient Profile</Text>
//         <Text></Text> */}   
//         <Text column={1}></Text>
//         <Text column={2}></Text>
//         <Grid fontSize="20px" templateColumns="1fr" templateRows="2rem"> 
//           <Text>First Name: {patient.First_Name}</Text>
//           <Text></Text>
//           <Text>Last Name: {patient.Last_Name}</Text>
//           <Text></Text>
//           <Text>Age: {age}</Text>        
//           <Text></Text>
//           <Text>Date of Birth: {patient.Date_Of_Birth}</Text>
//           <Text></Text>
//           <Text>Sex: {patient.Sex}</Text>
//           <Text></Text>        
//           <Text>Provider: {patient.Provider}</Text>
//           <Text></Text>
//           <Button width="200px" marginTop={30}>Delete User</Button>
//         </Grid>
//         <Grid fontSize="20px" templateColumns="1fr" templateRows="2rem">   
//           <Text></Text>
//           <Text></Text>
//           <Text>Phone: {patient.Phone}</Text>
//           <Text></Text>
//           <Text>Email: {patient.Email}</Text>
//           <Text></Text>
//           <Text>Address: {patient.Address}</Text>
//           <Text></Text>
//           <Text height={20}></Text>
//           <Text></Text>
//           <Text>Last Change: ({patient.updatedAt.substring(5,7)},{patient.updatedAt.substring(8,10)},{patient.updatedAt.substring(0,4)})</Text>
//           <Text></Text>
//           <Link to={"/examination/"+patient.id}><Button width="200px" marginTop={30}>Create Exam</Button></Link>          
//         </Grid>
//       </Grid>
//       </div>
//       {/* Patient record details */}
//     </div>
//   );
// }

export default ExamRecords;