import React, { useContext } from 'react';
import { CourseContext } from '../../context/Coursecontext';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';


export default function AllParticipents() {

    const alert = useAlert();
    const context = useContext(CourseContext);
    const [courseid] = context['courseid'];

    const [cookies] = useCookies();
    const [participants, setParticipants] = useState([]);
    const [showdelete, setShowDelete] = useState(false);
    const [studentid, setStudentid] = useState("");



    const GetAllParticipants = () => {

        axios
            .get("/get-allparticipants/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                if (res.data.success === true) {
                    setParticipants(res.data.participants);

                } else {
                    alert.info(res.data.message);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (courseid !== null && courseid !== undefined) {
            GetAllParticipants()

        }

    }, [courseid])

    return (<>

        <table className="table table-striped">
            <thead>
                <tr>
                    <th>PROFILE PIC</th>
                    <th>Student ID</th>
                    <th>Student EMAIL</th>
                    <th>Actions</th>

                </tr>
            </thead>
            <tbody>
                {
                    participants.map((participant, index) => {
                        return <tr key={index}>
                            <td>
                                <img src={require("../../../assets/avatar/" + participant.avatar)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                            </td>
                            <td>{participant.firstname + " " + participant.lastname}</td>
                            <td>{participant.email}</td>

                            <td>
                                <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTrash} onClick={() => {
                                    setShowDelete(true);
                                    setStudentid(participant._id);
                                }} />
                            </td>

                        </tr>
                    })
                }


            </tbody>
        </table>


        <Modal show={showdelete}>
            <ModalHeader>Remove Student from Course</ModalHeader>
            <ModalBody>
                Are you sure you want to remove this student ?
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-success' onClick={() => {


                    if (courseid != "" && studentid != "") {
                        axios.post(`/delete-enrolled-student/${studentid}/${courseid}`, {}, {
                            headers: {
                                'teacher-auth-token': cookies.user.AuthToken

                            }
                        }).then((res) => {
                            if (res.data.success===true) {
                                alert.success(res.data.message);
                                setShowDelete(false);
                                GetAllParticipants()
                            }
                            else{
                                alert.error(res.data.message)
                            }
                        }).catch((err) => {
                            console.log(err);
                        })

                    }
                }}>Remove</button>
                <button className='btn btn-primart' onClick={() => {
                    setShowDelete(false);
                    setStudentid("");
                }}>Cancel</button>

            </ModalFooter>
        </Modal>
    </>)
}
