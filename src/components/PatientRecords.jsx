import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import {Patient} from '../models'
import { Button } from "@aws-amplify/ui-react";
import CreatPatientPopup from './CreatePatientPopup';
import './PatientRecords.css'

function PatientRecords() {
  const [patientList, setPatientList] = useState(["Katy", "Jason", "Kyle"]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false)

  useEffect(() => {
    // Fetch list of patients 
    fetchPatients() 
      .then(patients => {
        setPatientList(patients);
      })
  }, [])

  async function fetchPatients() {
    // API call to get patients
    try {
      const posts = await DataStore.query(Patient);
      console.log('Posts retrieved successfully!', posts);
    } catch (error) {
      console.log('Error retrieving posts', error);
    }
    return ['John Doe', 'Jane Smith', 'Bob Wilson'] 
  }

  function handlePatientClick(patient) {
    // Fetch and show patient record
    setSelectedPatient(patient);
  }
  
  return (
    <div className="patient-list">
      <CreatPatientPopup trigger= {popupVisible} setTrigger= {setPopupVisible}></CreatPatientPopup>
        <p>Hello</p>
        <Button onClick={()=>{
          setPopupVisible(true)
        }}>Add New Patient</Button>
      <ul>
        {patientList.map(patient => (
          <li key={patient} onClick={() => handlePatientClick(patient)}>
            {patient}  
          </li>
        ))}
      </ul>

      {selectedPatient && 
        <div className="patient-profile">
          <PatientProfile patient={selectedPatient} /> 
        </div>
      }
    </div>
  );
}

function PatientProfile({patient}) {
  // Show patient profile here 
  return (
    <div>
      <h3>{patient}</h3>
      {/* Patient record details */}
    </div>
  );
}

export default PatientRecords;

