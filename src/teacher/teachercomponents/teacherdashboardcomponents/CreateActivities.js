import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import { useCookies } from 'react-cookie';
import { CourseContext } from '../../context/Coursecontext';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export default function CreateActivities(props) {
    const alert = useAlert();
    const navigate = useNavigate();


    const [cookies, setCookies] = useCookies();
    const courseid = props.courseid;
    // geeting and updating coursename and topics through contextApi
    const context = useContext(CourseContext);
    const [coursename, setCoursename] = context['course'];
    const [topics, setTopics] = context['topics'];



    let [dropshow, setdropshow] = useState("course-mang-dropdown-content");
    //state variable for create new activity parent options
    let [creatactp, setcreateactp] = useState("create-activity-parent-content");
    //state variable for create new activity child options
    let [creatactc, setcreateactc] = useState("create-activity-child-content");

    // create topic
    const [createtopicdiallog, setCreatetopicdialog] = useState(false);


    const [topicname, setTopicname] = useState("");

    const openCreateTopic = () => {
        setCreatetopicdialog(true);
    }
    const closeCreateTopic = () => {
        setCreatetopicdialog(false);
    }







    // ***State Management variables for assignment creation***


    const [crt_assginment, setcrt_assginment] = useState(false);

    const Opencrt_assginment = () => {
        setcrt_assginment(true)

    }
    const Closecrt_assginment = () => {
        setcrt_assginment(false)
    }


    const [Asgm_title, setAsgm_title] = useState("");
    const [Asgm_Desc, setAsgm_Desc] = useState("");
    const [Asgmfile, setAsgmfile] = useState("");
    const [Asgmdate, setAsgmdate] = useState(new Date())
    const [Asg_edit, setAsg_edit] = useState(false);





    //******Quiz Creation Modal*******



    const [Quiz, setQuiz] = useState(false);

    const OpenQuiz = () => {
        setQuiz(true)

    }
    const CloseQuiz = () => {
        setQuiz(false)
    }



    //******Video Session Modal********

    const [class_title, setClass_title] = useState("");
    const [class_Desc, setClass_Desc] = useState("");
    const [class_time, setClass_time] = useState(new Date());




    const [Vid_session, setVid_session] = useState(false);

    const OpenVid_session = () => {
        setVid_session(true)

    }
    const CloseVid_session = () => {
        setVid_session(false)
    }



    //******Helping Material Modal********
    const [Hlp_matr, setHlp_matr] = useState(false);


    const [hlpmatTitle, setHlpmatTitle] = useState("");
    const [hlpmatDesc, setHlpmatDesc] = useState("");


    const OpenHlp_matr = () => {
        setHlp_matr(true)

    }
    const CloseHlp_matr = () => {
        setHlp_matr(false)
    }







    // topic selection for every operation

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


                    <span className="course-mang-list" onClick={openCreateTopic}>New Topic </span>

                    <span className="course-mang-list" onClick={Opencrt_assginment}>Assignment</span>

                    <span className="course-mang-list" onClick={() => {
                        navigate("/createquiz/course/"+ courseid)
                    }}>Quiz</span>

                    <span className="course-mang-list" onClick={OpenVid_session}>Online Class</span>

                    <span className="course-mang-list" onClick={OpenHlp_matr}>Helping Material</span>

                </div>





            </div>




            <Modal show={createtopicdiallog}>
                <ModalHeader closeButton onClick={closeCreateTopic}>Create Topic</ModalHeader>
                <ModalBody>
                    <form>
                        <div class="form-group">
                            <label for="examzpleInputEmail1">Topic Name</label>
                            <input type="text" class="form-control" placeholder="Enter Topic Name" value={topicname} onChange={(e) => {
                                setTopicname(e.target.value);
                            }} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type="submit" class="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        if (topicname !== "") {
                            axios
                                .post("/create-topic/" + courseid, {
                                    title: topicname,
                                }, {
                                    headers: {
                                        'teacher-auth-token': cookies.user.AuthToken

                                    }
                                })
                                .then((res) => {
                                    if (res.data.success == true) {
                                        getAllTopics();
                                        closeCreateTopic();
                                        alert.success(res.data.message);
                                        setTopicname("");

                                    }
                                    else {

                                        alert.error(res.data.message);
                                    }
                                })
                                .catch(err => console.error(err));

                        }
                    }}>Create</button>
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
                            console.log(value);
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
                                alert.success(res.data.message)

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

                            setClass_Desc(e.target.value);
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
                                if (res.data.success===true) {
                                    getAllTopics();
                                    alert.success(res.data.message)
                                }
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

                        <label className="form-label">Title</label>
                        <input type="email" className="form-control" value={hlpmatTitle} placeholder="enter helping material title" onChange={(e) => {

                            setHlpmatTitle(e.target.value)

                        }} />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={hlpmatDesc} rows="3" onChange={(e) => {

                            setHlpmatDesc(e.target.value)

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

        </div>)
}
