import React from 'react';
import { useState, useContext } from 'react';
import { ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { CourseContext } from '../../context/Coursecontext';

export default function CreateTopic(props) {


    const context = useContext(CourseContext);
    const [topics, setTopics] = context['topics'];

    const [topicname, setTopicname] = useState("");
    const [cookies, setCookies] = useCookies();
    const courseid = props.courseid;






    return (
        <>

        
            <ModalBody>
                <form>
                    <div class="form-group">
                        <label for="examzpleInputEmail1">Topic Name</label>
                        <input type="text" class="form-control" placeholder="Enter Topic Name" value={topicname} onChange={(e) => {
                            setTopicname(e.target.value);
                        }} />
                    </div>


                    <button type="submit" class="btn btn-primary" onClick={(e) => {
                        console.log(cookies.user.AuthToken);
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
                                        

                                    }
                                    else {
                                        console.log(res.data);

                                    }
                                })
                                .catch(err => console.error(err));

                        }
                    }}>Create</button>
                </form>
            </ModalBody>

        </>

    )
}
