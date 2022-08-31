import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./participationreport.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/header";



const ParticipationReport = () => {
    let navigate = useNavigate();
    const [show, setShow] = useState(true);





    const closeHandler = (e) => {
        setShow(false);

    };



    return (

        <>
        <Header />
        <div
            style={{
                visibility: show ? "visible" : "hidden",
                opacity: show ? "1" : "0"
            }}
            className="overlay"
        >

            <div className="p-report-main">
                <span className="p-report-close" onClick={closeHandler}>
                    <FontAwesomeIcon icon={faTimes} />

                </span>
                <span className="p-report-title">Participation Report</span>
            </div>
            <div className="p-report-content">
                <h3>Video Session Topic</h3>
                <div className="topic-b">
                    <span>Neural Networks</span>
                </div>
                <div className="p-report-details-main">
                    <div className="p-report-div">
                        <span className="report-status-title">Session Time:</span>
                        <span className="report-status">60 minutes</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Your Camera Presence</span>
                        <span className="report-status">58 minutes ,12 seconds</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Attendence Status:</span>
                        <span className="report-status">PRESENT</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Interactive Questions:</span>
                        <span className="report-status">2</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Answer Submitted:</span>
                        <span className="report-status">2</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Microphone enabled :</span>
                        <span className="report-status">2</span>
                    </div>
                    <div className="p-report-div">
                        <span className="report-status-title">Comments Added</span>
                        <span className="report-status">2</span>
                    </div>

                </div>
            </div>
        </div>
        </>
    );

};


export default ParticipationReport;