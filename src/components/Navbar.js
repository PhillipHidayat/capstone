import React, { useState, useEffect }  from "react";
import "./Navbar.css"
import { Text} from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { Link } from 'react-router-dom' 
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
                    <Link  className="title" to="/" > <span className="med">Med</span>Capture </Link>    
                    <ul>
                        <li>
                            <Link className="item" to="/records" > Patients </Link>
                        </li>
                        <li>
                            <a className="item" onClick={() =>props.setTrigger(true)}> Shorthand </a>
                        </li>
                    </ul>                
                    
                </div>    

                <ul>
                    <li>
                        <Link to="./">Hello {props.user?.email}</Link>
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