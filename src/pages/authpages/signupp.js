
import { useState } from "react";
import "../../style/login.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbarmain from "../mainnavbar";
import axios from "axios";




function Signup() {

    let [fname, setfname] = useState("");
    let [fnameerror, setfnameerror] = useState("");


    let [lname, setlname] = useState("");
    let [lnameerror, setlnameerror] = useState("");

    let [email, setemail] = useState("");
    let [emailerror, setemailerror] = useState("");

    let [password, setpassword] = useState("");
    let [passworderror, setpassworderror] = useState("");

    let [formerror, setformerror] = useState("");






    var navigate = useNavigate();

    //getting data of role from moto page through navigate method params

    const state = useLocation();

    const role = state.state.role;





    return <>
        <Navbarmain />
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">

                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign Up for Free! </span>
                    <br />
                    <span> as a {role}</span>
                </div>


                <div className="col-6 signup-form">
                    <span className="col ms-3 error">{formerror}</span>
                    <form>
                        <div className="row form ">
                            <div className="form-label-1">
                                <label className="col">First Name</label>
                                <label className="col">Last Name</label>
                            </div>
                            <div className="form-input-1">
                                <input className="col" type="text" value={fname} placeholder="Enter First Name" onChange={(e) => {

                                    fname = e.target.value;
                                    setfname(fname);
                                    if (fname.length >= 3) {

                                        setfnameerror("");
                                        setfname(fname);
                                    }
                                    else {
                                        if (fname === "") {
                                            fnameerror = "* You must provide First Name";
                                            setfnameerror(fnameerror);
                                        }
                                        else {
                                            fnameerror = "* First name must be greater than 3";
                                            setfnameerror(fnameerror);
                                        }
                                    }


                                }} />


                                <input className="col" type="text" value={lname} placeholder="Ahmed" onChange={(e) => {

                                    lname = e.target.value;
                                    setlname(lname);
                                    if (lname.length >= 3) {

                                        setlnameerror("");
                                        setlname(lname);
                                    }
                                    else {
                                        if (lname === "") {
                                            lnameerror = "* You must provide Last Name";
                                            setlnameerror(lnameerror);
                                        }
                                        else {
                                            lnameerror = " * Last name must be greater then 3"
                                            setlnameerror(lnameerror);
                                        }
                                    }

                                }
                                } />
                            </div>
                        </div>
                        {/*  Form first name and last name error message  of validation */}
                        <div className="row">
                            <span className="col ms-3 error">{fnameerror}</span>
                            <span className="col error">{lnameerror}</span>
                        </div>
                        <div className="row email-div">

                            <label className="">Email</label>
                            <input className="" type="email" value={email} onChange={(e) => {

                                // Regex regular expressions which are used to match the required string format.

                                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                                email = e.target.value;

                                setemail(email);


                                if (re.test(email)) {
                                    setemailerror("");
                                }

                                else {
                                    setemailerror("* Enter a valid email");
                                }
                            }
                            } />
                            <span className="col error">{emailerror}</span>

                        </div>
                        <div className="row form ">
                            <div className="form-label-1">
                                <label className="col">Password</label>
                                <label className="col">Upload Pictures</label>
                            </div>
                            <div className="form-input-1">
                                <input className="col" type="password" placeholder="*****" onChange={(e) => {

                                    password = e.target.value;
                                    setpassword(password);
                                    if (password.length >= 8) {

                                        setpassworderror("");

                                    }
                                    else {

                                        setpassworderror("* Password must be greater then 8 words");
                                    }

                                }
                                } />

                                <input className="col in-file" type="file" placeholder="Ahmed" />
                            </div>

                            {/* password and pic error */}
                            <div className="row">
                                <span className="col ms-3 error">{passworderror}</span>
                                <span className="col error"></span>
                            </div>
                        </div>
                        <div className="signup-btn">
                            <div className="row">

                                <div className="form-btn-group">
                                    <input className="btn btn-primary " value="SIGN UP" type="submit" onClick={(e) => {

                                        e.preventDefault();

                                        if (fname === "" || lname === "" || email === "" || password === "") {
                                            setformerror("Form must be filled completly");
                                        }
                                        else if (fnameerror != "" || lnameerror != "" || emailerror != "" || passworderror != "") {
                                            setformerror("Remove all the errors from the form");

                                        }
                                        else {

                                            axios.post("/signup", {
                                                firstname: fname,
                                                lastname: lname,
                                                email: email,
                                                password: password,

                                            })
                                                .then((res) => {
                                                    if (res.data.success == true) {

                                                        navigate("/signin");
                                                    }
                                                    else{
                                                        setemailerror(res.data.msg)
                                                    }
                                                })
                                                .catch(err => console.log(err))


                                        }

                                    }} />
                                    <a className="g-logo-link-signup" href="/">
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                                        SIGN UP USING GOOGLE
                                    </a>

                                </div>
                            </div>

                        </div>

                    </form>
                </div>



            </div>



        </div>
    </>
}

export default Signup;







