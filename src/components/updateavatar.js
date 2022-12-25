import React from 'react';
import { Modal, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../context/usercontext';
import { useContext } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert';

export default function UpdateAvatar(props) {
    const [user, setUser] = useContext(UserContext);
    const [avatar, setAvatar] = useState("");
    const [avatarError, setAvatarError] = useState("");
    const  alert = useAlert();








    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Avatar
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row email-div">

                    <label className="">Select Avatar</label>
                    <input className="" required type="file" accept="image/*,.jpg,.jpeg" onChange={(e) => {
                        setAvatar(e.target.files[0]);



                    }} />

                    <span className="col error">{avatarError}</span>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={(e) => {
                    const formdata = new FormData();

                    formdata.append('avatar', avatar);
                 
                    e.preventDefault();
                    if (avatar == undefined || !avatar) {
                        setAvatarError("Please select an avatar");
                        return;

                    } else {
                        let api="";
                        if (user.user.role == "student") {
                          api=  `/update-student-avatar/${user.user._id}`
                        }else if (user.user.role == "teacher") {
                           api= `/update-teacher-avatar/${user.user._id}`
                        }
                        {
                        console.log("clioc");

                        axios.post(api,
                         formdata).then(
                            (res) => 
                            {
                                if (res.data.success) {
                                    props.onHide()
                                    alert.success(res.data.message);
                
                                    
                                }else{
                                    alert.error(res.data.message);
                                }
                            }).
                            catch((err) => {
                            console.log(err);
                        });
                    }
                }}}>Update Avatar</button>
                <button onClick={props.onHide} className="btn btn-secondary">Close</button>
            </Modal.Footer>
        </Modal>
    )
}
