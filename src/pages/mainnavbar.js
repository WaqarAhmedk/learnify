
import { Link } from 'react-router-dom';
import React from "react"

function Navbarmain() {



    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light " id="home-navbar">

            <a className="navbar-brand ps-5" id="brand-img" href="/">
                <img src={require("../assets/icons/Learnify logo.png")} alt={"drop-down-sign"} />
            </a>

            <div className="home-list">
                <ul>
                    <Link to="/signin" className='link'>Login</Link>
                    <Link className="active link" to="/" >Home</Link>
                    <li >About</li>
                    <li>Contact us</li>

                </ul>
            </div>
        </nav>

    </>
}
export default Navbarmain;