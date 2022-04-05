
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useLocation } from "react-router-dom";
import { enrolledclasses, instclasses } from "../models/classes";
import "../style/coursedetails.css"
import { useState } from 'react'
import { topics } from "../models/topics";
import { useNavigate } from 'react-router-dom'
import CustomPopup from "../components/meeeting/scanface/joinmeeting-popup1";



function ClassDetails() {

    let navigate = useNavigate();
    let state = useLocation();
    let role = state.state.role;
    let subjid = state.state.subjid;

    let currenttime = Date().toString();

    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");
    

    let today = Date().toString();

    let coursename = "";

    role === "instructor" ? instclasses.map((rclass) => {

        if (rclass.id === subjid) {
            coursename = rclass.subjname;

        }
    }) :
        enrolledclasses.map((rclass) => {

            if (rclass.id === subjid) {
                coursename = rclass.subjname;

            }
        });

    return <>


        <div id="class-details-container"  >

            <div className="d-flex class-details-hd" >

                <h1 className="col-3 " >{coursename}</h1>

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


        {topics.map((topic) => {

            return <>

                <div className="row classdetails-content">

                    <div>
                        <div className="class-det-topic-heading">
                            <span>{topic.topicid}. </span>
                            <span>{topic.topicname}</span>
                            {
                                role === "instructor" ? <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" /> : ""
                            }

                        </div>

                        <div className="class-det-topic-content">

                            {
                                //checking if there is any helping material uploaded  if yes then show else nothing

                                topic.helpingmaterial.helpingmaterialp
                                    ?
                                    <>
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
                                                        </>
                                                        :

                                                        topic.helpingmaterial.done ?
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload-done" /> :
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload" />


                                                }

                                            </div>

                                        </div>
                                        <hr className="hr" />
                                    </>

                                    :
                                    ""

                            }
                            {/* checking if thee assignment part is present */}

                            {
                                topic.Assignment.assignp ?

                                    <>
                                        <div className="main-content-1">
                                            <div className="inner-content-left">
                                                <FontAwesomeIcon icon={faClipboardList} />
                                                <span>Assignment No {topic.topicid}</span>
                                            </div>
                                            <div className="inner-content-right">
                                                <span className="time">Due Date :{topic.Assignment.duedate}</span>
                                                {
                                                    role === "instructor" ? <>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                    </>
                                                        :

                                                        topic.Assignment.done ?
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload-done" /> :
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload" />


                                                }

                                            </div>
                                        </div>
                                        <hr className="hr" />
                                    </> :
                                    ""


                            }

                            {/* checking if the quiz part is present */}
                            {

                                topic.quiz.quizp ?
                                    <>
                                        <div className="main-content-1">
                                            <div className="inner-content-left">
                                                <FontAwesomeIcon icon={faBrain} />
                                                <span>Quiz no {topic.topicid}</span>
                                            </div>
                                            <div className="inner-content-right">
                                                <span className="time">Scheduled :{topic.quiz.duedate}</span>
                                                {
                                                    role === "instructor" ? <>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                    </>
                                                        :

                                                        topic.quiz.done ?
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload-done" /> :
                                                            <FontAwesomeIcon icon={faCircleCheck} className="check-upload" />
                                                }

                                            </div>
                                        </div>
                                        <hr className="hr" />
                                    </> : ""

                            }
                            {/* checking if there is any online class created */}
                            {

                                topic.onlineclass.onlineclassp ?
                                    <>
                                        <div className="main-content-1">
                                            <div className="inner-content-left">
                                                <FontAwesomeIcon icon={faBrain} />
                                                <span>{"Online Class " + topic.topicname}</span>
                                            </div>
                                            <div className="inner-content-right">

                                                {
                                                    role === "instructor" ? <>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                    </>
                                                        :
                                                        <>
                                                            {
                                                                currenttime <= topic.onlineclass.time ?
                                                                    <span className="btn-primary">Live Now</span> :

                                                                    <>
                                                                        <span className="time">Scheduled :
                                                                            {topic.onlineclass.time}</span>
                                                                        <button className="btn btn-primary" onClick={() => {
                                                                            navigate("/scanface");

                                                                        }}>Join Now</button>
                                                                    </>
                                                            }




                                                            {
                                                                topic.onlineclass.done ?
                                                                    <FontAwesomeIcon icon={faCircleCheck} className="check-upload-done" /> :

                                                                    <FontAwesomeIcon icon={faCircleCheck} className="check-upload" />
                                                            }
                                                        </>


                                                }

                                            </div>
                                        </div>
                                        <hr className="hr" />
                                    </> : ""

                            }


                            {/* checking if te recorded sessions are available */}
                            {
                                topic.recordedsession.recordedsessionp ?
                                    <>
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

                                                        <div>
                                                            <Link to={"/"} className="link">
                                                                <span className="participation-report">Check participation report</span>

                                                            </Link>
                                                            {
                                                                topic.recordedsession.done ?
                                                                    <FontAwesomeIcon icon={faCircleCheck} className="check-upload-done" /> :
                                                                    <FontAwesomeIcon icon={faCircleCheck} className="check-upload" />
                                                            }
                                                        </div>

                                                }
                                            </div>
                                        </div>
                                        <hr className="hr" />
                                    </> : ""
                            }
                        </div>
                    </div>

                </div>

            </>
        })}













        {/* 2nd topic to be make dyanmic later */}

        {/* <div className="row classdetails-content">

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

        </div> */}


    </>
}

export default ClassDetails;