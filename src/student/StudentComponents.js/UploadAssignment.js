import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


export default function UploadAssignment(props) {
    const data = props.data;
    const topic = props.topic;
    const [cookies, setCookies] = useCookies();
    const alert = useAlert();

    const [file, setFile] = useState("");

    const [uploaded, setUploaded] = useState(faBedPulse);
    const [uploadeddata, setuploadeddata] = useState({});
    const [r, setR] = useState("");

    const remainingtime = () => {
        var now = new Date();
        const submissiontime = data.submissiondate;
        const sub = new Date(submissiontime);




        var ms = moment(now, "DD/MM/YYYY HH:mm:ss");
        // .diff(moment(sub, "DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms.diff(sub));
        const days = d._data.days;
        const hours = d._data.hours;
        const minutes = d._data.minutes;
        const seconds = d._data.seconds;

        const compapredates = now > sub;
        if (compapredates) {
            setR(`you are ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds late`)
        }
        else {

            console.log(days);
            setR(` ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds `)

        }

    }


    useEffect(() => {
        remainingtime()

        if (props.show === true) {

            axios
                .get("/check-uploaded-assignment/" + data._id, {
                    headers: {
                        'student-auth-token': cookies.user.AuthToken

                    }
                })
                .then((res) => {
                    if (res.data.success === true && res.data.uploaded === true) {
                        setUploaded(true);
                        setuploadeddata(res.data.details);



                    }
                    else if (res.data.success === true && res.data.uploaded === false) {
                        setUploaded(false);
                    }

                })
                .catch(err => console.error(err));
        }
    }, [props.show]);





    return <div>
        <Modal {...props} >
            <Modal.Header closeButton>Upload ASSIGNMENT</Modal.Header>
            <Modal.Body>


                {
                    uploaded ? <div>
                        <h3>You Already Uploaded Assignemnt</h3>

                        <div className="mb-3 d-flex justify-content-between ms-4 me-4">

                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                            <h5>{uploadeddata.filename}</h5>
                        </div>




                        <div className="mb-3 d-flex justify-content-between ms-4 me-4">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Submission Time</label>
                            <h5>{data.submissiondate}</h5>

                        </div>
                        <div className="mb-3 d-flex justify-content-between ms-4 me-4">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Submitted At </label>
                            <h5>{uploadeddata.uploadtime}</h5>

                        </div>








                    </div>
                        :
                        <div>
                            <div className="mb-3 d-flex justify-content-between ms-4 me-4">

                                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                <h5>{data.title}</h5>
                            </div>


                            <div className="mb-3 d-flex justify-content-between ms-4 me-4">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                <h6>{data.description}</h6>
                            </div>

                            <div className="mb-3 d-flex justify-content-between ms-4 me-4">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Submission Time</label>
                                <h5>{data.submissiondate}</h5>

                            </div>
                            <div className="mb-3 d-flex justify-content-between ms-4 me-4">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Remaning Time</label>
                                <h5>{r}</h5>

                            </div>




                            <br />

                            {/*********/}
                            <div className="input-group mb-3">
                                <label>Select The file to Upload</label>
                            </div>
                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="inputGroupFile02" onChange={(e) => {
                                    console.log(e);
                                    setFile(e.target.files[0]);
                                }} />
                            </div>
                        </div>
                }






            </Modal.Body>
            {
                uploaded ? "" : <Modal.Footer>
                    <button className='btn btn-primary' onClick={() => {
                        const formdata = new FormData();
                        formdata.append("file", file);
                        formdata.append("courseid", data.course);
                        formdata.append("topicid", topic);



                        if (file === "" || file === undefined) {
                            alert.error("Plese Select Your Assignemt");
                        }
                        else {
                            axios
                                .post("/upload-assignment/" + data._id, formdata, {
                                    headers: {
                                        'student-auth-token': cookies.user.AuthToken

                                    }
                                })
                                .then((res) => {
                                    if (res.data.success === true) {
                                        setFile("");
                                        alert.success(res.data.msg)
                                        props.onHide()

                                    }
                                    else {
                                        
                                        alert.error(res.data.msg)
                                    }
                                })
                                .catch(err => console.error(err));

                        }
                    }}>Upload</button>
                </Modal.Footer>
            }
        </Modal>
    </div>
}
