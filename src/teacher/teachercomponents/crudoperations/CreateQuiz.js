import React from 'react'
import { useState } from 'react';
import "../../../style/buildaquiz.css"
import QuizComponent from './quizcomponent';
import { QuizContext } from '../../context/QuizCOntext';
import { useContext } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { Accordion } from 'react-bootstrap';





export default function CreateQuiz() {
    const params = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const courseid = params.courseid;

    const [show, setShow] = useState(true);
    const [cookies] = useCookies();

    const [addComponent, context] = useContext(QuizContext);
    const [finalquestions] = context['finalquestions'];
    const [quiztime, setQuiztime] = useState(new Date());
    const [allowedtime, setAllowedtime] = useState("5");
    const [datatosubmit, setData] = useState({});
    const [topics, setTopics] = useState([]);
    const [selectedtopic, setSelectedTopic] = useState("");
    const [title, setTitle] = useState("");
    const [availabletill, setAvailabletill] = useState("");
    const [selectedtopicerror, setSelectedTopicError] = useState("");
    const [formerror, setFormError] = useState("")

    useEffect(() => {
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
    }, [])







    return (<>

        <div className='quiz-header '>

            <Accordion defaultActiveKey="0" alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Quiz Details</Accordion.Header>
                    <Accordion.Body>
                    <span className="col ms-3 error">{formerror}</span>
                        <div>
                            <div className='mt-3 mb-3'>
                                <span className='me-5'>Quiz Title</span>
                                <input type="text" value={title} onChange={(e) => {
                                    setTitle(e.target.value)
                                }} />
                            </div>
                            <div>
                                <span className='me-4'>Quiz Start Time</span>
                                <DateTimePicker value={quiztime} onChange={(value) => {
                                    setQuiztime(value)
                                }} />
                            </div>
                            <div>
                                <span className='me-4'>Quiz Available Till</span>
                                <DateTimePicker value={availabletill} onChange={(value) => {
                                    setAvailabletill(value);
                                }} />
                            </div>
                            <div className='mt-3'>
                                <span className='me-5'>Allowed Time to Take Quiz</span>
                                <input type="number" value={allowedtime} onChange={(e) => {
                                    setAllowedtime(e.target.value)
                                }} />
                            </div>
                            <div className='mt-3'>
                                <span className='me-5'>Select the topic</span>

                                <select className="form-select" aria-label="Default select example" onChange={(e) => {
                                    setSelectedTopic(e.target.value)
                                }} >
                                    <option value="">Choose Topic</option>

                                    {

                                        topics.map((topic, index) => {
                                            return <option key={index + 1} value={topic._id}>{topic.title}</option>

                                        })
                                    }

                                </select>
                                <span className="col ms-3 error">{selectedtopicerror}</span>

                            </div>

                        </div>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>





        </div>

        <div className='mt-2 d-flex justify-content-between total'>
            <span>Total Questions Created</span>
            <span>{finalquestions.length}</span>


        </div>
        {/* quiz creation form */}
        <QuizComponent />

        <div className='quiz-add'>
            <button className='btn btn-primary' onClick={() => {
                addComponent();
            }}>Add This Question And move to Next</button>

        </div>
        <button className='btn btn-primary submit-btn' onClick={(e) => {
            e.preventDefault();



            setShow(false)
            if (finalquestions.length > 0) {


                const convertedtime = quiztime.toLocaleString();
                const endingtime = availabletill.toLocaleString();

                if (selectedtopic === "") {
                    console.log(selectedtopic);
                    setSelectedTopicError("Please Select a topic to Create Quiz ")
                    alert.error("PLase Select a topic to create Quiz")

                }
                else {
                    const final = quiztime.toString();
                    setSelectedTopicError("")


                    if (title === "" || quiztime === "" || availabletill === "") {
                        setFormError("Please fill all the details below")

                    }
                    else {
                        axios
                            .post("/create-quiz/" + selectedtopic, { finalquestions, title, allowedtime, convertedtime, courseid, endingtime }, {
                                headers: {
                                    'teacher-auth-token': cookies.user.AuthToken

                                }
                            })
                            .then((res) => {
                                if (res.data.success === true) {
                                    alert.success(res.data.message);
                                    navigate('/teacher/dashboard/classdetails/' + courseid)

                                }
                                else {
                                    alert.error(res.data)
                                }
                            })
                            .catch(err => console.error(err));
                    }


                }


            }
            else {
                alert.info("Please add 1 Question Atleast")
            }
        }}>Finish and Create Quiz</button>

    </>)
}
