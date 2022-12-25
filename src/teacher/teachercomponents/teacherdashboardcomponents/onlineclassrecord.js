
import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from 'axios';







export default function OnlineClassRecord(props) {

    const sessionid = props.id;

    const courseid = props.courseid

    const [data, setData] = useState([]);
    const [present, setPresent] = useState([]);
    const [absent, setAbsent] = useState([]);

    useEffect(() => {
        if (sessionid != "") {
            axios.get(`/get-all-students-attendence/${courseid}/${sessionid}`).then(res => {
                if (res.data.success) {
                    console.log(res.data.present);
                    setPresent(res.data.present)
                    setAbsent(res.data.absent)

                }
                else{

                }
            })

        }
    }, [sessionid])


    return <div>


        <Modal {...props} size="lg">
            <Modal.Header closeButton>Student Attenndence in Online Class</Modal.Header>
            <ModalBody>


                <Accordion>
                    <Accordion.Header>
                       Present Students
                    </Accordion.Header>
                    <Accordion.Body>
                        {

                            present.length < 1 ?

                                "" : <div className="c">
                                    <table className="table table-striped " >
                                        <thead>
                                            <tr>
                                                <th>PROFILE PIC</th>
                                                <th>Student ID</th>
                                                <th>Student Name</th>

                                                <th>Student EMAIL</th>
                                                <th>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                present.map((student) => {
                                                    return <>
                                                        <tr>
                                                            <td>
                                                                <img src={require(`../../../assets/avatar/${student.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{student._id}</td>
                                                            <td>{`${student.firstname} ${student.lastname}`}</td>
                                                            <td>{student.email}</td>
                                                            <td>Present</td>


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
                        Absent Students
                    </Accordion.Header>
                    <Accordion.Body>
                        {

                            absent.length < 1 ?

                                "" : <div className="c">
                                    <table className="table table-striped " >
                                        <thead>
                                            <tr>
                                                <th>PROFILE PIC</th>
                                                <th>Student ID</th>
                                                <th>Student Name</th>

                                                <th>Student EMAIL</th>
                                                <th>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                absent.map((student) => {
                                                    return <>
                                                        <tr>
                                                            <td>
                                                                <img src={require(`../../../assets/avatar/${student.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                                            </td>
                                                            <td>{student._id}</td>
                                                            <td>{`${student.firstname} ${student.lastname}`}</td>
                                                            <td>{student.email}</td>
                                                            <td>Absent</td>


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
                <button className="btn btn-primary" type="submit" onClick={(e) => {
                    props.onHide()

                }}> Close</button>
            </ModalFooter>



        </Modal>
    </div>
}



