
import "../../style/login.css"
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();
    return <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


        <div className="signup-form-inner-div row">


            <div className="col-5 logo-div">

                <span className="signup-logo-learnify">Learnify</span>
                <span>Sign in and start learnig Now</span>
            </div>
            <div className="col-6 signup-form  login-div">
                <form className="login-form">
                    <div className="row email-div">
                        <label className="">Email</label>
                        <input className="" type="email" />

                    </div>
                    <div className="row email-div">
                        <label className="">Password</label>
                        <input className="" type="password" placeholder="********" />

                    </div>

                    <div className="signup-btn">
                        <div className="row">

                            <div className="form-btn-group">
                                <input className="btn btn-primary " type="submit" value="SIGN IN" onClick={(e) => {
                                    e.preventDefault();


                                    //pasing the role to check the logged in person is instructor or student
                                    navigate("/dashboard", { state: { role: "instructor" } });

                                }} />
                                <a className="g-logo-link" href="/">
                                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" />
                                    SignIn Using Google
                                </a>

                            </div>
                        </div>

                    </div>

                </form>
            </div>



        </div>



    </div>

}

export default Login;