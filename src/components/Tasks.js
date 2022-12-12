import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';



export default function Tasks() {
    const [assignments, setAssignments] = useState([]);
    const [quizes, setQuizes] = useState([]);
    const [classes, setClasses] = useState([]);

    const [cookies, setCookies] = useCookies();
    const getevents = () => {
        axios
            .get("/get-all-tasks", {
                headers: {
                    "student-auth-token": cookies.user.AuthToken
                }
            })
            .then((res) => {
                console.log(res);
                setAssignments(res.data.assignments);
                setQuizes(res.data.quizes);
                setClasses(res.data.onlineclasses)

            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getevents()
    }, [])
    return (
        <section className="w-100" style={{
            backgroundColor: " #eee"
        }}>
            < div className="container py-5 h-100 w-75" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-9 col-xl-7">
                        <div className="card rounded-3 w-100">
                            <div className="card-body p-4 w-100">


                                <table className="table mb-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Task title</th>
                                            <th scope="col">Task Type</th>
                                            <th scope="col">submissiondate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            assignments.map((assign,index) => {
                                                return <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{assign.title}</td>
                                                    <td>Assignment</td>
                                                    <td>{assign.submissiondate} </td>
                                                </tr>

                                            })
                                        }

                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Online class Title</th>
                                            <th scope="col">type</th>
                                            <th scope="col">starttime</th>
                                        </tr>
                                        {
                                            classes.map((sclass,index)=>{
                                                return<tr>
                                                <th scope="row">{index+1}</th>
                                                <td>{sclass.title}</td>
                                                <td>Online Class</td>
                                                <td>{sclass.classtime}</td></tr>
                                            })
                                        }
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">type</th>
                                            <th scope="col">starting time</th>
                                        </tr>
                                        {
                                            quizes.map((quiz,index)=>{
                                                return<tr>
                                                <th scope="row">{index+1}</th>
                                                <td>{quiz.title}</td>
                                                <td>Quiz</td>
                                                <td>{quiz.quiztime}</td>
                                            </tr>
                                            })
                                        }
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
