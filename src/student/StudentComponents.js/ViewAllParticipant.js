import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';


export default function ViewAllParticipants(props) {

    const alert = useAlert();
    const courseid = props.courseid;
    const [cookies] = useCookies();
    const [participants, setParticipants] = useState([]);


   

    const getAllParticipants = () => {
        console.log(courseid);
        axios
            .get("/get-all-participents/" + courseid, {
                headers: {
                    'student-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                console.log(res.data.participents);
                setParticipants(res.data.participents)

            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllParticipants()
    }, [])





    return (<>

        <Modal {...props}>
            <ModalHeader closeButton>All Students in Course</ModalHeader>
            <ModalBody >
                {participants.length > 0 ?
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>PROFILE PIC</th>
                                <th>Student ID</th>
                                <th>Student EMAIL</th>


                            </tr>
                        </thead>
                        <tbody>
                            {

                                participants.map((participant, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <img src={require(`../../assets/avatar/${participant.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                        </td>
                                        <td>{participant.firstname + " " + participant.lastname}</td>
                                        <td>{participant.email}</td>

                                    </tr>
                                })
                            }


                        </tbody>
                    </table> : "No  Other participant"
                }
            </ModalBody>
        </Modal>


     
    </>)
}
