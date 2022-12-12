import React, { useContext } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';


export default function AllTeachers(props) {

    const alert = useAlert();
    const [cookies] = useCookies();
    const [teachers, setTeachers] = useState([]);


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

                                    <td>{teacher.email}</td>
                                    <td><FontAwesomeIcon icon={faTrash}/></td>



                                </tr>
                            })
                        }
                    </> : <tr></tr>

                }


            </tbody>
        </table>

    </>)
}
