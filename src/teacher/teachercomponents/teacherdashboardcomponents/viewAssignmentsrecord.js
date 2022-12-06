import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Accordion } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import download from "js-file-download";
import { CourseContext } from '../../context/Coursecontext';
import { useContext } from 'react';



export default function ViewAssignmentsrecord(props) {

    const context = useContext(CourseContext);
    const [coursename] = context['course'];

    const assignmentid = props.assignmentid;
    const topicid = props.topicid;
    const [cookies, setCookies] = useCookies();
    const [students, setStudents] = useState([]);



    const getAllAssignments = () => {
        axios
            .get(`/get-all-assignments/${topicid}/${assignmentid}`, { responseType: "blob" })
            .then((res) => {

                download(res.data, `${coursename} Assignments.zip`)
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (assignmentid != "" && topicid != "") {
            axios
                .get(`/get-assignment-records/${topicid}/${assignmentid}`, {
                    headers: {
                        'teacher-auth-token': cookies.user.AuthToken

                    }
                })
                .then((res) => {
                    if (res.data.success === true) {
                        setStudents(res.data.students)
                    }
                })
                .catch(err => console.error(err));

        }
    }, [assignmentid])
    return (
        <>
            <Modal {...props} size="lg" >
                <ModalHeader>Assignment Records</ModalHeader>
                <ModalBody>
                    <div className='mb-2 d-flex justify-content-between'>
                        <div>
                            Total Submitted Assignments:<span className='ms-3'><b>{students.length}</b></span>

                        </div>
                        <span className='btn btn-primary' onClick={getAllAssignments}>Download All Assignments</span>
                    </div>
                    <Accordion>
                        <Accordion.Header>
                            Student Who Submitted Assignment                    </Accordion.Header>
                        <Accordion.Body>
                            {

                                <div className="c">
                                    <table className="table" >
                                        <thead>
                                            <tr>
                                                <th>PROFILE PIC</th>
                                                <th>Student ID</th>
                                                <th>Student EMAIL</th>
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
                                                            <td>{student.studentid.firstname + " " + student.studentid.lastname}</td>
                                                            <td>{student.studentid.email}</td>
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
                </ModalBody>
                <ModalFooter>

                    <button className='btn btn-primary' onClick={props.onHide}>Close</button>

                </ModalFooter>
            </Modal>
        </>
    )
}
