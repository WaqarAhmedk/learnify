import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios, { Axios } from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Discussionboard from "../../../components/discussionboard";
import "../../../style/login.css"
import Studentcard from "../../../components/studentcard";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CourseContext } from '../../context/Coursecontext';
import CreateTopic from '../crudoperations/createTopic';
import DateTimePicker from 'react-datetime-picker';

export default function TeacherDashboardHeader(props) {


    // geeting and updating coursename and topics through contextApi
    const context = useContext(CourseContext);
    const [coursename, setCoursename] = context['course']
    const [topics, setTopics] = context['topics']




    let navigate = useNavigate();

    let courseid = props.courseid;



    const [cookies, setCookies] = useCookies();



    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");


    const [discussion, setDiscussion] = useState(false);
    const opendiscussion = () => {
        setDiscussion(true)
    }
    const closediscussion = () => {
        setDiscussion(false)
    }



    let [St_show, setSt_show] = useState(false);


    const [formcoursename, setformCoursename] = useState("");
    const [show, setShow] = useState(false);

    const openform = () => {
        setShow(true)
    }
    const closeform = () => {
        setShow(false)
    }




    //******Enroll Student Modal/Pop Up********
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


    //******This modal will display the student found by email to be enrolled in a course********
    // const [FoundStudent, setFoundStudent] = useState(false);

    // const OpenFoundStudent = () => {
    //     setFoundStudent(true)
    // }
    // const CloseFoundStudent = () => {
    //     setFoundStudent(false)
    // }

    //******This modal is for Removing a Course********
    const [Delt_Crs, setDelt_Crs] = useState(false);

    const OpenDelt_Crs = () => {
        setDelt_Crs(true)
    }
    const CloseDelt_Crs = () => {
        setDelt_Crs(false)
    }


    //******This modal is for Updating a Course Name********
    const [Update_Crs, setUpdate_Crs] = useState(false);

    const OpenUpdate_Crs = () => {
        setUpdate_Crs(true)
    }
    const CloseUpdate_Crs = () => {
        setUpdate_Crs(false)
    }

    // ***State Management for course update***
    const [Updated_crs_name, setUpdated_crs_name] = useState("");

    //******This modal is for assignment creation********
    const [crt_assginment, setcrt_assginment] = useState(false);

    const Opencrt_assginment = () => {
        setcrt_assginment(true)

    }
    const Closecrt_assginment = () => {
        setcrt_assginment(false)
    }

    // ***State Management variables for assignment creation***

    const [Asgm_title, setAsgm_title] = useState("");
    const [Asgm_Desc, setAsgm_Desc] = useState("");
    const [Asgmfile, setAsgmfile] = useState("");
    const [Asgmdate, setAsgmdate] = useState(new Date())
    const [show_footer, setshow_footer] = useState(true);
    const [Asg_edit, setAsg_edit] = useState(false);

    // Asignment title edit modal

    const OpenAsg_edit = () => {
        setAsg_edit(true)

    }
    const CloseAsg_edit = () => {
        setAsg_edit(false)
    }

    //Asignment title getter
    const [get_asg_title, set_asg_title] = useState("");

    //******Quiz Creation Modal********
    const [Quiz, setQuiz] = useState(false);

    const OpenQuiz = () => {
        setQuiz(true)

    }
    const CloseQuiz = () => {
        setQuiz(false)
    }

    // ***State Management for Quiz Creation***
    const [Question, setQuestion] = useState([]);
    const [Answer, setAnswer] = useState([]);
    const [Option, setOption] = useState([]);

    const [Q_error, setQ_error] = useState([]);


    //******Video Session Modal********
    const [Vid_session, setVid_session] = useState(false);

    const OpenVid_session = () => {
        setVid_session(true)

    }
    const CloseVid_session = () => {
        setVid_session(false)
    }

    // ***State Management for ONline class**
    const [class_title, setClass_title] = useState("");
    const [class_Desc, setClass_Desc] = useState("");
    const [class_time, setClass_time] = useState(new Date());

    //******Helping Material Modal********
    const [Hlp_matr, setHlp_matr] = useState(false);

    const OpenHlp_matr = () => {
        setHlp_matr(true)

    }
    const CloseHlp_matr = () => {
        setHlp_matr(false)
    }

    // ***State Management for Quiz Creation***
    const [H_mat_title, setH_mat_title] = useState("");
    const [H_mat_Desc, setH_mat_Desc] = useState("");






    const [optionvalue, setOptionvalue] = useState("");
    const handleTopicsselectchange = (e) => {


        setOptionvalue(e.target.value);
        console.log(e.target.value);

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

    const getAllTopics = () => {
        axios
            .get("/get-topics/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.user.AuthToken

                }
            })
            .then((res) => {
                if (res.data.success === true) {
                    setTopics(res.data.topics);


                }
                else {
                    console.log(res.data);
                }
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        getAllTopics();
        getCourse();

    }, []);









    return (
        <div id="class-details-container">

            <div className="d-flex class-details-hd" >

                <h1 className="col-3 " >{coursename}</h1>

                <div className="form-group has-search class-details-searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>

                {

                    <div className="inst-class-details-options">

                        <div onClick={opendiscussion}>
                            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                            <span>Discussion Board</span>
                        </div>

                        <div>
                            <div onClick={() => {

                                creatactp === "create-activity-parent-content" ?
                                    setcreateactp("create-activity-parent-content-show")
                                    :
                                    setcreateactp("create-activity-parent-content");
                            }}>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <span>Create New Activity</span>
                            </div>

                            <div className={creatactp}>

                                <div onClick={() => {
                                    creatactc === "create-activity-child-content" ?
                                        setcreateactc("create-activity-child-content-show") :
                                        setcreateactc("create-activity-child-content");
                                }}>
                                    <FontAwesomeIcon icon={faCaretDown} />
                                    <span>Select Activity Type</span>

                                </div>

                                <div className={creatactc} >


                                    <span className="course-mang-list" onClick={openform}>New Topic

                                    </span>

                                    <span className="course-mang-list" onClick={Opencrt_assginment}>Assignment</span>

                                    <span className="course-mang-list" onClick={OpenQuiz}>Quiz</span>

                                    <span className="course-mang-list" onClick={OpenVid_session}>Online Class</span>

                                    <span className="course-mang-list" onClick={OpenHlp_matr}>Helping Material</span>

                                </div>





                            </div>

                        </div>

                        <div onClick={() => {
                            dropshow === "course-mang-show-content" ? setdropshow("course-mang-dropdown-content") :
                                setdropshow("course-mang-show-content");

                        }} >
                            <FontAwesomeIcon icon={faBars} />
                            <span>Course Settings</span>
                            <div className={dropshow}>

                                <span className="course-mang-list" onClick={OpenenrollSt} >Enroll a Student</span>

                                <span className="course-mang-list">Remove A Student</span>

                                <span className="course-mang-list" onClick={OpenUpdate_Crs}>Update Course Name</span>
                                <span className="course-mang-list" onClick={OpenDelt_Crs}>Remove this course</span>



                            </div>
                        </div>



                    </div>


                }
            </div>


            <Modal show={show}>
                <ModalHeader closeButton onClick={closeform}>Create Topic</ModalHeader>
                <CreateTopic courseid={courseid} />
            </Modal>


            {/* Discuusion board */}
            <Modal show={discussion}>
                <ModalHeader closeButton onClick={closediscussion}>Discussion Board for {coursename}</ModalHeader>
                <ModalBody>
                    <Discussionboard role="teacher" courseid={courseid} />
                </ModalBody>
            </Modal>

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

                        {St_show ? <Studentcard title={getStudent.firstname}

                            image={getStudent.avatar}
                            email={getStudent.email}
                            std_id={getStudent._id}
                            courseid={courseid}

                        /> : ""}

                    </ModalBody>

                    <p className="error">{Emailerror}</p>




                    {show_footer ? <ModalFooter>
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
                                }
                                )


                            }
                        }}>Find Student</button>
                    </ModalFooter> : ""}

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
                <ModalHeader closeButton onClick={CloseUpdate_Crs}>Edit Course</ModalHeader>
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
                                        CloseUpdate_Crs()
                                    }
                                    else {
                                        console.log(res.data);
                                    }

                                })

                        }


                    }}> Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={CloseUpdate_Crs}>Cancel</button>
                </ModalFooter>
            </Modal>

            {/***Assignment Creation Modal***/}


            <Modal show={crt_assginment}>
                <ModalHeader closeButton onClick={Closecrt_assginment}>Assignment Creation</ModalHeader>
                <ModalBody>



                    <div className="mb-3">

                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" placeholder="enter assignment title" onChange={(e) => {

                            setAsgm_title(e.target.value)

                        }} />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {

                            setAsgm_Desc(e.target.value)
                        }} ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Submission date</label>
                        <DateTimePicker value={Asgmdate} onChange={(value) => {
                            setAsgmdate(value)
                        }} />

                    </div>


                    {/* ***Choose Topics*** */}

                    <select className="form-select" aria-label="Default select example" onChange={(e) => { handleTopicsselectchange(e) }}>
                        <option value="">Choose Topic</option>

                        {

                            topics.map((topic, index) => {
                                return <option key={index + 1} value={topic._id}>{topic.title}</option>

                            })
                        }

                    </select>

                    <br />

                    {/*********/}

                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => {
                            setAsgmfile(e.target.files[0]);
                        }} />
                    </div>




                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" type="submit" onClick={(e) => {
                        e.preventDefault();
                        const formdata = new FormData();
                        formdata.append("title", Asgm_title);
                        formdata.append("courseid", courseid);
                        formdata.append("description", Asgm_Desc);
                        formdata.append("submissiondate", Asgmdate);
                        formdata.append("file", Asgmfile);
                        axios
                            .post("/create-assignment/" + optionvalue, formdata,
                                {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken,
                                        headers:
                                        {
                                            'content-type': 'multipart/form-data',
                                        }
                                    }
                                }
                            ).then((res) => {
                                console.log(res);
                                getAllTopics();


                                setAsgm_title("");
                                setAsgm_Desc("");
                                setAsgmdate("");
                                setAsgmfile("");
                                setcrt_assginment(false)

                            })
                            .catch(err => console.error(err));
                    }}> Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={Closecrt_assginment}>Cancel</button>
                </ModalFooter>



            </Modal>

            {/* ****Quiz Creation Modal*** */}

            <Modal show={Quiz}>

                <ModalHeader closeButton onClick={CloseQuiz}>Quiz Creation</ModalHeader>

                <ModalBody>

                    <label for="exampleFormControlTextarea1" className="form-label">Q.</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" onChange={(e) => {

                        setQuestion(e.target.value)

                    }} ></textarea>

                    <p className="error">{Q_error}</p>

                    <button type="submit" className="Btn btn-primary my-1 " onClick={() => {

                        if (Question === []) {

                            setQ_error("question cannot be empty")
                        }



                    }}> Add </button>






                </ModalBody>


            </Modal>

            {/* ******Online Class Creation******** */}

            <Modal show={Vid_session}>
                <ModalHeader closeButton onClick={CloseVid_session}>CREATE ONLINE CLASS</ModalHeader>
                <ModalBody>

                    <div className="mb-3">

                        <label for="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="text" className="form-control" value={class_title} placeholder="enter meeting title" onChange={(e) => {
                            setClass_title(e.target.value);
                        }} />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={class_Desc} rows="3" onChange={(e) => {

                            class_Desc(e.target.value);
                        }} ></textarea>
                    </div>

                    {/* ***Choose Topics*** */}

                    <select className="form-select" aria-label="Default select example" onChange={(e) => { handleTopicsselectchange(e) }}>
                        <option value="">Choose Topic</option>

                        {

                            topics.map((topic, index) => {
                                return <option key={index + 1} value={topic._id}>{topic.title}</option>

                            })
                        }

                    </select>

                    <div className="mb-3">
                        <label className="form-label">Online Class Time</label>
                        <DateTimePicker value={class_time} className="form-control" onChange={(value) => {
                            setClass_time(value)
                        }} />

                    </div>
                    {/*********/}
                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {

                        e.preventDefault();
                        axios
                            .post("/create-online-class/" + optionvalue,
                                {
                                    title: class_title,
                                    desscription: class_Desc,
                                    classtime: class_time

                                },
                                {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken,

                                    }
                                }
                            ).then((res) => {


                            })
                            .catch(err => console.error(err));
                    }}> Create Class</button>
                    <button type="button" className="btn btn-secondary" onClick={CloseVid_session}>Cancel</button>
                </ModalFooter>



            </Modal>


            {/* ***Helping Material Modal*** */}

            <Modal show={Hlp_matr}>
                <ModalHeader closeButton onClick={CloseHlp_matr}>Helping Material Creation</ModalHeader>
                <ModalBody>

                    <div className="mb-3">

                        <label for="exampleFormControlInput1" className="form-label">Title</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="enter helping material title" onChange={(e) => {

                            setH_mat_title(e.target.value)

                        }} />
                    </div>


                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {

                            setH_mat_Desc(e.target.value)

                        }} ></textarea>
                    </div>

                    {/* ***Choose Topics*** */}

                    <select className="form-select" aria-label="Default select example">
                        <option selected>Choose Topic</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>

                    <br />

                    {/*********/}

                    <div className="input-group mb-3">
                        <input type="file" className="form-control" id="inputGroupFile02" />
                        <label className="input-group-text" for="inputGroupFile02">Upload</label>
                    </div>


                </ModalBody>
                <ModalFooter>
                    <button type="submit" className="btn btn-primary" > Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={CloseHlp_matr}>Cancel</button>
                </ModalFooter>



            </Modal>
        </div>



    )
}
