
import "../../style/login.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { users } from "../../models/users";
import Header from "../../components/header";
import Navbarmain from "../mainnavbar";
import  axios from 'axios';


function Login() {

    let [error, seterror] = useState("");
    let [useremail, setuseremail] = useState("");
    let [userpassword, setuserpassword] = useState("");





    const navigate = useNavigate();
    return<>
    <Navbarmain />
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

                    <div className="signup-btn">
                        <div className="row">

                            <div className="form-btn-group">
                                <input className="btn btn-primary " type="submit" value="SIGN IN" onClick={(e) => {
                                    e.preventDefault();


                                    axios.post("http://localhost:4000/signin",{
                                        email:useremail,
                                        password:userpassword
                                    })
                                    .then(console.log("data sent"))
                                    .catch(err=>console.log(err));

                                    // users.map((user) => {
                                    //     if (user.email === useremail && user.password === userpassword) {
                                    //         //pasing the role to check the logged in person is instructor or student
                                    //         navigate("/dashboard", { state: { role: user.role, userid: user.uid } });
                                    //     }
                                    //     else {
                                    //         seterror("User Email or Password is Wrong");
                                    //     }
                                    // })


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