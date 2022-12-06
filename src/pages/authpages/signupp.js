
import { useState, useEffect } from "react";
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
    const [role, setRole] = useState("student");









    var navigate = useNavigate();






    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">

                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign Up for Free! </span>
                    <br />
                    <span> as a<b> {role.toLocaleUpperCase()}</b></span>
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
                                <input className="col" type="text" value={fname} placeholder="First Name" onChange={(e) => {
                                    fname = e.target.value;
                                    setfname(fname);
                                }}

                                    onBlur={() => {
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


                                <input className="col" type="text" placeholder="Last Name" value={lname} onChange={(e) => {

                                    lname = e.target.value;
                                    setlname(lname);
                                }}

                                    onBlur={() => {
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
                                    }} />
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
                                email = e.target.value;
                                setemail(email);

                            }
                            }

                                onBlur={() => {
                                    // Regex regular expressions which are used to match the required string format.

                                    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                                    if (re.test(email)) {
                                        setemailerror("");
                                    }

                                    else {
                                        setemailerror("* Enter a valid email");
                                    }
                                }} />
                            <span className="col error">{emailerror}</span>

                        </div>

                        <div className="row email-div">

                            <label className="">Password</label>
                            <input type="password" placeholder="*****" onChange={(e) => {

                                password = e.target.value;
                                setpassword(password);


                            }
                            }

                                onBlur={() => {
                                    if (password.length >= 8) {

                                        setpassworderror("");

                                    }
                                    else {

                                        setpassworderror("* Password must be greater then 8 words");
                                    }
                                }} />
                            <span className="col error">{passworderror}</span>

                        </div>
                        <label className="mt-3">Signup as A </label>

                        <select className="form-select" aria-label="Default select example" onChange={(e) => {
                            setRole(e.target.value)
                        }}>
                            <option value="student">Student</option>

                            <option value="teacher">Teacher</option>




                        </select>


                        <div className="row form ">
                            <div className="form-label-1">
                                <label className="col">Upload Pictures</label>
                            </div>
                            <div className="form-input-1">


                                <div className="input-group mb-3">
                                    <input type="file" className="form-control" onChange={(e) => {

                                    }} />
                                </div>
                            </div>

                            {/*  pic error */}
                            <div className="row">
                                <span className="col error"></span>
                            </div>
                        </div>
                        <div className="signup-btn mb-4 mt-2 me-3 ms-3">
                            <div className="row">

                              
                                    <button className="btn btn-primary "  onClick={() => {


                                        if (fname === "" || lname === "" || email === "" || password === "") {
                                            setformerror("Form must be filled completly");
                                        }
                                        else if (fnameerror != "" || lnameerror != "" || emailerror != "" || passworderror != "") {
                                            setformerror("Remove all the errors from the form");

                                        }
                                        else {

                                            if (role === 'student') {
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
                                                        else {
                                                            setemailerror(res.data.msg)
                                                        }
                                                    })
                                                    .catch(err => console.log(err))
                                            }
                                            else if (role === 'teacher') {
                                                axios.post("/teacher/signup", {
                                                    firstname: fname,
                                                    lastname: lname,
                                                    email: email,
                                                    password: password,

                                                })
                                                    .then((res) => {
                                                        if (res.data.success == true) {

                                                            navigate("/signin");
                                                        }
                                                        else {
                                                            setemailerror(res.data.msg)
                                                        }
                                                    })
                                                    .catch(err => console.log(err))
                                            }


                                        }

                                    }} > Sign Up</button>
                                  

                            </div>

                        </div>

                    </form>
                </div>



            </div>



        </div>
    </>
}

export default Signup;







