
import Formcolumn from "../../components/inputfieldcomp";
import "../../style/login.css"


function Login() {

    return <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


    <div className="signup-form-inner-div row">


        <div className="col-5 logo-div">

            <span className="signup-logo-learnify">Learnify</span>
            <span>Sign Up for Free!</span>
        </div>
        <div className="col-6 signup-form">
            <form>
                <div className="row email-div">
                    <label className="">Email</label>
                    <input className="" type="email" />

                </div>
                <div className="row email-div">
                    <label className="">Password</label>
                    <input className="" type="password"  placeholder="****"/>

                </div>
        
                <div className="signup-btn">
                    <div class="row">

                        <div class="form-btn-group">
                            <input className="btn btn-primary " type="submit" value="SIGN IN" />
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

export default Login;