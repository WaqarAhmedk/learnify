
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { useAlert } from "react-alert";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { UserContext } from "../context/usercontext";
import "../style/login.css"


function AdminSignUp() {

    const alert = useAlert();
    const [user, setUser] = useContext(UserContext);


    let [error, seterror] = useState("");
    let [name, setName] = useState("");

    let [useremail, setuseremail] = useState("");
    let [userpassword, setuserpassword] = useState("");
    const [autherror, setAuthError] = useState("");
    const [checkerror, setCheckError] = useState(false);





    const navigate = useNavigate();
    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign UP As a <b style={{ fontSize: "40px" }}> Admin</b> </span>


                </div>
                <div className="col-6 signup-form  login-div">

                    <form className="login-form">
                        <div className="row email-div">
                            <label className="">Admin Nmae</label>
                            <input className="" type="text" value={name} onChange={(e) => {
                                setName(e.target.value);
                            }} />

                        </div>

                        <div className="row email-div">
                            <label className="">Email</label>
                            <input className="" type="email" value={useremail} onChange={(e) => {
                                setuseremail(e.target.value);
                            }} />

                        </div>
                        <div className="row email-div ">
                            <label className="">Password</label>
                            <input className="" type="password" placeholder="********" value={userpassword} onChange={(e) => {
                                setuserpassword(e.target.value);
                            }} />
                            <span className="error">{error}</span>
                        </div>
                        {
                            checkerror ? <div className="alert alert-danger mt-1">{autherror}</div>
                                : ""
                        }



                        <div className="signup-btn mt-5 me-3 ms-3 mb-3">
                            <div className="row">



                                <button className='btn btn-primary' onClick={(e) => {
                                    e.preventDefault();
                                    if (useremail === "" || userpassword === "" || name === "") {
                                        seterror("PLease Provide useremail and Password")


                                    }

                                    axios
                                        .post("/admin/signup",
                                            {
                                                email: useremail,
                                                password: userpassword,
                                                name: name
                                            })
                                        .then((res) => {

                                            if (res.data.succes===true) {
                                                navigate("/admin/login")
                                                
                                            }
                                                                                })
                                        .catch(err => console.error(err));
                                    console.log(useremail, userpassword);
                                }}>Sign Up</button>
                            </div>

                        </div>


                    </form>
                </div>



            </div>



        </div>
    </>

}

export default AdminSignUp;
