import Formcolumn from "../../components/inputfieldcomp";
import { useState } from "react";

import "../../style/login.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";




function Signup() {

    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");






    var navigate = useNavigate();

    //getting data of role from moto page through navigate method params

    const state = useLocation();

    const role = state.state.role;





    function SignupClick() {

        navigate("/signin");
    }

    return <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


        <div className="signup-form-inner-div row">

            <div className="col-5 logo-div">

                <span className="signup-logo-learnify">Learnify</span>
                <span>Sign Up for Free! </span>
                <br />
                <span> as a {role}</span>
            </div>
            <div className="col-6 signup-form">
                <form>
                    <div className="row form ">
                        <div className="form-label-1">
                            <label className="col">First Name  {fname}</label>
                            <label className="col">Last Name</label>
                        </div>
                        <div className="form-input-1">
                            <input className="col" type="text" value={fname} placeholder="WAQAR" onChange={(e)=>{
                                
                              
                            

                            }} />

                            <input className="col" type="text" placeholder="Ahmed" />
                        </div>
                    </div>
                    <div className="row email-div">
                        <label className="">Email</label>
                        <input className="" type="email" />

                    </div>
                    <div className="row form ">
                        <div className="form-label-1">
                            <label className="col">Password</label>
                            <label className="col">Upload Pictures</label>
                        </div>
                        <div className="form-input-1">
                            <input className="col" type="text" placeholder="WAQAR " />

                            <input className="col" type="text" placeholder="Ahmed" />
                        </div>
                    </div>
                    <div className="signup-btn">
                        <div className="row">

                            <div className="form-btn-group">
                                <input className="btn btn-primary " value="SIGN UP" type="submit" />
                                <a className="g-logo-link" href="/">
                                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                                    Signup Using Google
                                </a>

                            </div>
                        </div>

                    </div>

                </form>
            </div>



        </div>



    </div>
}

export default Signup;