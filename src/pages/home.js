
import "../style/homepage.css";
import React from "react"
import Header from "../components/header";

import { Link } from "react-router-dom"
import Navbarmain from "./mainnavbar";

function Landingpage() {



    function linkClicked() {
        activeclass = "d"
    }

    const activeclass = "active";
    return <>
      
        <div id="topdiv">
            <div className="main-div">
                <div className="home-innerdiv">
                    <span> Let’s learn on a dedicated e-Learning enviroment! </span>
                    <p>We Provide the facility of effective e-learning with the handy features of <strong>video conferencing</strong>, file storage and Artificial Intelligence for the students as well as for the instructors, to facilitate effective virtual learning.</p>
                    <Link className="btn btn-primary" to="/moto" >Get Started</Link>
                </div>
            </div>

        </div>
    </>
}
export default Landingpage;