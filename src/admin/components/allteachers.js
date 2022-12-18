import React, { useContext } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalHeader ,ModalFooter} from 'react-bootstrap';


export default function AllTeachers(props) {

    const alert = useAlert();
    const [cookies] = useCookies();
    const [teachers, setTeachers] = useState([]);
    const [showdelete, setShowDelete] = useState(false);
    const [idtodelete, setIdtoDelte] = useState();
    const [teacheremail, setTeacherEmail] = useState("");

    const getAllTeachers = () => {
        axios
            .get("/get-all-teachers", {
                headers: {
                    'admin-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                console.log(res.data);
                setTeachers(res.data.teachers)

            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllTeachers();
    }, [])





    return (<>


        <table className="table table-striped">
            <tbody>

                <tr>
                    <th>Profile Pic</th>
                    <th>User Id</th>
                    <th>Full Name</th>
                    <th>User Email</th>
                    <th>Created At</th>
                    <th>Modified At</th>
                    <th>Action</th>




                </tr>
                {

                    teachers.length > 0 ? <>
                        {
                            teachers.map((teacher, index) => {
                                return <tr key={index}>
                                    <td>
                                        <img src={require(`../../assets/avatar/${teacher.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                    </td>
                                    <td>{teacher._id}</td>
                                    <td>{teacher.firstname + " " + teacher.lastname}</td>

                                    <td>{teacher.email}</td>
                                    <td>{teacher.createdat}</td>

                                    <td>{teacher.updatedAt}</td>
                                    <td onClick={() => {
                                        setTeacherEmail(teacher.email);
                                        setIdtoDelte(teacher._id);
                                        setShowDelete(true)
                                    }}><FontAwesomeIcon icon={faTrash} /></td>


                                </tr>
                            })
                        }
                    </> : <tr></tr>

                }


            </tbody>
        </table>

        <Modal show={showdelete}>
            <ModalHeader>Remove Teacher {teacheremail} </ModalHeader>
            <ModalBody>
                <span className='d-block'>Are You sure You want to delte this course ? </span>
                <span className='btn-warning '>This action cannot be undone</span>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary ' onClick={(e) => {

                    e.preventDefault();
                    axios
                        .delete("/delete-teacher-byadmin/" + idtodelete, {
                            headers: {
                                'admin-auth-token': cookies.user.AuthToken

                            }
                        })
                        .then((res) => {
                            console.log(res.data);

                            if (res.data.success===true) {
                                getAllTeachers();
                                alert.success(res.data.message);
                                setShowDelete(false)
                            }
                            else {
                                alert.info(res.data.message)

                            }

                        })
                        .catch(err => console.error(err));


                }}>Remove Teacher</button>
                <button className='btn btn-secondry ' onClick={() => {
                    setTeacherEmail("");
                    setIdtoDelte("");
                    setShowDelete(false);

                }}>cancel</button>

            </ModalFooter>
        </Modal>

    </>)
}
