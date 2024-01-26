import React from "react";
import PatientTable from "../components/PatientTable";
import Navbar from "../components/Navbar";



function Dashboard(){
    return(
        <div>
            <h1 style={{textAlign:'center', color: 'black'}}>Patient List</h1>
            <PatientTable />
        </div>
    )
}
export default Dashboard;