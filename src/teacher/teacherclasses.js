import { useContext } from "react";
import "../style/enrolledclasses.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";


import { CourseContext } from "./context/Coursecontext";

function TeacherClasses(props) {



    const navigate = useNavigate();
    const [tclasses, setTclasses] = useState([]);
    const [cookies, setCookies] = useCookies();
    const [formcoursename, setformCoursename] = useState("");
    const [show, setShow] = useState(false);

    const openform = () => {
        setShow(true)
    }
    const closeform = () => {
        setShow(false)
    }

    const getAllcourses = () => {
        axios
            .get("/get-all-courses", {
                headers: {
                    'teacher-auth-token': cookies.teacherAuth,

                }
            })
            .then((res) => {
                console.log(res.data);

                if (res.data.success === true) {
                    setTclasses(res.data.courses)

                }
                else {
                    setTclasses([]);
                }



            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        getAllcourses();

    }, [])

    let role = props.role;



    return <>

        <div id="class-container"  >

            <div className="d-flex hd" >
                <h1 className="col-6 "> Enrolled classes</h1>

                <div className="form-group has-search searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>


                <div className="course-mang" onClick={openform}>
                    <FontAwesomeIcon icon={faBars} />
                    <span > Course Management</span>
                </div>


            </div>


            <div id="class-container-content" className="row">


                {
                    tclasses.length === 0 ? "No courses created create acourse first" :
                        tclasses.map((sclass, index) => {
                            return <div className="card" key={index+1} onClick={() => {



                                //to do here we will rediect to the page where the deatils of the enrolled classes will show
                                navigate('/teacher/dashboard/classdetails', { state: { courseid: sclass._id} })

                            }}  >

                                <img className="card-img" src={require("../assets/images/images.png")} alt="Card cap" />
                                <div className="card-body">
                                    <p className="card-">{sclass.coursename}</p>
                                </div>
                            </div>

                        })

                }


            </div>
        </div>


        <Modal show={show}>
            <ModalHeader closeButton onClick={closeform}>Create a Course</ModalHeader>
            <ModalBody>
                <form>
                    <div class="form-group">
                        <label for="examzpleInputEmail1">COURSE NAME</label>
                        <input type="text" class="form-control" placeholder="Enter Course name" value={formcoursename} onChange={(e) => {
                            setformCoursename(e.target.value);
                        }} />
                    </div>



                </form>
            </ModalBody>
            <ModalFooter>
                <button type="submit" class="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    if (formcoursename !== "") {
                        axios
                            .post("/create-course", {
                                coursename: formcoursename,
                            }, {
                                headers: {
                                    'teacher-auth-token': cookies.teacherAuth,

                                }
                            })
                            .then((res) => {
                                if (res.data.success === true) {
                                    console.log(res.data);

                                    getAllcourses();

                                }
                                else {
                                    console.log(res.data);

                                }
                                closeform();
                            })
                            .catch(err => console.error(err));

                    }
                }}>Create</button>
            </ModalFooter>
        </Modal>
    </>
}
export default TeacherClasses;