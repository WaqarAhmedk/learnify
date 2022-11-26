import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, } from '@fortawesome/free-solid-svg-icons';
import "../../../style/coursedetails.css"
import { useState, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { CourseContext } from '../../context/Coursecontext';
import { Modal, ModalBody, ModalFooter, ModalHeader, OverlayTrigger, Popover } from 'react-bootstrap';
import QuizResult from './QuizResult';
import UpdateAssignment from '../crudoperations/UpdateAssignment';
import { useAlert } from 'react-alert';
import UpdateOnlineClass from '../crudoperations/UpdateOnlineclass';
import UpdateQuiz from '../crudoperations/UpdateQuiz';




export default function ClassTopicsDetail() {

    const context = useContext(CourseContext);
    const [topics, setTopics] = context['topics'];
    const [courseid, setCourseid] = context['courseid'];
    const [cookies, setCookies] = useCookies();
    const alert = useAlert();


    const [toUpdateTopicid, setToUpdateTopicId] = useState("");
    const [toUpdateId, setToUpdateId] = useState("");

    const [todeleteItemId, setTodeleteItemid] = useState("");
    const [toDeleteItemTopicId, setTodeleteItemTopicId] = useState("");

    const [showDeleteModal, setShowDelteModal] = useState(false);
    const [showquizresultmodal, setShowquizModal] = useState(false);
    const [showUpdateAssignment, setShowUpdateAssignment] = useState(false);
    const [deleteApi, setDeleteApi] = useState("");
    const [showUpdateClass, setShowUpdateClass] = useState(false);
    const [showQuizupdate, setShowQuizUpdate] = useState(false);


    const [quizResult, setQuizresult] = useState({

    });
    const [students, setStudents] = useState([]);

    const [desc, setDesc] = useState("");


    let navigate = useNavigate();
    const params = useParams();
    const cid = params.courseid;


    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Description</Popover.Header>
            <Popover.Body>
                {desc}
            </Popover.Body>
        </Popover>
    );
    const getAllTopics = () => {


        axios
            .get("/get-topics/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                if (res.data.success === true) {
                    setTopics(res.data.topics);
                }
                else {
                    console.log(res.data);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setCourseid(cid);
    }, [])
    return (

        <>
            {
                topics.length === 0 ?
                    <div className='ms-5 mt-3'>No Topic is Created for this Course Please Create One from
                        <b>Create New Activity </b>
                        from top</div> :
                    topics.map((topic, index) => {
                        return <div key={index + 1} className="row classdetails-content">

                            <div>
                                <div className="class-det-topic-heading">
                                    <span>{index + 1}.</span>
                                    <span>{topic.title}</span>

                                    <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" />

                                </div>
                                <div className="class-det-topic-content">
                                    {
                                        topic.helpingmaterial.length > 0 ? <div>
                                            <span className="ms-3">Helping Material</span>
                                            {
                                                topic.helpingmaterial.map((item, index) => {
                                                    return <div key={index + 1} className="main-content-1">
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

                                        </div> : ""
                                    }


                                    {
                                        topic.assignments.length > 0 ?
                                            <div>
                                                <span className="ms-3">Assignment</span>

                                                {
                                                    topic.assignments.map((assignment, index) => {
                                                        return <div key={index + 1} className="main-content-1">


                                                            <OverlayTrigger on placement="right" overlay={popover} >


                                                                <div className="inner-content-left">
                                                                    <a download onClick={() => {
                                                                        axios
                                                                            .post("/download-assignment", {
                                                                                filename: assignment.filename,


                                                                            })
                                                                            .then((res) => {


                                                                                const url = window.URL.createObjectURL(new Blob([res.data]));
                                                                                const link = document.createElement('a');
                                                                                link.href = url;
                                                                                console.log(url);
                                                                                link.setAttribute('download', "app.pdf");
                                                                                document.body.appendChild(link);
                                                                                link.click();


                                                                            })
                                                                            .catch(err => console.error(err));
                                                                    }}>{index + 1}.   {assignment.title}</a>

                                                                </div>
                                                            </OverlayTrigger>



                                                            <div className='me-3'>
                                                                <div className="inner-content-right">
                                                                    <FontAwesomeIcon className='me-3' icon={faEdit} onClick={() => {
                                                                        setShowUpdateAssignment(true);
                                                                        setToUpdateId(assignment._id);
                                                                        setToUpdateTopicId(topic.
                                                                            _id)
                                                                    }} />

                                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon me-3" onClick={() => {

                                                                        setDeleteApi(`/delete-assignment/${topic._id}/${assignment._id}`)
                                                                        setShowDelteModal(true);

                                                                    }} />
                                                                    <button className='btn btn-sm btn-primary me-3'>View Records</button>


                                                                </div>
                                                                <span className="time">Due Date :{assignment.submissiondate}</span>

                                                            </div>
                                                        </div>
                                                    })
                                                }
                                                <hr className="hr" />

                                            </div> : ""
                                    }

                                    {
                                        topic.onlineclass.length > 0 ? <div>
                                            <span className="ms-3">Online class</span>
                                            {
                                                topic.onlineclass.map((item, index) => {

                                                    return <div key={index + 1} className="main-content-1">
                                                        <div className="inner-content-left">
                                                            <FontAwesomeIcon icon={faBrain} />
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <div>
                                                            <div className="inner-content-right">
                                                                <span className='btn btn-primary' onClick={() => {
                                                                    navigate(item.classlink)

                                                                }}>Join Class</span>


                                                                <FontAwesomeIcon icon={faEdit} onClick={() => {
                                                                    setShowUpdateClass(true);
                                                                    setToUpdateTopicId(topic._id);
                                                                    setToUpdateId(item._id);
                                                                }} />
                                                                <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" onClick={() => {
                                                                    setDeleteApi(`/delete-online-class/${topic._id}/${item._id}`)
                                                                    setShowDelteModal(true);
                                                                }} />

                                                            </div>
                                                            <span>starts at :{item.classtime}</span>
                                                        </div>

                                                    </div>




                                                })
                                            }
                                            <hr className="hr" />

                                        </div> : ""
                                    }

                                    {
                                        topic.quiz.length > 0 ? <div>
                                            <span className="ms-3">Quiz</span>
                                            {
                                                topic.quiz.map((item, index) => {
                                                    console.log(item);
                                                    return <div key={index + 1} className="main-content-1">
                                                        <div className="inner-content-left">
                                                            <FontAwesomeIcon icon={faBrain} />
                                                            <span>{item.quizref.title}</span>
                                                        </div>

                                                        <div className="inner-content-right d-block">

                                                            <div>
                                                                <span className="time">Available At :{item.quizref.quiztime}</span>

                                                                <FontAwesomeIcon icon={faEdit} className="ms-3" onClick={
                                                                    () => {
                                                                        setShowQuizUpdate(true);
                                                                        setToUpdateTopicId(topic._id);
                                                                        setToUpdateId(item.quizref._id);
                                                                    }
                                                                } />
                                                                <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" onClick={() => {
                                                                    setDeleteApi(`/delete-quiz/${topic._id}/${item._id}`)
                                                                    setShowDelteModal(true);
                                                                }} />
                                                            </div>
                                                            <div>
                                                                <button className='btn btn-primary' onClick={() => {
                                                                    console.log(item.quizref._id);
                                                                    setShowquizModal(true)
                                                                    axios.get("/get-all-students-quiz-result/" + item.quizref._id, {

                                                                        headers: {
                                                                            'student-auth-token': cookies.user.AuthToken

                                                                        }
                                                                    })
                                                                        .then((res) => {
                                                                            if (res.data.success === true) {

                                                                                setQuizresult(res.data.details);
                                                                                setStudents(res.data.details.students);

                                                                            } else {

                                                                            }

                                                                        })
                                                                        .catch(err => console.error(err));



                                                                }}>View Records</button>
                                                            </div>
                                                        </div>


                                                    </div>



                                                })
                                            }
                                            <hr className="hr" />

                                        </div> : ""
                                    }



                                </div>

                            </div>

                        </div>

                    })
            }

            <Modal show={showDeleteModal}>
                <ModalHeader>Confirm Delete</ModalHeader>
                <ModalBody>

                    Are you Sure you want to delete this Item?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => {
                        setShowDelteModal(false);
                        setTodeleteItemTopicId("");
                        setTodeleteItemid("");
                    }}>Cancel</button>
                    <button className='btn btn-primary' onClick={() => {

                        if (deleteApi != "") {
                            axios.delete(deleteApi,
                                {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken,
                                        headers:
                                        {
                                            'content-type': 'multipart/form-data',
                                        }
                                    }
                                }
                            ).then((res) => {
                                if (res.data.success == true) {
                                    setShowDelteModal(false);
                                    getAllTopics();
                                    setDeleteApi("")
                                    alert.success(res.data.msg)



                                }



                            })
                                .catch(err => console.error(err));
                        }

                    }}>Delete</button>

                </ModalFooter>
            </Modal>

            <QuizResult
                show={showquizresultmodal}
                details={quizResult}
                students={students}
                onHide={() => setShowquizModal(false)}
            />
            <UpdateQuiz

                show={showQuizupdate}
                id={toUpdateId}
                topicid={toUpdateTopicid}
                onHide={() => {
                    setShowQuizUpdate(false);
                    setToUpdateId("");
                    setToUpdateTopicId("");
                }}

            />

            <UpdateAssignment
                show={showUpdateAssignment}
                id={toUpdateId}
                topicid={toUpdateTopicid}
                onHide={() => {
                    setShowUpdateAssignment(false);
                    setToUpdateId("");
                    setToUpdateTopicId("");
                }}

            />

            <UpdateOnlineClass
                show={showUpdateClass}
                id={toUpdateId}
                topicid={toUpdateTopicid}
                onHide={() => {
                    setShowUpdateClass(false)
                    setToUpdateId("");
                    setToUpdateTopicId("");
                }}


            />


        </>

    )

}
