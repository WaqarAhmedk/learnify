import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';

export default function QuizResult(props) {
    const details = props.details;
    const students = props.students;
    const remainingstudents = props.remainingstudents;





    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {
                        details.title
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Accordion>
                    <Accordion.Header>
                        Quiz Attended By
                    </Accordion.Header>
                    <Accordion.Body>
                        {

                            students.length < 1 ?

                                "" : <div className="c">
                                    <table className="table table-striped " >
                                        <thead>
                                            <tr>
                                                <th>PROFILE PIC</th>
                                                <th>Student ID</th>
                                                <th>Student EMAIL</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                students.map((student) => {
                                                    return <>
                                                        <tr>
                                                            <td>
                                                                <img src={require("../../../assets/images/avatar.jpg")} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{student.student.firstname + " " + student.student.lastname}</td>
                                                            <td>{student.student.email}</td>
                                                            <td>{student.score}</td>


                                                        </tr>
                                                    </>







                                                })

                                            }
                                        </tbody>
                                    </table>
                                </div>

                        }
                    </Accordion.Body>
                </Accordion>
                <Accordion>
                    <Accordion.Header>
                        Quiz NOT Attended By
                    </Accordion.Header>
                    <Accordion.Body>
                        {

                            remainingstudents.length < 1 ?

                                "" : <div className="c">
                                    <table className="table table-striped " >
                                        <thead>
                                            <tr>
                                                <th>PROFILE PIC</th>
                                                <th>Student ID</th>
                                                <th>Student EMAIL</th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                remainingstudents.map((student) => {
                                                    return <>
                                                        <tr>
                                                            <td>
                                                                <img src={require("../../../assets/images/avatar.jpg")} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{`${student.firstname} ${student.lastname}`}</td>
                                                            <td>{student.email}</td>
                                                            <td>{ }</td>


                                                        </tr>
                                                    </>







                                                })

                                            }
                                        </tbody>
                                    </table>
                                </div>

                        }
                    </Accordion.Body>
                </Accordion>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
