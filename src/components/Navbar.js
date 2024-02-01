import React, { useState, useEffect }  from "react";
import "./Navbar.css"
import { Menu, MenuButton, MenuItem, Divider} from '@aws-amplify/ui-react';
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
    console.log(props)
    return (
        <div className="wrapper">
            <nav className="nav">
                <Menu className="menu"
                    trigger={
                    <MenuButton variation="primary" size="large">
                        MedCapture
                    </MenuButton>
                    }
                >   
                    <MenuItem as="a" href="/" > Home </MenuItem>
                    <Divider />
                    <MenuItem as="a" href="/dashboard"> Dashboard </MenuItem>
                    <Divider />
                    <MenuItem as="a" href="/examination"> Examination </MenuItem>
                    <Divider />
                    <MenuItem as="a" href="#"> View PDF </MenuItem>
                    <Divider />
                    <MenuItem as="a" href="/records"> Patients </MenuItem>
                    
                </Menu>
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