
import Formcolumn from "../../components/inputfieldcomp";
import "../../style/login.css"


function Login() {

    return <div className=" d-flex align-items-center justify-content-center " id="formdiv">

        <form id="lgin" className="text-center border border-primary p-5 mt-5"  >
            <h1>Welcome </h1>
            <Formcolumn placeholder="Your User Name" />
            <Formcolumn placeholder="Your Password" type="password" />
            <Formcolumn value="Login" type="submit" />
            <span className="">or new to the app</span>
            <br/>
            <button  className="btn btn-primary mt-2">Click here to Register</button>
        </form>
    </div>
}

export default Login;