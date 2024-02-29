import React, { useState, useEffect }  from "react";
import "./Navbar.css"
import { Text} from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
// import { signOut } from '@aws-amplify/auth';
async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
    } catch (err) {
      console.log(err);
    }
  }





function Navbar(props){
    // console.log(props)
    return (
        <div className="wrapper">
            <nav className="nav"> 
                <div className="nav-item">
                    <a  className="title" href="/" > <span className="med">Med</span>Capture </a>    
                    <ul>
                        <li>
                            <a className="item" href="/records" > Patients </a>
                        </li>
                    </ul>                
                    
                </div>    

                <ul>
                    <li>
                        <a href="./">Hello {props.user?.email}</a>
                    </li>
                    <li>
                        <a onClick={(e)=>{
                            // console.log(props)
                            props.signOut()}}>SignOut</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;