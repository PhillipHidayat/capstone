import React, { useState } from 'react';
import "./PatientTable.css"
import { Table, TableCell, TableRow, TableHead, TableBody } from '@aws-amplify/ui-react';

function PatientTable() {
    const [patients, setPatients] = useState([
        {name: "Joe", dob: "12/12/2000", sex: "Male" , phone: "801-200-6281", provider: "Dr. Bryan"}, 
        {name: "Tom", dob: "10/10/2001", sex: "Female", phone: "801-300-2345", provider: "Dr. Alice" }]);

    // setPatients()

    return (
        <div className="patientList">
            <Table
                caption=""
                highlightOnHover={false}>
                <TableHead>
                    <TableRow>
                    <TableCell as="th">Name</TableCell>
                    <TableCell as="th">DOB</TableCell>
                    <TableCell as="th">Sex</TableCell>
                    <TableCell as="th">Phone</TableCell>
                    <TableCell as="th">Provider</TableCell>
                    </TableRow>
                </TableHead>
                {patients.map(function(data){
                    return (    
                        <TableBody>
                            <TableRow>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.dob}</TableCell>
                            <TableCell>{data.sex}</TableCell>      
                            <TableCell>{data.phone}</TableCell>
                            <TableCell>{data.provider}</TableCell>                   
                            </TableRow>
                        </TableBody>
                        
                    )
                })}
            </Table>  
        </div>
    );

}

export default PatientTable