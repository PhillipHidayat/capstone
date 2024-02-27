import React from "react";
import teamSource from "../images/teampicture.jpg";
import "./Home.css";

function Home() {
  
    return (
    <div className="container">
        <div className="title">
            <h1 style={{textAlign:'center', color:"black"}}>MedCapture</h1>
        </div>
        <div className="box">
            <h2>Project Description</h2>
            <p>In the fast-paced world of healthcare, accurate documentation and effective communication are paramount. MedCapture addresses these critical needs by offering an intuitive touch interface that enables medical practitioners to efficiently identify, label, and highlight specific areas of concern during patient examinations.</p>
            <p>By seamlessly integrating advanced imaging technology with an easy-to-use interface, MedCapture enhances the accuracy and efficiency of medical record-keeping. This not only saves valuable time for medical professionals but also leads to better patient care by ensuring precise and well-documented diagnoses and treatment plans. Whether it's an ophthalmologist diagnosing eye conditions, dermatologist identifying skin conditions, or any other medical specialist, MedCapture is the go-to solution for improving workflow, patient engagement, and the overall quality of healthcare services.</p>
            <p></p>
        </div>

        <div className="box">
            <h2>The Team</h2>  
            <div className="boxFlex">  
                <div className="boxItem">
                    <div className="team_picture" style={{
                        backgroundImage: `url(${teamSource})`,
                        backgroundSize: '504px 285px',
                        height: '285px',
                        width: '504px'
                    }}>                
                    </div>
                </div>

                <div className="boxItem">
                    <h3>Team Members</h3>
                        <ul className="home_ul">
                            <li>Phillip Hidayat</li>
                            <li>Ryan Springborn</li>
                            <li>Tanner Jones</li>
                            <li>Ben Shepherd</li>
                        </ul>

                    <h3>Team Meeting Schedule</h3>
                    <ul className="home_ul">
                            <li>Wednesdays at 10 AM</li>
                            <li>Fridays at 10 AM</li>
                        </ul>
                    <br />
                </div>

            </div>
        </div>
        <div className="box">
            <h2>Technologies</h2>
            <div className="boxFlex">            
                <div className="boxItem">
                    <h3>Technologies Used</h3>
                    <ul className="home_ul">
                        <li><a href="https://docs.amplify.aws">AWS Amplify</a></li>
                        <li><a href="https://react.dev">React</a></li>
                    </ul>

                    <h3>Project Language</h3>
                    <ul className="home_ul">
                            <li>Entirely React + Javascript</li>
                        </ul>
                </div>
                
                <div className="boxItem">
                    <h3>Hosting Service/Cloud Provider</h3>
                    <ul className="home_ul">
                        <li>AWS</li>
                    </ul>

                    <h3>Platforms Supported</h3>
                    <ul className="home_ul">
                        <li>Web</li>
                    </ul>

                    <h3>Databases Used</h3>
                    <ul className="home_ul">
                        <li>DynamoDB - AWS's fast NoSQL Database</li>
                    </ul>
                </div>        
            </div> 
        </div>

        <div className="box">
            <h2>Link to Design Document</h2>
            <ul className="home_ul">
                <li><p><a href="https://docs.google.com/document/d/15tzGPQ0C6uMYiHRtsh6Ax90b55XYRaBd1A4t1XVZ7_M/edit?usp=sharing">Design Document</a></p></li>
            </ul>

            <h2>Outside Sponsor</h2>
            <ul className="home_ul">
                <li><p>B2B Competition</p></li>
            </ul>
        </div>
    </div>
    )
}

export default Home;