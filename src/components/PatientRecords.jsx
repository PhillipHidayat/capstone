import React, { useState, useEffect } from 'react';
import './PatientRecords.css'

function PatientRecords() {
  const [patientList, setPatientList] = useState(["Katy", "Jason", "Kyle"]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    // Fetch list of patients 
    fetchPatients() 
      .then(patients => {
        setPatientList(patients);
      })
  }, [])

  async function fetchPatients() {
    // API call to get patients
    return ['John Doe', 'Jane Smith', 'Bob Wilson'] 
  }

  function handlePatientClick(patient) {
    // Fetch and show patient record
    setSelectedPatient(patient);
  }
  
  return (
    <div className="patient-list">
        <p>Hello</p>
      <ul>
        {patientList.map(patient => (
          <li onClick={() => handlePatientClick(patient)}>
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

