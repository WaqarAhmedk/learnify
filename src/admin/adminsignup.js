
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAlert } from "react-alert";
import { UserContext } from "../context/usercontext";

import "../style/login.css"


function AdminSignUp() {

    const alert = useAlert();
    const [user, setUser] = useContext(UserContext);


    let [error, seterror] = useState("");
    let [name, setName] = useState("");

    let [useremail, setuseremail] = useState("");
    let [userpassword, setuserpassword] = useState("");





    const navigate = useNavigate();
    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign UP As a <b style={{ fontSize: "40px" }}> Admin</b> </span>


                </div>
                <div className="col-6 signup-form  login-div">
                    <span className="error">{error}</span>

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
                        </div>




                        <div className="signup-btn mt-5 me-3 ms-3 mb-3">
                            <div className="row">



                                <button className='btn btn-primary' onClick={(e) => {
                                    e.preventDefault();
                                    if (useremail === "" || userpassword === "" || name === "") {
                                        seterror("PLease fill the form completly")


                                    }
                                    else {
                                        seterror("")
                                        axios
                                            .post("/admin/signup",
                                                {
                                                    email: useremail,
                                                    password: userpassword,
                                                    name: name
                                                })
                                            .then((res) => {

                                                if (res.data.success === true) {
                                                    navigate("/admin/login");
                                                    alert.success(res.data.msg)


                                                } else {
                                                    seterror(res.data.msg);
                                                    alert.error(res.data.msg)
                                                }
                                            })
                                            .catch(err => console.error(err));
                                        console.log(useremail, userpassword);
                                    }


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
