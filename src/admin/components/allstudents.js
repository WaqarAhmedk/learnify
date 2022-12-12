import React, { useContext } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';


export default function AllStudents(props) {

    const alert = useAlert();
    const [cookies] = useCookies();
    const [students, setTeachers] = useState([]);


    const getAllStudents = () => {
        axios
            .get("/get-all-students", {
                headers: {
                    'admin-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                console.log(res.data);
                setTeachers(res.data.students)

            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllStudents();
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

                    students.length > 0 ? <>
                        {
                            students.map((student, index) => {
                                return <tr key={index}>
                                    <td>
                                        <img src={require(`../../assets/avatar/${student.avatar}`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                    </td>
                                    <td>{student._id}</td>
                                    <td>{student.firstname + " " + student.lastname}</td>

                                    <td>{student.email}</td>
                                    <td>{student.createdat}</td>

                                    <td>{student.modifiedat}</td>
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
