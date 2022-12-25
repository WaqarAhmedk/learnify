
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import {  useCookies } from "react-cookie";
import { useAlert } from "react-alert";
import { UserContext } from "../context/usercontext";
import "../style/login.css"


function AdminLogin() {

    const alert = useAlert();
    const [user, setUser] = useContext(UserContext);


    let [error, seterror] = useState("");
    let [useremail, setuseremail] = useState("");
    let [userpassword, setuserpassword] = useState("");
    const [autherror, setAuthError] = useState("");
    const [checkerror, setCheckError] = useState(false);
    const [Cookies, setCookies] = useCookies();





    const navigate = useNavigate();
    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign in As a <b style={{ fontSize: "40px" }}>Admin</b> </span>


                </div>
                <div className="col-6 signup-form  login-div">

                    <form className="login-form">

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
                                    if (useremail === "" || userpassword === "") {
                                        seterror("PLease Provide useremail and Password")


                                    }
                                    else {
                                        axios
                                            .post("/admin/login", { email: useremail, password: userpassword })
                                            .then((res) => {
                                                console.log(res.data);
                                                if (res.data.success) {
                                                    const data = { "AuthToken": res.data.AuthToken, "role": res.data.user.role };
                                                    setCookies("user", JSON.stringify(data), { path: "/" });

                                                    setUser({
                                                        logedin: true,
                                                        user: res.data.user
                                                    });
                                                    navigate("/admin")


                                                } else {
                                                    setCheckError(true)
                                                    setAuthError(res.data.msg)
                                                }
                                            })
                                            .catch(err => console.error(err));
                                    }

                                }}>Log In</button>
                            </div>

                        </div>


                    </form>
                </div>



            </div>



        </div>
    </>

}

export default AdminLogin;
