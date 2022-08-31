
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown, faCircleCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import "../style/coursedetails.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import Discussionboard from "../components/discussionboard";


function ClassDetails() {

    let navigate = useNavigate();
    const data = useLocation();
    const courseid = data.state.courseid;
    const coursename = data.state.coursename;
    const [topics, setTopics] = useState([]);
    const [cookies, setCookies] = useCookies();




    let today = Date().toString();


    const [discussion, setDiscussion] = useState(false);
    const opendiscussion = () => {
        setDiscussion(true)
    }
    const closediscussion = () => {
        setDiscussion(false)
    }


    const getAllParticipents = () => {
        console.log(courseid);
        axios
            .get("/get-all-participents/" + courseid, {
                headers: {
                    'student-auth-token': cookies.StudentAuth

                }
            })
            .then((res) => {
                console.log(res.data);

            })
            .catch(err => console.error(err));
    }

    const getAllTopics = () => {
        console.log(courseid);
        axios
            .get("/get-topics/" + courseid, {
                headers: {
                    'student-auth-token': cookies.StudentAuth

                }
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    setTopics(res.data.topics)

                }
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

                        <div onClick={opendiscussion}>
                            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                            <span>Discussion Board</span>
                        </div>
                        <div onClick={getAllParticipents}>
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span>All Participents</span>
                        </div>
                    </div>


                }
            </div>

        </div>

        {/* class topic details are shown here */}


        {

            topics.map.length < 1 ? "nothing toshow" : topics.map((topic, index) => {

                return <div key={index + 1} className="row classdetails-content">

                    <div>
                        <div className="class-det-topic-heading">
                            <span>{index + 1}.</span>
                            <span>{topic.title}</span>

                        </div>

                        <div className="class-det-topic-content">
                            {
                                topic.helpingmaterial.length < 1 ? "" : <div>

                                    <span className="">Helping Material</span>
                                    {
                                        topic.helpingmaterial.map((item, index) => {
                                            return <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBookOpen} />
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="inner-content-right">

                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>



                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                            }

                            {
                                topic.assignments.length < 1 ? "" : <div>

                                    <span className="">Assignment</span>

                                    {
                                        topic.assignments.map((assignment, index) => {
                                            return <div key={index + 1} >
                                                <div className="main-content-1">
                                                    <div className="inner-content-left">
                                                        <FontAwesomeIcon icon={faClipboardList} />
                                                        <a download onClick={() => {
                                                            axios
                                                                .post("/download-assignment", {
                                                                    filename: assignment.filename,


                                                                })
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
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                    </div>

                                                </div>
                                                <button className="btn btn-sm btn-primary ms-3">submit</button>
                                            </div>
                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                            }
                            <div>
                                <span className="">Online class</span>
                                {
                                    topic.onlineclass.map((item, index) => {
                                        return <div key={index} className="main-content-1">
                                            <div className="inner-content-left">
                                                <FontAwesomeIcon icon={faBrain} />
                                                <span>{item.title}</span>
                                            </div>
                                            <div className="inner-content-right">
                                                <button className="btn btn-primary">Join</button>
                                            </div>

                                        </div>




                                    })
                                }
                                <hr className="hr" />

                            </div>
                        </div>

                    </div>

                </div>



            })}


        {/* Discuusion board */}
        <Modal show={discussion}>
            <ModalHeader closeButton onClick={closediscussion}>Discussion Board for {coursename}</ModalHeader>
            <ModalBody>
                <Discussionboard role="student" courseid={courseid} />
            </ModalBody>
        </Modal>
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