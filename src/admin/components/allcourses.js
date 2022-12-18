import React, { useContext } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';


export default function AllStudents(props) {

    const alert = useAlert();
    const [cookies] = useCookies();
    const [courses, setCourses] = useState([]);
    const [showdelete, setShowDelete] = useState(false);
    const [idtodelete, setIdtoDelte] = useState();

    const [course, setcourse] = useState("");


    const getAllCourses = () => {
        axios
            .get("/get-all-courses-admin", {
                headers: {
                    'admin-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                console.log(res.data);

                if (res.data.success) {
                    setCourses(res.data.courses)

                }

            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getAllCourses();
    }, [])





    return (<>


        <table className="table table-striped">
            <tbody>

                <tr>
                    <th> Pic</th>
                    <th>Course Id</th>
                    <th>Course Name</th>
                    <th>Course Created</th>
                    <th>Teacher </th>
                    <th>Modified At</th>
                    <th>Action</th>




                </tr>
                {

                    courses.length > 0 ? <>
                        {
                            courses.map((course, index) => {
                                return <tr key={index}>
                                    <td>
                                        <img src={require(`../../assets/images/images.png`)} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                                    </td>
                                    <td>{course._id}</td>
                                    <td>{course.coursename}</td>

                                    <td>{course.createdat}</td>
                                    <td>{course.teacher}</td>

                                    <td>{course.modifiedat}</td>
                                    <td onClick={() => {
                                        setcourse(course.coursename);
                                        setIdtoDelte(course._id);
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
            <ModalHeader>Remove this course </ModalHeader>
            <ModalBody>
                <span className='d-block'>Are You sure You want to delte this course ? </span>
                <span className='btn-warning '>This action cannot be undone</span>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary ' onClick={(e) => {

                    e.preventDefault();
                    axios
                        .delete("/delete-course-byadmin/" + idtodelete, {
                            headers: {
                                'admin-auth-token': cookies.user.AuthToken

                            }
                        })
                        .then((res) => {
                            console.log(res.data);

                            if (res.data.success===true) {
                                getAllCourses()
                                alert.success(res.data.message);
                                setShowDelete(false)
                            }
                            else{
                                alert.info(res.data.message)

                            }

                        })
                        .catch(err => console.error(err));


                }}>Remove Course</button>
                <button className='btn btn-secondry ' onClick={() => {
                    setcourse("");
                    setIdtoDelte("");
                    setShowDelete(false);

                }}>cancel</button>

            </ModalFooter>
        </Modal>

    </>)
}
