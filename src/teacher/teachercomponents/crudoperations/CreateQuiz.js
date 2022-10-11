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
    const [allowedtime, setAllowedtime] = useState("15");
    const [datatosubmit, setData] = useState({});
    const [topics, setTopics] = useState([]);
    const [selectedtopic, setSelectedTopic] = useState("");
    const [title, setTitle] = useState("Quiz")

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
                        <h6 className='bg-danger'>PLease Fill this info first</h6>
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

                console.log(quiztime, allowedtime, selectedtopic);
                console.log(title);

                if (selectedtopic === "") {
                    console.log(selectedtopic);
                    alert.error("PLase Select a topic to create Quiz")

                }
                else {

                    axios
                        .post("/create-quiz/" + selectedtopic, { finalquestions,title, allowedtime, quiztime, courseid }, {
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
        }}>Finish and Creat Quiz</button>

    </>)
}
