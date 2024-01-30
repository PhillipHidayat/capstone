import React from "react";
import "./Navbar.css"
import { Menu, MenuButton, MenuItem, Divider} from '@aws-amplify/ui-react';
// import { signOut } from '@aws-amplify/auth';


function Navbar(signOut, user){
    return (
        <div className="wrapper">
            <nav className="nav">
                <Menu className="menu"
                    trigger={
                    <MenuButton variation="primary" size="large" width="10%">
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
                    
                </Menu>
                <ul>
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