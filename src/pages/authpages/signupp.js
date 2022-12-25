
import React, { useState, useEffect, CSSProperties } from "react";
import "../../style/login.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useAlert } from 'react-alert';



function Signup() {

    let [fname, setfname] = useState("");
    let [fnameerror, setfnameerror] = useState("");


    let [lname, setlname] = useState("");
    let [lnameerror, setlnameerror] = useState("");

    let [email, setemail] = useState("");
    let [emailerror, setemailerror] = useState("");

    let [password, setpassword] = useState("");
    let [passworderror, setpassworderror] = useState("");

    const [image, setImage] = useState();
    const [imageerror, setImageError] = useState("");

    let [formerror, setformerror] = useState("");
    const [role, setRole] = useState("student");

    const [signingup, setSigningup] = useState(false);








    var navigate = useNavigate();
    const alert = useAlert();






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

                    <span className="error">{formerror}</span>
                    <form>
                        <div className="row form ">
                            <div className="form-label-1">
                                <label className="col">First Name</label>
                                <label className="col">Last Name</label>
                            </div>
                            <div className="form-input-1">
                                <input className="col" type="text" required value={fname} placeholder="First Name" onChange={(e) => {
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


                                <input className="col" type="text" required placeholder="Last Name" value={lname} onChange={(e) => {

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
                            <input className="" type="email" required value={email} onChange={(e) => {
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
                            <input type="password" required placeholder="*****" onChange={(e) => {

                                password = e.target.value;
                                setpassword(password);


                            }
                            }

                                onBlur={() => {
                                    if (password.length >= 8) {

                                        setpassworderror("");

                                    }
                                    else {

                                        setpassworderror("* Password must be greater then 8 Characters");
                                    }
                                }} />
                            <span className="col error">{passworderror}</span>

                        </div>

                        <div className="row email-div">

                            <label className="">Select Avatar</label>
                            <input className="" required type="file" accept="image/*,.jpg,.jpeg" onChange={(e) => {

                                setImage(e.target.files[0])
                                console.log(image);

                            }} />

                            <span className="col error">{imageerror}</span>

                        </div>
                        <div className="row email-div">
                            <label className="mt-3 mb-1">Signup as </label>

                            <select className="form-select" aria-label="Default select example" onChange={(e) => {
                                setRole(e.target.value)
                            }}>
                                <option value="student">Student</option>

                                <option value="teacher">Teacher</option>




                            </select>

                        </div>



                        <div className="signup-btn mb-4 mt-2 me-3 ms-3">
                            <div className="row">
                                
                                <button className="btn btn-primary"  onClick={(e) => {


                                    e.preventDefault();
                                    setformerror("");
                                    const formdata = new FormData();
                                    formdata.append('firstname', fname);
                                    formdata.append('lastname', lname);
                                    formdata.append('email', email);
                                    formdata.append('password', password);
                                    formdata.append('image', image);
                                    console.log(image);



                                    if (fname === "" || lname === "" || email === "" || password === "" || image === "") {
                                        setformerror(" * Form must be filled completly");
                                    }
                                    if (fname === "") {
                                        setfnameerror("* Please Provide your first name")
                                    }
                                    if (lname === "") {
                                        setlnameerror(" * Please Provide your last name")
                                    }
                                    if (email === "") {
                                        setemailerror(" * Please Provide your email")
                                    }

                                    if (password === "") {
                                        setpassword(" * Please Provide your password")
                                    } if (image === "" || image === undefined) {
                                        setImageError(" * Please Provide your image")
                                    }



                                    else {
                                        setSigningup(true);
                                        setImageError("")

                                        if (role === 'student') {
                                            axios.post("/signup", formdata)
                                                .then((res) => {
                                                    console.log(res.data);
                                                    if (res.data.success === true) {
                                                        alert.success(res.data.msg)
                                                        navigate("/signin");
                                                    }
                                                    else {
                                                        setSigningup(false);
                                                        setemailerror(res.data.msg)
                                                    }
                                                })
                                                .catch(err => console.log(err))
                                        }
                                        else if (role === 'teacher') {

                                            axios.post("/teacher/signup", formdata)
                                                .then((res) => {
                                                    console.log(res.data);
                                                    if (res.data.success === true) {
                                                        alert.success(res.data.msg)

                                                        navigate("/signin");
                                                    }
                                                    else {
                                                        setSigningup(false)
                                                        setemailerror(res.data.msg)
                                                        e.preventDefault()
                                                    }
                                                })
                                                .catch(err => console.log(err))
                                        }


                                    }

                                }} >
                                    <span>Signup</span>

                                    {
                                        signingup ? <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : ""
                                    }

                                </button>



                            </div>

                        </div>

                    </form>
                </div>



            </div>



        </div>

    </>
}

export default Signup;







