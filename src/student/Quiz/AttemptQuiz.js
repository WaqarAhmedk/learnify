import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useTimer } from 'react-timer-hook';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';






export default function AttemptQuiz() {

    const data = useLocation();
    const allowedtime = data.state.allowedtime;
    const alert = useAlert();
    const navigate = useNavigate();
    const [num, setNum] = useState(0);
    let intervalRef = useRef();

    const increaseNum = () => setNum((prev) => prev + 1);


    const Startime = () => {
        intervalRef.current = setInterval(increaseNum, 1000);

        return () => clearInterval(intervalRef.current);

    }

    const [cookies, setCookies] = useCookies();


    const params = useParams();
    const quizid = params.quizid;


    const [finish, setFinish] = useState(false);
    const [showresult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [selectedval, setSelectedval] = useState("");
    const [correct, setCorrect] = useState(0);

    const [questiondata, setQuestionData] = useState([]);

    let [currentquestion, setCurrentQuestion] = useState(0);
    const [quizdata, setQuizdata] = useState({});

    const [attemptedquestions, setAttemptedQuestions] = useState(0);
    const [timespent, setTimespent] = useState(0.0);





    const { seconds, minutes, hours, restart, } = useTimer({
        allowedtime, onExpire: () => {
            setFinish(true);

            setTimespent(num / 60)
            SendQuizResults();


        }
    });




    const SendQuizResults = () => {

        console.log(timespent);

        axios
            .post("/submit-quiz/" + quizid, {
                score, correct, attemptedquestions, timespent
            }, {
                headers: {
                    'student-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {

                if (res.data.success === true) {
                    alert.success(res.data.message)
                    setShowResult(true);

                } else if (res.data.success === false) {
                    alert.error(res.data.message)

                }


            })
            .catch(err => console.error(err));
    }


    const getQuestionData = () => {



        axios
            .get("/get-quiz-alldetails/" + quizid)
            .then((res) => {

                if (res.data.success === true) {
                    setQuizdata(res.data.details);
                    setQuestionData(res.data.details.questions);
                    restart(allowedtime);
                    Startime();
                }
            })
            .catch(err => console.error(err));
    }




    useEffect(() => {
        getQuestionData();
    }, [])
    return (
        <>
            {
                showresult ? <>

                    <div className='start-main-div'>

                        <div className='start-inner-div'>
                            <div className='d-flex justify-content-between mt-3'>
                                <span>TOTAL Questions</span>
                                <span>{questiondata.length}</span>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <span>Attempted Questions</span>
                                <span>{attemptedquestions}</span>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <span>Correct Ans</span>
                                <span>{correct}</span>
                            </div>

                            <div className='d-flex justify-content-between mt-2'>
                                <span>Allowed Time</span>
                                <span>{quizdata.allowedtime} minutes</span>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <span>Time Spent</span>
                                <span>{timespent} minutes</span>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <span>Total Marks</span>
                                <span>{quizdata.totalmarks}</span>
                            </div>
                            <div className='d-flex justify-content-between mt-2'>
                                <span>Obtained  Marks</span>
                                <span>{score}</span>
                            </div>
                            <button className='btn btn-primary start-btn' onClick={() => {
                                navigate('/dashboard')
                            }} >Finish</button>

                        </div>


                    </div>


                </> : <div>
                    {
                        questiondata.length > 0 ? <div className='start-main-div'>

                            <div className='d-flex ms-4 mt-2'>
                                <span className='me-5'>Remaning Time</span>
                                <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
                            </div>
                            <div className='d-flex ms-4 mt-2'>
                                <span className='me-5'>Remaning Questions</span>
                                <span>{questiondata.length - attemptedquestions}</span>
                            </div>

                            {
                                finish ? <button onClick={()=>{
                                    SendQuizResults();
                                    setTimespent(num/60)
                                } } className='btn btn-primary start-btn'>
                                    SUBMIT QUIZ
                                </button>

                                    : <div className='start-inner-div'>

                                        <div>
                                            {
                                                questiondata[currentquestion].questiontext
                                            }
                                        </div>
                                        <div>
                                            <div className='d-block' >

                                                <InputGroup className='mb-4 mt-4'>
                                                    <InputGroup.Radio
                                                        value={questiondata[currentquestion].opt1val}
                                                        checked={selectedval == questiondata[currentquestion].opt1val}
                                                        onChange={(e) => {
                                                            setSelectedval(e.target.value)
                                                        }} />
                                                    <Form.Control className='me-3' readOnly value={questiondata[currentquestion].opt1val} />

                                                    <InputGroup.Radio
                                                        value={questiondata[currentquestion].opt2val}
                                                        checked={selectedval == questiondata[currentquestion].opt2val}
                                                        onChange={(e) => {
                                                            setSelectedval(e.target.value)
                                                        }} />
                                                    <Form.Control readOnly value={questiondata[currentquestion].opt2val} />
                                                </InputGroup>

                                                <InputGroup>
                                                    <InputGroup.Radio
                                                        value={questiondata[currentquestion].opt3val}
                                                        checked={selectedval == questiondata[currentquestion].opt3val}
                                                        onChange={(e) => {
                                                            setSelectedval(e.target.value)
                                                        }} />
                                                    <Form.Control readOnly className='me-3' value={questiondata[currentquestion].opt3val} />
                                                    <InputGroup.Radio
                                                        value={questiondata[currentquestion].opt4val}
                                                        checked={selectedval == questiondata[currentquestion].opt4val}
                                                        onChange={(e) => {
                                                            setSelectedval(e.target.value)
                                                        }} />
                                                    <Form.Control readOnly value={questiondata[currentquestion].opt4val} />
                                                </InputGroup>

                                            </div>

                                        </div>


                                        <button className='btn btn-primary start-btn' onClick={() => {

                                            //check if answer is correct
                                            if (selectedval === questiondata[currentquestion].correctans) {
                                                const newscore = score + 2;
                                                setScore(score + 2);
                                                setCorrect(correct + 1);
                                            }



                                            const totalquestions = attemptedquestions + 1;
                                            setAttemptedQuestions(totalquestions)



                                            if (currentquestion < questiondata.length - 1) {

                                                setCurrentQuestion(currentquestion + 1);
                                            }
                                            else {
                                                setFinish(true);

                                            }
                                        }} >Next</button>




                                    </div>
                            }



                        </div> : ""
                    }
                </div>
            }



        </>
    )
}
