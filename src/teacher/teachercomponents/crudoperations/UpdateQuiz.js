import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect, useContext } from 'react';
import { CourseContext } from '../../context/Coursecontext';
import { useAlert } from 'react-alert';




export default function UpdateQuiz(props) {

    const quizid = props.id;
    const topicid = props.topicid;
    const alert = useAlert();
    const context = useContext(CourseContext);
    const [topics, setTopics] = context['topics'];
    const [courseid, setCourseid] = context['courseid'];
    const [cookies, setCookies] = useCookies();
    const [title, setTitle] = useState("");
    const [allowedtime, setAllowedTime] = useState("")
    const [quiztime, setQuizTime] = useState(new Date());
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
        if (quizid != "") {

            axios
                .get("/get-quiz-alldetails/" + quizid,
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
                    console.log(res.data);
                    if (res.data.success === true) {
                        setTitle(res.data.details.title);
                        setAllowedTime(res.data.details.allowedtime);
                        setQuizTime(new Date(res.data.details.quiztime));

                    } else {


                    }



                })
                .catch(err => console.error(err));
        }
    }, [quizid])



    return <div>


        <Modal {...props}>
            <Modal.Header closeButton>Update Quiz Details</Modal.Header>
            <ModalBody>




                <div className="mb-3">

                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} placeholder="enter assignment title" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Allowed Time </label>
                    <input type="number" className="form-control" value={allowedtime} placeholder="enter assignment title" onChange={(e) => {
                        setAllowedTime(e.target.value)
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Quiz Time</label>
                    <DateTimePicker value={quiztime} onChange={(value) => {
                        setQuizTime(new Date(value))

                    }} />

                </div>






                <br />







            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    const d = quiztime.toLocaleString();
                    axios
                        .post("/update-quiz/"+quizid,
                            {
                                title: title,
                                allowedtime:allowedtime,
                                quiztime:d

                            },
                            {
                                headers: {
                                    'teacher-auth-token': cookies.user.AuthToken,

                                }
                            }
                        ).then((res) => {
                            console.log(res.data);
                            if (res.data.success === true) {
                                getAllTopics();
                                alert.success(res.data.msg)

                            } else {
                                alert.error(res.data.msg)
                            }


                            const a = props.onHide();




                        })
                        .catch(err => console.error(err));
                }}> Save Changes</button>
            </ModalFooter>



        </Modal>
    </div>
}
