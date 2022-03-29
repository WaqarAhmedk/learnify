
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

import "../../style/coursedetails.css"
import { useState } from 'react';
function InstClassDetails() {
    let state = useLocation();
    let role=state.state.role;
    let subjid=state.state.subjid;

    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");


    let today = Date().toString();

    return <>

        <div id="class-details-container"  >

            <div className="d-flex class-details-hd" >

                <h1 className="col-3 " >Course Name</h1>

                <div className="form-group has-search class-details-searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>
                {
                    role === "instructor" ?
                        <div className="inst-class-details-options">

                            <div>
                                <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                                <span>Discussion Board</span>
                            </div>

                            <div>
                                <div onClick={() => {

                                    creatactp === "create-activity-parent-content" ?
                                        setcreateactp("create-activity-parent-content-show")
                                        :
                                        setcreateactp("create-activity-parent-content");
                                }}>
                                    <FontAwesomeIcon icon={faCirclePlus} />
                                    <span>Create New Activity</span>
                                </div>

                                <div className={creatactp}>

                                    <div onClick={() => {
                                        creatactc === "create-activity-child-content" ?
                                            setcreateactc("create-activity-child-content-show") :
                                            setcreateactc("create-activity-child-content");
                                    }}>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                        <span>Select Activity Type</span>

                                    </div>

                                    <div className={creatactc} >


                                        <span className="course-mang-list">New Topic</span>

                                        <span className="course-mang-list">Assignment</span>

                                        <span className="course-mang-list">Quiz</span>

                                        <span className="course-mang-list">Video Sesssion</span>

                                        <span className="course-mang-list">Helping Materail</span>

                                    </div>





                                </div>

                            </div>

                            <div onClick={() => {
                                dropshow === "course-mang-show-content" ? setdropshow("course-mang-dropdown-content") :
                                    setdropshow("course-mang-show-content");

                            }} >
                                <FontAwesomeIcon icon={faBars} />
                                <span>Course Settings</span>
                                <div className={dropshow}>

                                    <span className="course-mang-list">Create New Course</span>

                                    <span className="course-mang-list">See Courses List</span>

                                    <span className="course-mang-list">Remove a Course</span>


                                </div>
                            </div>



                        </div>
                        :

                        //after this colon student options of class detailsreq on condtion of roles

                        <div className="inst-class-details-options">

                            <div>
                                <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                                <span>Discussion Board</span>
                            </div>


                            <div>
                                <FontAwesomeIcon icon={faBullhorn} />
                                <span>Announcements</span>
                            </div>

                            <div onClick={() => {
                                dropshow === "course-mang-show-content" ? setdropshow("course-mang-dropdown-content") :
                                    setdropshow("course-mang-show-content");

                            }} >
                                <FontAwesomeIcon icon={faBars} />
                                <span>Course Information</span>
                                <div className={dropshow}>

                                    <span className="course-mang-list">Instructor Profile</span>

                                    <span className="course-mang-list">Shared Documents</span>

                                    <span className="course-mang-list">Progress Report</span>


                                </div>
                            </div>

                        </div>
                }
            </div>

        </div>

        {/* class topic details are shown here */}

        <div className="row classdetails-content">

            <div>
                <div className="class-det-topic-heading">
                    <span>1. </span>
                    <span>Depth First Search</span>
                    {
                        role === "instructor" ? <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" /> : ""
                    }

                </div>

                <div className="class-det-topic-content">

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBookOpen} />
                            <span>Helping Material</span>
                        </div>
                        <div className="inner-content-right">


                            {
                                role === "instructor" ?
                                    <>
                                        <FontAwesomeIcon icon={faEdit} />
                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                    </> : ""
                            }

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faClipboardList} />
                            <span>Assignment No 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Due Date :{today}</span>
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </>
                                    :
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                            }

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBrain} />
                            <span>Quiz no 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Scheduled :{today}</span>
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </>
                                    :

                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                            }

                        </div>
                    </div>
                    <hr className="hr" />

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faCirclePlay} />
                            <span>Recorded Video Session</span>
                        </div>
                        <div className="inner-content-right">
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </> :
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                            }
                        </div>
                    </div>
                    <hr className="hr" />
                </div>
            </div>

        </div>


        {/* 2nd topic to be make dyanmic later */}

        <div className="row classdetails-content">

            <div>
                <div className="class-det-topic-heading">
                    <span>1. </span>
                    <span>Depth First Search</span>
                    {
                        role === "instructor" ? <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" /> : ""
                    }

                </div>

                <div className="class-det-topic-content">

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBookOpen} />
                            <span>Helping Material</span>
                        </div>
                        <div className="inner-content-right">


                            {
                                role === "instructor" ?
                                    <>
                                        <FontAwesomeIcon icon={faEdit} />
                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                    </> : ""
                            }

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faClipboardList} />
                            <span>Assignment No 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Due Date :{today}</span>
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </>
                                    :
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                            }

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBrain} />
                            <span>Quiz no 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Scheduled :{today}</span>
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </>
                                    :

                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                            }

                        </div>
                    </div>
                    <hr className="hr" />

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faCirclePlay} />
                            <span>Recorded Video Session</span>
                        </div>
                        <div className="inner-content-right">
                            {
                                role === "instructor" ? <>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                </> :
                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                            }
                        </div>
                    </div>
                    <hr className="hr" />
                </div>
            </div>

        </div>


    </>
}

export default InstClassDetails;