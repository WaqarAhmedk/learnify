import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { CourseContext } from '../../context/Coursecontext';
import Studentcard from "../../../components/studentcard"
import AllParticipents from './AllParticipents';
import { useAlert } from 'react-alert';

export default function CourseSettings() {


    const context = useContext(CourseContext);
    const [coursename, setCoursename] = context['course'];
    const [courseid] = context['courseid'];
    const alert = useAlert();

    const navigate = useNavigate();


    const [cookies, setCookies] = useCookies();

    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    const [show, setShow] = useState(false);




    let [St_show, setSt_show] = useState(false);
  




    const [StEmail, setStEmail] = useState("");
    const [Emailerror, setEmailerror] = useState("");

    const [enrollSt, setenrollSt] = useState(false);

    const OpenenrollSt = () => {
        setenrollSt(true)
    }
    const CloseenrollSt = () => {
        setenrollSt(false)
    }

    //student found object
    const [getStudent, setStudent] = useState({});
    const [show_footer, setshow_footer] = useState(true);


    //******This modal is for Removing a Course********
    const [Delt_Crs, setDelt_Crs] = useState(false);

    const OpenDelt_Crs = () => {
        setDelt_Crs(true)
    }
    const CloseDelt_Crs = () => {
        setDelt_Crs(false)
    }


    //******This modal is for Updating a Course Name********
    const [Updated_crs_name, setUpdated_crs_name] = useState(coursename);

    const [Update_Crs, setUpdate_Crs] = useState(false);

    const OpenUpdate_Crs = () => {
        setUpdate_Crs(true)
    }
    const CloseUpdate_Crs = () => {
        setUpdate_Crs(false)
    }




    const [viewparticipent, setViewParticipent] = useState(false);

    const openViewParticipent = () => {

        setViewParticipent(true);
    }
    const closeViewParticipent = () => {
        setViewParticipent(false)

    }



    const getCourse = () => {
        axios
            .get("/get-course/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                if (res.data.success === true) {
                    setCoursename(res.data.details.coursename);

                }
                else {
                    console.log(res.data);
                }
            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        if (courseid !== null && courseid !== undefined) {
            getCourse();

        }

    }, [courseid]);

    return (
        <>
            <div onClick={() => {
                dropshow === "course-mang-show-content" ? setdropshow("course-mang-dropdown-content") :
                    setdropshow("course-mang-show-content");

            }} >
                <FontAwesomeIcon icon={faBars} />
                <span>Course Settings</span>
                <div className={dropshow}>

                    <span className="course-mang-list" onClick={OpenenrollSt} >Enroll a Student</span>
                    <span className="course-mang-list" onClick={openViewParticipent}> All Participants</span>
                    <span className="course-mang-list" onClick={OpenUpdate_Crs}>Update Course Name</span>
                    <span className="course-mang-list" onClick={OpenDelt_Crs}>Remove this course</span>



                </div>

            </div>




            {/* Enroll Student Modal */}
            <Modal show={enrollSt}>
                <ModalHeader closeButton onClick={CloseenrollSt}>Enroll a Student</ModalHeader>
                <ModalBody>

                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Searchbyemail">Search By Email</label>
                                <input type="text" className="form-control" placeholder="Enter Student Email" value={StEmail} onChange={(e) => {
                                    setStEmail(e.target.value);
                                }} />
                            </div>

                        </form>

                        {St_show ? <Studentcard
                            title={getStudent.firstname}


                            image={getStudent.avatar}
                            email={getStudent.email}
                            std_id={getStudent._id}
                            courseid={courseid}
                            onHide={()=>{
                                CloseenrollSt();
                                setSt_show(false);
                               
                                getStudent({})
                            }}


                        /> : ""}

                    </ModalBody>

                    <p className="error">{Emailerror}</p>




                    <ModalFooter>
                        <button className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            if (StEmail === "") {

                                setEmailerror('Email invalid or empty')

                            }

                            else {


                                axios.post("/find-student-byemail/" + StEmail, {}, {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken

                                    }
                                }).then((res) => {

                                    if (res.data.success === true) {

                                        setshow_footer(false)
                                        setStudent(res.data.student);

                                        setSt_show(true);

                                        console.log(getStudent.email);


                                    }
                                    else{
                                        alert.error("no Student found Against this Email")
                                    }
                                }
                                )


                            }
                        }}>Find Student</button>
                    </ModalFooter>

                    {/* *****Course Removal Modal***** */}
                </ModalBody>
            </Modal>

            <Modal show={Delt_Crs}>
                <ModalHeader closeButton onClick={CloseDelt_Crs}>Course Removal Confirmation</ModalHeader>
                <ModalBody>
                    <p>Are you sure that you want to remove the course? Please be noticed that it cannot be undone!</p>
                </ModalBody>

                <ModalFooter>


                    <button type="button" className="btn btn-danger" onClick={(e) => {
                        e.preventDefault();

                        axios
                            .delete("/delete-course/" + courseid, {
                                headers: {
                                    'teacher-auth-token': cookies.user.AuthToken

                                }
                            })
                            .then((res) => {
                                if (res.data.success === true) {
                                    navigate("/teacher/dashboard")

                                }

                            })
                            .catch(err => console.error(err));
                    }
                    }>Remove</button>

                    <button type="button" className="btn btn-secondary" onClick={CloseDelt_Crs}>Cancel</button>
                </ModalFooter>
            </Modal>

            {/******This modal is for Updating a Course Name******/}
            <Modal show={Update_Crs}>
                <ModalHeader closeButton onClick={CloseUpdate_Crs}>Update Course Name</ModalHeader>
                <ModalBody>

                    <form>

                        <div class="form-group">
                            <label for="examzpleInputEmail1">Course Name</label>
                            <input type="text" class="form-control" placeholder="Enter new course name" value={Updated_crs_name} onChange={(e) => {
                                setUpdated_crs_name(e.target.value);

                            }} />
                        </div>



                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" class="btn btn-primary" onClick={(e) => {
                        e.preventDefault();



                        if (Updated_crs_name != "") {

                            axios.post("/update-course/" + courseid, {
                                coursename: Updated_crs_name
                            },

                                {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken
                                    }
                                })
                                .then((res) => {

                                    if (res.data.success === true) {
                                        setCoursename(res.data.details.coursename);
                                        alert.success(res.data.message);
                                        CloseUpdate_Crs()
                                    }
                                    else {
                                        console.log(res.data);
                                    }

                                })

                        }
                        else{
                            alert.error("PLease write the updated name")
                        }


                    }}> Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={CloseUpdate_Crs}>Cancel</button>
                </ModalFooter>
            </Modal>


            {/* All Particepents */}

            <Modal show={viewparticipent} size="lg" >
                <ModalHeader closeButton onClick={closeViewParticipent}>All Participants</ModalHeader>
                <AllParticipents />
            </Modal>

        </>)
}
