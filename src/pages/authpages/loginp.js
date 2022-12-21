
import "../../style/login.css"
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import { UserContext } from "../../context/usercontext";
import { useAlert } from "react-alert";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';


function Login() {

    const alert = useAlert();
    const [user, setUser] = useContext(UserContext);


    const [error, seterror] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [emailerror, setEmailErro] = useState("");
    const [passworderror, setPasswordError] = useState("")


    const [cookies, setCookies] = useCookies();
    const [teacher, setTeacher] = useState(false);
    const [autherror, setAuthError] = useState("");
    const [images, setImages] = useState("");
    const [imageerror, setImageError] = useState();
    const [checkerror, setCheckError] = useState(false);
    const [checkimages, setCheckImages] = useState(false);
    const [showimagemodal, setShowimageModal] = useState(false);
    const [id, setid] = useState("");
    const [loading,setLoading]=useState(false)





    const navigate = useNavigate();
    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    {
                        teacher ? <span>Sign in As a <b>Teacher</b> and start Teaching Now </span>
                            :
                            <span>Sign in As a <b>Student</b>and start learning Now </span>
                    }
                </div>
                <div className="col-6 signup-form  login-div">

                    <form className="login-form">

                        <div className="row email-div">
                            <label className="">Email</label>
                            <input className="" type="email" onChange={(e) => {
                                setuseremail(e.target.value);
                            }} />
                            <span className="col ms-3 error">{emailerror}</span>

                        </div>
                        <div className="row email-div ">
                            <label className="">Password</label>
                            <input className="" type="password" placeholder="********" onChange={(e) => {
                                setuserpassword(e.target.value);
                            }} />
                            <span className="col ms-3 error">{passworderror}</span>
                        </div>
                        {
                            checkerror ? <div className="alert alert-danger mt-1">{autherror}</div>
                                : ""
                        }

                        <div className="ms-2 mt-2">
                            <span>If you are a <b>{
                                teacher ? "Student" : "Teacher"}</b> Login  </span>
                            <span className="text-primary" onClick={() => {

                                teacher ? setTeacher(false) : setTeacher(true);

                            }} >Here</span>

                        </div>

                        <div className="signup-btn">
                            <div className="row">


                                <button className="btn btn-primary mb-4 mt-2 me-4 ms-2" type="submit" value="SIGN IN" onClick={(e) => {
                                    setLoading(true);

                                    e.preventDefault();

                                    if (useremail === "") {
                                        setEmailErro("Please Provide Email")

                                    }
                                    if (userpassword === "") {
                                        setPasswordError("Please Provide password")

                                    }
                                    else {
                                        setEmailErro("");
                                        setPasswordError("");
                                        const teacherapi = "/teacher/login";
                                        const studentapi = "/login";


                                        let api;
                                        if (teacher) {
                                            api = teacherapi;

                                        }
                                        else {
                                            api = studentapi;
                                        }


                                        axios.post(api, {
                                            email: useremail,
                                            password: userpassword
                                        })
                                            .then((res) => {
                                                setLoading(false)
                                                if (res.data.images === false) {
                                                    setShowimageModal(true);
                                                    setid(res.data.userid)

                                                }
                                                if (res.data.success == true) {
                                                    setCheckError(false);
                                                    const data = { "AuthToken": res.data.AuthToken, "role": res.data.user.role };
                                                    setCookies("user", JSON.stringify(data), { path: "/" });

                                                    if (res.data.user.role == "teacher") {

                                                        setUser({ logedin: true, user: res.data.user });
                                                        alert.success("welcome " + res.data.user.firstname);
                                                        navigate("/teacher/dashboard");


                                                    } else if (res.data.user.role == "student") {
                                                        setUser({ logedin: true, user: res.data.user });
                                                        alert.success("welcome " + res.data.user.firstname);



                                                        navigate("/dashboard")
                                                    }

                                                }
                                                if (res.data.success === false) {
                                                    console.log(res.data);
                                                    setCheckError(true);
                                                    setAuthError(res.data.msg);
                                                }


                                            })
                                            .catch(err => console.log(err));

                                    }







                                }} >
                                    Login
                                    {
                                        loading ?<Spinner
                                        className="ms-3"
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />:""
                                    }
                                    
                                </button>


                            </div>

                        </div>
                        <Modal show={showimagemodal}>
                            <ModalHeader closeButton onClick={()=>{
                                setShowimageModal(false);
                            }}> Upload Images</ModalHeader>
                            <ModalBody>
                                <span>Please Upload your two pictures</span>
                                <div className="row form ">

                                    <div className="form-input-1">


                                        <div className="input-group mb-3 ">
                                            <input type="file" multiple accept="image/*"  required className="row email-div" onChange={(e) => {
                                                setImages(e.target.files)

                                            }} />
                                            <span className="col error">{imageerror}</span>

                                        </div>
                                    </div>


                                </div>
                            </ModalBody>
                            <ModalFooter >
                                <button className="btn btn-primary" onClick={(e) => {
                                    e.preventDefault();
                                    if (images.length < 2) {
                                        setImageError("Please Select Atleast 2 images")
                                    }
                                    else if (images.length > 2) {
                                        setImageError("Please select Only 2 images")
                                    }
                                    else{
                                        setImageError("");
                                    }

                                    if (imageerror==="") {
                                        let formdata = new FormData();

                                        for (let i = 0; i < images.length; i++) {
                                            formdata.append("images", images[i]);

                                        }
                                        axios
                                            .post("upload/images/" + id, formdata)
                                            .then((res) => {
                                                if (res.data.success === true) {
                                                    setImageError("")
                                                    setShowimageModal(false);




                                                }
                                            })
                                            .catch(err => console.error(err));

                                    }



                                }}>Upload Pictures</button>
                            </ModalFooter>

                        </Modal>

                    </form>
                </div>



            </div>



        </div>
    </>

}

export default Login;
