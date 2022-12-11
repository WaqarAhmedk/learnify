
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {  useNavigate } from 'react-router-dom'
import Signup from './authpages/signupp';
import Navbarmain from './mainnavbar';


function OurMoto() {
    var navigate = useNavigate();

    var stdbenifits = [
        "Join Classrooms",
        "Learn through interactive Video Conferencing",
        "Access Course content on a central storage platform",
        "Automated attendance & AI features for ease",
        "Dynamic Progress Reports",

    ];

    function OnbuttonClick(role) {

        navigate("/signup", { state: { role: role } });


    }

    return <>

        <div className="home-card-div">
            <div className="home-card-div-child">
                <div className="home-card-btn" onClick={() => OnbuttonClick("Student")}>
                    Join as  Student
                </div>

                {
                    stdbenifits.map((item, index) => {

                        return <div key={index} className="home-card-cntn" >

                            <FontAwesomeIcon icon={faCheck} className="home-check-icon" />

                            <span >{item}</span>

                        </div>
                    })
                }


                <div>

                </div>
            </div>
            <div className="home-card-div-child">
                <div className="home-card-btn" onClick={() => OnbuttonClick("Instructor")} >
                    Join as Instructor
                </div>
                {
                    stdbenifits.map((item, index) => {
                        return <div key={index} className="home-card-cntn" >
                            <FontAwesomeIcon icon={faCheck} className="home-check-icon" />
                            <span >{item}</span>
                        </div>
                    })
                }
            </div>
        </div>
    </>
}
export default OurMoto;