import React from 'react';
import "../../style/attemptquiz.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export default function StartQuiz() {

    const params = useParams();
    const navigate = useNavigate();

    const quizid = params.quizid;



    const [quizdetails, setQuizdetails] = useState({
        title: "",
        totalquestions: 0,
        allowedtime: 0,
        totalmarks: 0
    });

    const getQuizdetails = () => {
        axios
            .get("/get-quiz-details/" + quizid)
            .then((res) => {
                console.log(res);


                if (res.data.success === true) {
                    setQuizdetails(res.data.details);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getQuizdetails();
    }, [])



    return (
        <div className='start-main-div'>

            <div className='start-inner-div'>
                <h4 className='ms-5 quiz-title'>{quizdetails.title}</h4>
                <div className='d-flex justify-content-between mt-3'>
                    <span>TOTAL Questions</span>
                    <span>{quizdetails.totalquestions}</span>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <span>Allowed Time</span>
                    <span>{quizdetails.allowedtime} minutes</span>
                </div>
                <div className='d-flex justify-content-between mt-2'>
                    <span>Total Marks</span>
                    <span>{quizdetails.totalmarks}</span>
                </div>
                <button className='btn btn-primary start-btn' onClick={() => {

                    const allowedtime = quizdetails.allowedtime * 60;
                    var t = new Date();
                    t.setSeconds(t.getSeconds() + allowedtime);
                    navigate('/attemptquiz/' + quizid, { state: { allowedtime: t } })
                }} >Start Quiz</button>

            </div>


        </div>
    )
}
