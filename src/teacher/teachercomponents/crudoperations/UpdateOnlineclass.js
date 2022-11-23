import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useEffect ,useContext } from 'react';
import { CourseContext } from '../../context/Coursecontext';
import { useAlert } from 'react-alert';




export default function UpdateOnlineClass(props) {

    const classid = props.id;
    const topicid = props.topicid;
    const alert=useAlert();
    const context = useContext(CourseContext);
    const [topics, setTopics] = context['topics'];
    const [courseid, setCourseid] = context['courseid'];
    const [cookies, setCookies] = useCookies();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [classtime, setClassTime] = useState(new Date());
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
        if (classid != "" && topicid != "") {

            axios
                .get(`/get-onlineclass/${topicid}/${classid}`,
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
                        setTitle(res.data.data.title);
                        setDesc(res.data.data.description);
                         setClassTime(new Date(res.data.data.classtime));

                    } else {


                    }



                })
                .catch(err => console.error(err));
        }
    }, [classid])



    return <div>


        <Modal {...props}>
            <Modal.Header closeButton>Update Online Class</Modal.Header>
            <ModalBody>




                <div className="mb-3">

                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} placeholder="enter assignment title" onChange={(e) => {
                        setTitle(e.target.value)
                    }} />
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                    <textarea className="form-control" value={desc} id="exampleFormControlTextarea1" rows="3" onChange={(e) => {

                        setDesc(e.target.value)
                    }} ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Submission date</label>
                    <DateTimePicker value={classtime} onChange={(value) => {
                        console.log(value);
                        setClassTime(new Date(value))

                    }} />

                </div>






                <br />







            </ModalBody>
            <ModalFooter>
                <button className="btn btn-primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    const d = classtime.toLocaleString();
                    axios
                        .post(`/update-online-class/${topicid}/${classid}`,
                            {
                                title: title,
                                description: desc,
                                starttime: d
                            },
                            {
                                headers: {
                                    'teacher-auth-token': cookies.user.AuthToken,
                                   
                                }
                            }
                        ).then((res) => {
                            if (res.data.success===true) {
                                getAllTopics();
                                alert.success(res.data.msg)

                            }else{
                                alert.error(res.data.msg)
                            }


                          const a=  props.onHide();
                          



                        })
                        .catch(err => console.error(err));
                }}> Save Changes</button>
            </ModalFooter>



        </Modal>
    </div>
}
