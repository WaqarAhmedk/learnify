import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, } from '@fortawesome/free-solid-svg-icons';
import "../../../style/coursedetails.css"
import { useState, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios, { Axios } from "axios";
import { useCookies } from 'react-cookie';
import { CourseContext } from '../../context/Coursecontext';



export default function ClassTopicsDetail() {
    const timenow = Date();

    const context = useContext(CourseContext);
    const [coursename, setCoursename] = context['course'];
    const [topics, setTopics] = context['topics'];
    const [courseid, setCourseid] = context['courseid'];
    const [cookies, setCookies] = useCookies();

    let navigate = useNavigate();
    const params = useParams();
    const cid = params.courseid;


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
                                    <div>
                                        <span classame="">Helping Material</span>
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

                                    </div>
                                    <div>
                                        <span className="">Assignment</span>

                                        {
                                            topic.assignments.map((assignment, index) => {
                                                return <div key={index + 1} className="main-content-1">

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
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                    </div>
                                                </div>
                                            })
                                        }
                                        <hr className="hr" />

                                    </div>
                                    <div>
                                        <span className="">Online class</span>
                                        {
                                            topic.onlineclass.map((item, index) => {

                                                return <div key={index + 1} className="main-content-1">
                                                    <div className="inner-content-left">
                                                        <FontAwesomeIcon icon={faBrain} />
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <div className="inner-content-right">
                                                        <span className='btn btn-primary' onClick={() => {
                                                            navigate(item.classlink)

                                                        }}>Join Class</span>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                                                    </div>

                                                </div>




                                            })
                                        }
                                        <hr className="hr" />

                                    </div>
                                    <div>
                                        <span className="">Quiz</span>
                                        {
                                            topic.quiz.map((item, index) => {
                                                return  <div key={index + 1} className="main-content-1">
                                                    <div className="inner-content-left">
                                                        <FontAwesomeIcon icon={faBrain} />
                                                        <span>{item.quizref.title}</span>
                                                    </div>

                                                    <div className="inner-content-right d-block">

                                                        <div>
                                                            <span className="time">Due Date :{item.quizref.quiztime}</span>

                                                            <FontAwesomeIcon icon={faEdit} className="ms-3" />
                                                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                        </div>
                                                        <div>
                                                            <button className='btn btn-primary' onClick={() => {
                                                                console.log(timenow);
                                                            }}>View Records</button>
                                                        </div>
                                                    </div>
                                                  

                                                </div>



                                            })
                                        }
                                        <hr className="hr" />

                                    </div>
                                </div>

                            </div>

                        </div>

                    })
            }
        </>

    )

}
