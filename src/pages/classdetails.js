
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { enrolledclasses, instclasses } from "../models/classes";
import "../style/coursedetails.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CustomPopup from "../components/meeeting/scanface/joinmeeting-popup1";
import Header from "../components/header";
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';


function ClassDetails() {

    let navigate = useNavigate();
    const data = useLocation();
    const courseid = data.state.courseid;
    const coursename = data.state.coursename;
    const [topics, setTopics] = useState([]);
    const [cookies, setCookies] = useCookies();

    let currenttime = Date().toString();

    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");


    let today = Date().toString();


    const getAllTopics = () => {
        axios
            .get("/get-topics/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.teacherAuth

                }
            })
            .then((res) => {
                console.log(res.data);
                setTopics(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAllTopics();
    }, []);



    return <>

        <div id="class-details-container"  >

            <div className="d-flex class-details-hd" >

                <h1 className="col-3 " >{coursename}</h1>

                <div className="form-group has-search class-details-searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>

                {

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

                                <span className="course-mang-list">Enroll a Student</span>

                                <span className="course-mang-list">Remove A Student</span>

                                <span className="course-mang-list">Update Course Name</span>
                                <span className="course-mang-list">Remove this course</span>



                            </div>
                        </div>



                    </div>


                }
            </div>

        </div>

        {/* class topic details are shown here */}


        {

            topics.map((topic, index) => {

                return <>

                    <div key={index + 1} className="row classdetails-content">

                        <div>
                            <div className="class-det-topic-heading">
                                <span>{index + 1}.</span>
                                <span>{topic.title}</span>

                                <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" />


                            </div>
                            <div className="class-det-topic-content">
                                <div>
                                    <span classname="">Helping Material</span>
                                    {
                                        topic.helpingmaterial.map((item, index) => {
                                            return <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBookOpen} />
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="inner-content-right">

                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>



                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                                <div>
                                    <span classname="">Assignment</span>

                                    {
                                        topic.assignments.map((assignment, index) => {
                                            return <div key={index + 1} y className="main-content-1">

                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faClipboardList} />
                                                    <a download onClick={() => {
                                                        axios
                                                            .post("/download-assignment", {
                                                                filename: assignment.filename,
                                                                

                                                            },)
                                                            .then((res) => {

                                                                console.log(res.data);

                                                                const url = window.URL.createObjectURL(new Blob([res.data]));
                                                                const link = document.createElement('a');
                                                                link.href = url;
                                                                console.log(url);
                                                                link.setAttribute('download', "app.pdf");
                                                                document.body.appendChild(link);
                                                                link.click();


                                                            })
                                                            .catch(err => console.error(err));
                                                    }}>{index + 1}.  {assignment.title}</a>

                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Due Date :{assignment.submissiondate}</span>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                </div>
                                            </div>
                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                                <div>
                                    <span classname="">Online class</span>
                                    {
                                        topic.helpingmaterial.map((item, index) => {
                                            return <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>{"Online Class "}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                                                </div>

                                            </div>




                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                            </div>

                        </div>

                    </div>

                </>
            })}



    </>
}

export default ClassDetails;

{/* <div className="class-det-topic-content"> */ }

{/* {
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



                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>

                                            </div>
                                            <hr className="hr" />
                                        </>

                                        :
                                        ""

                                } */}
{/* checking if thee assignment part is present */ }

{/* {
                                    topic.Assignment.assignp ?

                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faClipboardList} />
                                                    <span>Assignment No {topic.topicid}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Due Date :{topic.Assignment.duedate}</span>


                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> :
                                        ""


                                } */}

{/* checking if the quiz part is present */ }
{/* {

                                    topic.quiz.quizp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>Quiz no {topic.topicid}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Scheduled :{topic.quiz.duedate}</span>


                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""

                                } */}
{/* checking if there is any online class created */ }
{/* {

                                    topic.onlineclass.onlineclassp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>{"Online Class " + topic.topicname}</span>
                                                </div>
                                                <div className="inner-content-right">



                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />





                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""

                                } */}


{/* checking if te recorded sessions are available */ }
{/* {
                                    topic.recordedsession.recordedsessionp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faCirclePlay} />
                                                    <span>Recorded Video Session</span>
                                                </div>
                                                <div className="inner-content-right">

                                             
                                                     
                                                            <FontAwesomeIcon icon={faEdit} />
                                                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                       

                                                    
                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""
                                }
                            </div> */}