import React from "react";
import "./Navbar.css"
// import { signOut } from '@aws-amplify/auth';


function Navbar(signOut, user){
    return (
        <div className="wrapper">
            <nav className="nav">
                <a className="site-title" href="/">MedCapture</a>
                <ul>
                    <li>
                        <a href="/examination">Examination</a>
                    </li>
                    <li>
                        <a href="./">Hello {signOut.user?.attributes.email}</a>
                    </li>
                    <li>
                        <a onClick={(e)=>{signOut.signOut()}}>SignOut</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;