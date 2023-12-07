import React from "react";
import "./Navbar.css"
import { Menu, MenuButton, MenuItem} from '@aws-amplify/ui-react';
// import { signOut } from '@aws-amplify/auth';


function Navbar(signOut, user){
    return (
        <div className="wrapper">
            <nav className="nav">
                {/* <a className="site-title" href="/">MedCapture</a> */}
                <Menu
                    trigger={
                    <MenuButton variation="primary" size="medium" width="10%">
                        MedCapture
                    </MenuButton>
                    }
                >
                    <MenuItem as="a" href="/" color={"black"}> Home </MenuItem>
                    <MenuItem as="a" href="/examination" color={"black"}> Examination </MenuItem>
                    <MenuItem as="a" href="#" color={"black"}> View PDF </MenuItem>
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