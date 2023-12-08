import React from "react";
import teamSource from "../images/teampicture.jpg";

function Home(){
    return (
<html lang="en">
<head>
  <meta charSet="UTF-8"></meta>
  <title>MedCapture</title>
</head>
<body>

<h1 style={{textAlign:'center'}}>MedCapture</h1>
<h2>Project Description</h2>
  <p>In the fast-paced world of healthcare, accurate documentation and effective communication are paramount. MedCapture addresses these critical needs by offering an intuitive touch interface that enables medical practitioners to efficiently identify, label, and highlight specific areas of concern during patient examinations.</p>
  <p>By seamlessly integrating advanced imaging technology with an easy-to-use interface, MedCapture enhances the accuracy and efficiency of medical record-keeping. This not only saves valuable time for medical professionals but also leads to better patient care by ensuring precise and well-documented diagnoses and treatment plans. Whether it's an ophthalmologist diagnosing eye conditions, dermatologist identifying skin conditions, or any other medical specialist, MedCapture is the go-to solution for improving workflow, patient engagement, and the overall quality of healthcare services.</p>
  <p></p>

<h2>The Team</h2>      
    <div className="team_picture" style={{
        backgroundImage: `url(${teamSource})`,
        backgroundSize: '1008px 567px',
        height: '567px',
        width: '1008px'
    }}></div>

<h2>Team Members</h2>
    <ul>
        <li>Phillip Hidayat</li>
        <li>Ryan Springborn</li>
        <li>Tanner Jones</li>
        <li>Ben Shepherd</li>
    </ul>

<h2>Team Meeting Schedule</h2>
    <ul>
        <li>Wednesdays at 10 AM</li>
        <li>Fridays at 10 AM</li>
    </ul>

<h2>Link to Design Document</h2>
    <ul>
        <li><p><a href="https://docs.google.com/document/d/15tzGPQ0C6uMYiHRtsh6Ax90b55XYRaBd1A4t1XVZ7_M/edit?usp=sharing">Design Document</a></p></li>
    </ul>

<h2>Outside Sponsor</h2>
    <ul>
        <li><p>B2B Competition</p></li>
    </ul>
  
<h2>Technologies Used</h2>
    <ul>
        <li><a href="https://docs.amplify.aws">AWS Amplify</a></li>
        <li><a href="https://react.dev">React</a></li>
    </ul>

<h2>Project Language</h2>
    <ul>
        <li><p>Entirely React + Javascript</p></li>
    </ul>

<h2>Hosting Service/Cloud Provider</h2>
    <ul>
        <li><p>AWS</p></li>
    </ul>

<h2>Platforms Supported</h2>
    <ul>
        <li><p>Web</p></li>
    </ul>

<h2>Databases Used</h2>
    <ul>
        <li><p>DynamoDB - AWS's fast NoSQL Database</p></li>
    </ul>
    
</body>
</html>
    )
}

export default Home;