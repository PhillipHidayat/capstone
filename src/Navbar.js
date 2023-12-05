import React from "react";
import "./Navbar.css"

function Navbar(){
    return (
        <div>
            <nav className="nav">
                <a className="site-title" href="/">MedCapture</a>
                <ul>
                    <li>
                        <a href="/examination">Examination</a>
                    </li>
                    <li>
                        <a href="./login">Login</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;