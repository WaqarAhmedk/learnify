
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown, faCircleCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import "../style/coursedetails.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalHeader, Popover, OverlayTrigger } from 'react-bootstrap';
import Discussionboard from "../components/discussionboard";
import download from "js-file-download"
import { useAlert } from "react-alert";
import UploadAssignment from "./StudentComponents.js/UploadAssignment";
import ViewAllParticipants from "./StudentComponents.js/ViewAllParticipant";




function ClassDetails() {
    const alert = useAlert();

    let navigate = useNavigate();
    const data = useLocation();
    const courseid = data.state.courseid;
    const coursename = data.state.coursename;
    const [topics, setTopics] = useState([]);
    const [cookies, setCookies] = useCookies();
    const [desc, setDesc] = useState("");
    const [quizresult, setQuizresult] = useState({ students: [{ score: 0, correct: 0, wrong: 0 }] });
    const [shwoAllparticpant, setShowAllParticpant] = useState(false);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Description</Popover.Header>
            <Popover.Body>
                {desc}
            </Popover.Body>
        </Popover>
    );

    //Upload Assignment 

    const [showuploadAssignment, setShowUploadAssignment] = useState(false);
    const [Assignmentdata, setAssignmentData] = useState({});
    const [currentTopic, setCurrentTopic] = useState("");
    const [participants, setParticipants] = useState([]);


    const [discussion, setDiscussion] = useState(false);
    const opendiscussion = () => {
        setDiscussion(true)
    }
    const closediscussion = () => {
        setDiscussion(false)
    }

    const [showquizresult, setShowquizResult] = useState(false);
    const openQuizresult = () => {
        setShowquizResult(true);
    }
    const closeQuizresult = () => {
        setShowquizResult(false);
    }



    const checkQuizAvailbility = (quizid) => {
        axios.get("/check-quiztime/" + quizid, {
            headers: {
                'student-auth-token': cookies.user.AuthToken

            }
        }).then((res) => {
            if (res.data.success === true && res.data.allowed === true) {
                navigate('/startquiz/' + quizid)
            }
            else if (res.data.success === true && res.data.allowed === false) {
                alert.info(res.data.message)
            }
        }
        ).catch((err) => {
            console.log(err);
        })
    }

    const getQuizResult = (quizid) => {
        axios
            .get("/get-your-quiz-result/" + quizid, {
                headers: {
                    'student-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                if (res.data.success === true) {
                    setQuizresult(res.data.details)
                    openQuizresult();
                }

            })
            .catch(err => console.error(err));
    }


   

    const getAllTopics = () => {
        axios.get("/get-topics/" + courseid, {
            headers: {
                'student-auth-token': cookies.user.AuthToken

            }
        })
            .then((res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    console.log(res.data);
                    setTopics(res.data.topics)

                }
            })
            .catch(err => console.error(err));
    }


    const downloadAssignment = (filename) => {
        axios
            .get("/download-assignment/" + filename, { responseType: "blob" })
            .then((res) => {
                console.log(res.data);
                download(res.data, filename);

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

                <div className="form-group has-search class-details-searchdiv me-5">
                </div>

                {

                    <div className="inst-class-details-options ms-5">

                        <div onClick={opendiscussion} className="me-5">
                            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                            <span>Discussion Board</span>
                        </div>
                        <div onClick={() => {
                            setShowAllParticpant(true);
                        }} >
                            <FontAwesomeIcon icon={faUserGroup} />
                            <span>All Participents</span>
                        </div>
                    </div>


                }
            </div>

        </div>

        {/* class topic details are shown here */}


        {

            topics.length < 1 ? <div className="ms-5 mt-2"> No Course Topic are Posted By the Teacher </div> :

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

                                        <span className="ms-3">Helping Material</span>
                                        {
                                            topic.helpingmaterial.map((item, index) => {
                                                return <div className="main-content-1" onMouseEnter={() => {
                                                    setDesc(item.description);
                                                }}>
                                                    <OverlayTrigger on placement="right" overlay={popover} >

                                                        <div className="inner-content-left">
                                                            <FontAwesomeIcon icon={faBookOpen} />
                                                            <span>{item.title}</span>
                                                        </div>
                                                    </OverlayTrigger>
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

                                        <span className="ms-3">Assignment</span>

                                        {
                                            topic.assignments.map((assignment, index) => {
                                                return <div key={index + 1} onMouseEnter={() => {
                                                    setDesc(assignment.description);
                                                }}>
                                                    <div className="main-content-1">
                                                        <OverlayTrigger on placement="right" overlay={popover} >

                                                            <div className="inner-content-left">
                                                                <FontAwesomeIcon icon={faClipboardList} />
                                                                <span className="text-primary"
                                                                    onClick={() => {
                                                                        downloadAssignment(assignment.filename);
                                                                    }}

                                                                >{index + 1}.  {assignment.title}</span>

                                                            </div>
                                                        </OverlayTrigger>
                                                        <div className="inner-content-right">
                                                            <span className="time">Due Date :{assignment.submissiondate}</span>
                                                            <FontAwesomeIcon icon={faCircleCheck} />

                                                            <button className="btn btn-sm btn-primary ms-3" onClick={() => {

                                                                setAssignmentData(assignment);
                                                                setCurrentTopic(topic._id);
                                                                setShowUploadAssignment(true);

                                                            }}>Upload Assignment</button>


                                                        </div>

                                                    </div>
                                                </div>
                                            })
                                        }
                                        <hr className="hr" />

                                    </div>
                                }
                                {
                                    topic.onlineclass.length > 0 ? <div>
                                        <span className="ms-3">Online class</span>
                                        {
                                            topic.onlineclass.map((item, index) => {
                                                return <div key={index} className="main-content-1">
                                                    <div className="inner-content-left">
                                                        <FontAwesomeIcon icon={faBrain} />
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <div className="inner-content-right">
                                                        <button className="btn btn-primary" onClick={() => {
                                                            navigate("/face", { state: { classlink: item.classlink, topicid: topic._id, } })
                                                        }}>Join</button>
                                                    </div>

                                                </div>




                                            })
                                        }
                                        <hr className="hr" />

                                    </div> : ""
                                }
                                <div>

                                    {

                                        topic.quiz.length > 0 ? <>
                                            <span className="ms-3">Quiz</span>


                                            {
                                                topic.quiz.map((item, index) => {
                                                    return <div key={index + 1} className="main-content-1">
                                                        <div className="inner-content-left">
                                                            <FontAwesomeIcon icon={faBrain} />
                                                            <span>{item.quizref.title}</span>
                                                        </div>

                                                        <div className="inner-content-right d-block">


                                                            <span className="time">Available at :{item.quizref.quiztime}</span>
                                                            <button className='btn btn-primary' onClick={() => { getQuizResult(item.quizref._id); }}>View Result</button>

                                                            <button className='btn btn-primary ms-3' onClick={() => {
                                                                checkQuizAvailbility(item.quizref._id);
                                                            }}>Attempt Quiz</button>

                                                        </div>


                                                    </div>



                                                })
                                            }

                                            <hr className="hr" />

                                        </> : ""
                                    }


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



        {/* Show Quiz result Modal */}

        <Modal show={showquizresult}>
            <ModalHeader closeButton onClick={closeQuizresult} >Quiz Result</ModalHeader>
            <ModalBody>

                <div>
                    <div className="d-flex justify-content-between ps-3 pe-3 mb-3">
                        <span>Your Score</span>
                        <span>{quizresult.students[0].score}</span>

                    </div>
                    <div className="d-flex justify-content-between ps-3 pe-3 mb-3">
                        <span>Correct Answers</span>
                        <span>{quizresult.students[0].correct}</span>

                    </div>

                    <div className="d-flex justify-content-between ps-3 pe-3 mb-3">
                        <span>Time Spent </span>
                        <span>43 Minutes</span>

                    </div>
                </div>
            </ModalBody>
        </Modal>



        <UploadAssignment
            show={showuploadAssignment}
            data={Assignmentdata}
            topic={currentTopic}
            onHide={() => {
                setShowUploadAssignment(false)
            }}
        />

        <ViewAllParticipants
        show={shwoAllparticpant}
        participant={participants}
        courseid={courseid}
        onHide={()=>{
            setShowAllParticpant(false)
        }}

        />
    </>
}

export default ClassDetails;

