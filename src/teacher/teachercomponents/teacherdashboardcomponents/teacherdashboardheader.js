import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Discussionboard from "../../../components/discussionboard";
import "../../../style/login.css"
import { faBars, faPeopleArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';
import { CourseContext } from '../../context/Coursecontext';
import { useAlert } from 'react-alert';
import CreateActivities from './CreateActivities';
import CourseSettings from './courseSettings';

export default function TeacherDashboardHeader() {

    const alert = useAlert();
    const params = useParams();
    let courseid = params.courseid;

    // geeting and updating coursename and topics through contextApi
    const context = useContext(CourseContext);
    const [coursename, setCoursename] = context['course'];
    const [topics, setTopics] = context['topics'];
    //cookies
    const [cookies, setCookies] = useCookies();




    let navigate = useNavigate();







    const [discussion, setDiscussion] = useState(false);
    const opendiscussion = () => {
        setDiscussion(true)
    }
    const closediscussion = () => {
        setDiscussion(false)
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

    }, [courseid]);









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

                        <CreateActivities courseid={courseid} />
                        <CourseSettings courseid={courseid} />





                    </div>


                }
            </div>





            {/* Discuusion board */}
            <Modal show={discussion}>
                <ModalHeader closeButton onClick={closediscussion}>Discussion Board for {coursename}</ModalHeader>
                <ModalBody>
                    <Discussionboard role="teacher" courseid={courseid} />
                </ModalBody>
            </Modal>



        </div>



    )
}
