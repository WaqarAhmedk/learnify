
import "../../style/login.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";


function Login() {


    let [error, seterror] = useState("");
    let [useremail, setuseremail] = useState("");
    let [userpassword, setuserpassword] = useState("");
    const [cookies, setCookies] = useCookies();
    const [teacher, setTeacher] = useState(false);
    




    const navigate = useNavigate();
    return <>
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Sign in and start learnig Now</span>
                </div>
                <div className="col-6 signup-form  login-div">
                    <form className="login-form">
                        <div className="row email-div">
                            <label className="">Email</label>
                            <input className="" type="email" onChange={(e) => {
                                setuseremail(e.target.value);
                            }} />

                        </div>
                        <div className="row email-div">
                            <label className="">Password</label>
                            <input className="" type="password" placeholder="********" onChange={(e) => {
                                setuserpassword(e.target.value);
                            }} />
                            <span className="error">{error}</span>
                        </div>
                        <div className="row email-div">
                            <label className="d-inline">if you are a teacher please check this </label>
                            <input type={"checkbox"} className="d-inline " onClick={() => {

                                teacher ? setTeacher(false) : setTeacher(true);

                            }} />
                        </div>
                        <div className="signup-btn">
                            <div className="row">

                                <div className="form-btn-group">
                                    <input className="btn btn-primary " type="submit" value="SIGN IN" onClick={(e) => {
                                        e.preventDefault();
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
                                                console.log(res.data);
                                                if (res.data.success==true) {

                                                   if (res.data.user.role=="teacher") {
                                                    setCookies("teacherAuth", res.data.AuthToken, { path: "/" })
                                                     navigate("/teacher/dashboard");
                                                     
                                                    
                                                   }else if (res.data.user.role=="student") {
                                                    setCookies("StudentAuth", res.data.AuthToken, { path: "/" })
                                                     navigate("/dashboard")
                                                   }

                                                }
                                               

                                            })
                                            .catch(err => console.log(err));





                                    }} />
                                    <a className="g-logo-link" href="/">
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                                        SIGNIN USING GOOGLE
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

export default Login;
