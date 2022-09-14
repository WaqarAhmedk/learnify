
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay, faBullhorn, faCaretDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import "../style/coursedetails.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import axios, { Axios } from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Discussionboard from "../components/discussionboard";
import "../style/login.css"
import Datetimepicker from "../components/datetimepicker";

function TeacherClassDetails() {

    let navigate = useNavigate();
    const data = useLocation();
    const courseid = data.state.courseid;
    const coursename = data.state.coursename;
    const [topics, setTopics] = useState([]);
    const [cookies, setCookies] = useCookies();
    const [socket, setSocket] = useState(null);


    // useEffect(() => {
    //     if (socket === null) {

    //         setSocket(io("http://localhost:4000"));


    //     } else {
    //         socket.emit("join_room", courseid)

    //     }
    // }, [socket])







    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");

    const [formcoursename, setformCoursename] = useState("");
    const [show, setShow] = useState(false);

    const openform = () => {
        setShow(true)
    }
    const closeform = () => {
        setShow(false)
    }


    const [discussion, setDiscussion] = useState(false);
    const opendiscussion = () => {
        setDiscussion(true)
    }
    const closediscussion = () => {
        setDiscussion(false)
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

    // ***State Management for Quiz Creation***
    const [Vid_title, setVid_title] = useState("");
    const [Vid_Desc, setVid_Desc] = useState("");

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



    const getAllTopics = () => {
        axios
            .get("/get-topics/" + courseid, {
                headers: {
                    'teacher-auth-token': cookies.teacherAuth

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
    }, []);


    const [optionvalue, setOptionvalue] = useState("");
    const handleTopicsselectchange = (e) => {


        setOptionvalue(e.target.value);
        console.log(e.target.value);

    }



    return <>

        <div id="class-details-container"  >

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

                                    <span className="course-mang-list" onClick={OpenVid_session}>Video Sesssion</span>

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

        </div>

        {/* class topic details are shown here */}


        {
            topics.length === 0 ? "no Topic is created " :
                topics.map((topic, index) => {

                    return <div key={index + 1} className="row classdetails-content">

                        <div>
                            <div className="class-det-topic-heading">
                                <span>{index + 1}.</span>
                                <span>{topic.title}</span>

                                <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" />


                            </div>
                            <div className="class-det-topic-content">
                                <div>
                                    <span classame="">Helping Material</span>
                                    {
                                        topic.helpingmaterial.map((item, index) => {
                                            return <div key={index + 1} className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBookOpen} />
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="inner-content-right">

                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>



                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                                <div>
                                    <span className="">Assignment</span>

                                    {
                                        topic.assignments.map((assignment, index) => {
                                            return <div key={index + 1} className="main-content-1">

                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faClipboardList} />
                                                    <a download onClick={() => {
                                                        axios
                                                            .post("/download-assignment", {
                                                                filename: assignment.filename,


                                                            })
                                                            .then((res) => {

                                                                console.log(res.data);

                                                                const url = window.URL.createObjectURL(new Blob([res.data]));
                                                                const link = document.createElement('a');
                                                                link.href = url;
                                                                console.log(url);
                                                                link.setAttribute('download', "app.pdf");
                                                                document.body.appendChild(link);
                                                                link.click();


                                                            })
                                                            .catch(err => console.error(err));
                                                    }}>{index + 1}.  {assignment.title}</a>

                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Due Date :{assignment.submissiondate}</span>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                </div>
                                            </div>
                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                                <div>
                                    <span className="">Online class</span>
                                    {
                                        topic.onlineclass.map((item, index) => {
                                            return <div key={index + 1} className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>{item.title}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                                                </div>

                                            </div>




                                        })
                                    }
                                    <hr className="hr" />

                                </div>
                            </div>

                        </div>

                    </div>

                })}

        <Modal show={show}>
            <ModalHeader closeButton onClick={closeform}>Create Topic</ModalHeader>
            <ModalBody>
                <form>
                    <div class="form-group">
                        <label for="examzpleInputEmail1">Topic Name</label>
                        <input type="text" class="form-control" placeholder="Enter Topic Name" value={formcoursename} onChange={(e) => {
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
                            .post("/create-topic/" + courseid, {
                                title: formcoursename,
                            }, {
                                headers: {
                                    'teacher-auth-token': cookies.teacherAuth,

                                }
                            })
                            .then((res) => {
                                if (res.data.success == true) {
                                    getAllTopics();
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
                </ModalBody>

                <p className="error">{Emailerror}</p>

                <ModalFooter>
                    <button  className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        if (StEmail === "") {

                            setEmailerror('Email invalid or empty')

                        }

                        else {


                            axios.post("/enroll-student/"+courseid, {
                                studentid:"6300e47824aba29306024052"
                            },{
                                headers: {
                                    'teacher-auth-token': cookies.teacherAuth

                                }
                            }).then((res)=>{
                                console.log(res.data);
                            })


                            // axios.post("/find-student-byemail/" + StEmail, {},{
                            //     headers: {
                            //         'teacher-auth-token': cookies.teacherAuth

                            //     }
                            // }).then((res)=>{
                            //     console.log(res.data);
                            // })


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

                <button type="button" className="btn btn-danger" onClick={() => {

                    // axios.post("/deleteCourse", {
                    navigate("/courseDeleteMsg")

                    // })

                }}>Remove</button>

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
                        <input type="text" class="form-control" placeholder="Enter new course name" value={formcoursename} onChange={(e) => {
                            setformCoursename(e.target.value);
                        }} />
                    </div>



                </form>
            </ModalBody>
            <ModalFooter>
                <button type="submit" className="btn btn-primary" > Save Changes</button>
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
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <input type="date" />
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


                <input type="datetime-local" className="form-control" />


            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    const formdata = new FormData();
                    formdata.append("title", Asgm_title);
                    formdata.append("courseid", courseid);
                    formdata.append("description", Asgm_Desc);
                    formdata.append("submissiondate", Date.now());
                    formdata.append("file", Asgmfile);
                    axios
                        .post("/create-assignment/" + optionvalue, formdata,
                            {
                                headers: {
                                    headers: { 'content-type': 'multipart/form-data' }

                                }
                            }
                        )
                        .then((res) => {
                            console.log(res);
                            getAllTopics();
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

        {/* ******Video Session Modal******** */}

        <Modal show={Vid_session}>
            <ModalHeader closeButton onClick={CloseVid_session}>Meeting Creation</ModalHeader>
            <ModalBody>

                <div className="mb-3">

                    <label for="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="enter meeting title" onChange={(e) => {

                        setVid_title(e.target.value)

                    }} />
                </div>


                <div className="mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {

                        setVid_Desc(e.target.value)

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


                <Datetimepicker title="Meeting Start Time" />
                <Datetimepicker title="Meeting End Time" />






            </ModalBody>
            <ModalFooter>
                <button type="submit" className="btn btn-primary" > Create Session</button>
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




    </>

}

export default TeacherClassDetails;

{/* <div className="className-det-topic-content"> */ }

{/* {
                                    //checking if there is any helping material uploaded  if yes then show else nothing

                                    topic.helpingmaterial.helpingmaterialp
                                        ?
                                        <>
                                            <div className="main-content-1">

                                                <div className="inner-content-left">

                                                    <FontAwesomeIcon icon={faBookOpen} />

                                                    <span>Helping Material</span>
                                                </div>
                                                <div className="inner-content-right">



                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>

                                            </div>
                                            <hr className="hr" />
                                        </>

                                        :
                                        ""

                                } */}
{/* checking if thee assignment part is present */ }

{/* {
                                    topic.Assignment.assignp ?

                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faClipboardList} />
                                                    <span>Assignment No {topic.topicid}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Due Date :{topic.Assignment.duedate}</span>


                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> :
                                        ""


                                } */}

{/* checking if the quiz part is present */ }
{/* {

                                    topic.quiz.quizp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>Quiz no {topic.topicid}</span>
                                                </div>
                                                <div className="inner-content-right">
                                                    <span className="time">Scheduled :{topic.quiz.duedate}</span>


                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />


                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""

                                } */}
{/* checking if there is any online class created */ }
{/* {

                                    topic.onlineclass.onlineclassp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faBrain} />
                                                    <span>{"Online Class " + topic.topicname}</span>
                                                </div>
                                                <div className="inner-content-right">



                                                    <FontAwesomeIcon icon={faEdit} />
                                                    <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />





                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""

                                } */}


{/* checking if te recorded sessions are available */ }
{/* {
                                    topic.recordedsession.recordedsessionp ?
                                        <>
                                            <div className="main-content-1">
                                                <div className="inner-content-left">
                                                    <FontAwesomeIcon icon={faCirclePlay} />
                                                    <span>Recorded Video Session</span>
                                                </div>
                                                <div className="inner-content-right">

                                             
                                                     
                                                            <FontAwesomeIcon icon={faEdit} />
                                                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                                                       

                                                    
                                                </div>
                                            </div>
                                            <hr className="hr" />
                                        </> : ""
                                }
                            </div> */}