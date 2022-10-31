
import "../../style/login.css"
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Cookies, useCookies } from "react-cookie";
import { UserContext } from "../../context/usercontext";
import { useAlert } from "react-alert";


function Login() {

    const alert = useAlert();
    const [user, setUser] = useContext(UserContext);


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
                    {
                        teacher ? <span>Sign in As a <b>Teacher</b> and start learnig Now</span>
                            :
                            <span>Sign in As a <b>Student</b> and start Teaching Now</span>
                    }
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
                        <div className="ms-2 mt-5">
                            <span>If you are a <b>{
                                teacher ? "Student" : "Teacher"}</b> Login  </span>
                            <span className="text-primary" onClick={() => {

                                teacher ? setTeacher(false) : setTeacher(true);

                            }} >HERE</span>

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
                                                if (res.data.success == true) {
                                                    const data = { "AuthToken": res.data.AuthToken, "role": res.data.user.role };
                                                    setCookies("user", JSON.stringify(data), { path: "/" });

                                                    if (res.data.user.role == "teacher") {

                                                        setUser({ logedin: true, user: res.data.user });
                                                        alert.show("welcome " + res.data.user.firstname);
                                                        navigate("/teacher/dashboard");


                                                    } else if (res.data.user.role == "student") {
                                                        setUser({ logedin: true, user: res.data.user });
                                                        alert.show("welcome " + res.data.user.firstname);



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
