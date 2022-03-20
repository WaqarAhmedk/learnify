import Formcolumn from "../../components/inputfieldcomp";

import  "../../style/login.css";





function Signup() {

    return <div className=" d-flex align-items-center justify-content-center" id="formdiv">
      

    <form id="lgin" className="text-center border border-primary p-5 mt-5"  >
        <h1>Welcome </h1>
        <Formcolumn placeholder="Your Email " />
        <Formcolumn placeholder="Your Password" type="password" />
        <Formcolumn placeholder="Re-type password" type="password"/>
        <Formcolumn value="Sign up" type="submit" />
        <span className="btn-secondary"> Already have Account ?</span>
        <br/>
            <button className="btn btn-primary mt-3">Click here to Login</button>
    </form>
</div>
}

export default Signup;