import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Accordion } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import download from "js-file-download";
import { CourseContext } from '../../context/Coursecontext';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';



export default function ViewAssignmentsrecord(props) {

    const context = useContext(CourseContext);
    const [coursename] = context['course'];

    const assignmentid = props.assignmentid;
    const topicid = props.topicid;
    const [cookies, setCookies] = useCookies();
    const [students, setStudents] = useState([]);
    const [show, setshow] = useState(false);
    const [marks, setMarks] = useState(0);
    const [studentemail, setStudentEmail] = useState("");
    const [assignmenttomark, setAssignmenttoMark] = useState("");




    const getAllAssignments = () => {
        axios
            .get(`/get-all-assignments/${topicid}/${assignmentid}`, { responseType: "blob" })
            .then((res) => {

                download(res.data, `${coursename} Assignments.zip`)
            })
            .catch(err => console.error(err));
    }
    const getAssignment = () => {
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
    }
    useEffect(() => {
        getAssignment()
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
                                                <th>Marks</th>
                                                <th>Evaluate</th>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                students.map((student) => {
                                                    console.log(student);
                                                    return <>
                                                        <tr>
                                                            <td>
                                                                <img src={require(`../../../assets/avatar/${student.studentid.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{student.studentid.firstname + " " + student.studentid.lastname}</td>
                                                            <td>{student.studentid.email}</td>
                                                            <td>{student.grade}</td>

                                                            <td>
                                                                <FontAwesomeIcon icon={faEdit} onClick={() => {
                                                                    setshow(true);
                                                                    setStudentEmail(student.studentid.email);
                                                                    setAssignmenttoMark(student._id)
                                                                }} />

                                                            </td>


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

            <Modal show={show}>
                <ModalHeader>Mark Assignment of Student: {studentemail}</ModalHeader>
                <ModalBody>
                    <div className="row email-div">
                        <label className="">Marks</label>
                        <input className="" type="number" onChange={(e) => {
                            setMarks(e.target.value)
                        }} />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => {
                        axios.post("/mark-uploaded-assignment/" + assignmenttomark, { marks: marks }, {
                            headers: {
                                'teacher-auth-token': cookies.user.AuthToken

                            }
                        }).then((res) => {
                            console.log(res);
                            if (res.data.success === true) {
                                getAssignment();
                                setshow(false);
                            }
                        })
                    }}>Mark Assignment</button>
                    <button className='btn btn-secondary' value={marks} onClick={(e) => {
                        setshow(false);
                    }}>Cancel</button>

                </ModalFooter>
            </Modal>
        </>
    )
}
