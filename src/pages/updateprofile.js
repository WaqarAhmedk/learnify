import React from 'react'
import { UserContext } from '../context/usercontext'
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';




export default function UpdateProfile() {

    const [user, setUser] = useContext(UserContext);
    const [cookies] = useCookies();
    const alert = useAlert();
    const navigate = useNavigate();

    let [fname, setfname] = useState("");
    let [fnameerror, setfnameerror] = useState("");


    let [lname, setlname] = useState("");
    let [lnameerror, setlnameerror] = useState("");

    let [email, setemail] = useState("");
    let [emailerror, setemailerror] = useState("");

    let [newemail, setNewemail] = useState("");
    let [newemailerror, setNewemailError] = useState("");


    let [password, setpassword] = useState("");
    let [passworderror, setpassworderror] = useState("");

    let [newpassword, setNewpassword] = useState("");
    let [newpassworderror, setNewpassworderror] = useState("");

    let [confirmpassword, setConfirmpassword] = useState("");
    let [confirmpassworderror, setConfirmpassworderror] = useState("");

    const [image, setImage] = useState();
    const [imageerror, setImageError] = useState("");

    let [formerror, setformerror] = useState("");
    const [role, setRole] = useState("student");
    useEffect(() => {

      if(cookies.user.role==="student"){
        axios
        .get("/getstudent", {
            headers: {
                "student-auth-token": cookies.user.AuthToken
            }
        })
        .then((res) => {
            setfname(res.data.firstname);
            setlname(res.data.lastname);
            setemail(res.data.email);
            setNewemail(res.data.email);
            setpassword("**************");

        })
        .catch(err => console.error(err));
      }else{
        axios
        .get("/getteacher", {
            headers: {
                "teacher-auth-token": cookies.user.AuthToken
            }
        })
        .then((res) => {
            setfname(res.data.firstname);
            setlname(res.data.lastname);
            setemail(res.data.email);
            setNewemail(res.data.email);
            setpassword("**************");

        })
        .catch(err => console.error(err));
      }
    }, [])

    return <div className="">{
        console.log(newemail)
    }
        <center className="">


            <div className="card w-75">
                <div className="card-body">
                    <div className="e-profile">
                        <div className="row">
                            <div className="col-12 col-sm-auto mb-3">
                                <div className="mx-auto" style={{ width: "140px" }}>
                                    <div className="d-flex justify-content-center align-items-center rounded" style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}>
                                        {
                                            user.logedin ? <img src={require(`../assets/avatar/${user.user.avatar}`)} style={{ width: "144px", height: "144px" }} /> : ""

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                <div className="text-center text-sm-left mb-2 mb-sm-0">
                                    <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{user.user.firstname + " " + user.user.lastname}</h4>
                                    <p className="mb-0">{user.user.email}</p>
                                    <div className="mt-2">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fa fa-fw fa-camera"></i>
                                            <span>Change Photo</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center text-sm-right">
                                    <span className="badge-primary">{user.user.role}</span>
                                    <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content pt-3">
                            <div className="tab-pane active">
                                <form className="form" novalidate="">
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input className="form-control" type="text" value={fname} onChange={(e) => {
                                                            setfname(e.target.value);
                                                        }} />
                                                    </div>
                                                    <span className="col error">{fnameerror}</span>
                                                </div>
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input className="form-control" type="text" value={lname} onChange={(e) => {
                                                            setlname(e.target.value);
                                                        }} />
                                                    </div>
                                                    <span className="col error">{lnameerror}</span>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input className="form-control" autoComplete='off' type="email" value={newemail} onChange={(e) => {
                                                            setNewemail(e.target.value);
                                                        }} />
                                                    </div>
                                                    <span className="col error">{newemailerror}</span>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 mb-3">
                                            <div className="mb-2"><b>Change Password</b></div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Current Password</label>
                                                        <input className="form-control" type="password" value={password} onChange={(e) => {
                                                            setpassword(e.target.value);
                                                        }} />
                                                    </div>
                                                    <span className="col error">{passworderror}</span>

                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input className="form-control" type="password" value={newpassword} onChange={(e) => {
                                                            setNewpassword(e.target.value)
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                                        <input className="form-control" type="password" value={confirmpassword} onChange={(e) => {
                                                            setConfirmpassword(e.target.value)
                                                        }} /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="col error">{newpassworderror}</span>


                                    </div>
                                    <div className="row">
                                        <div className="col d-flex justify-content-end">
                                            <button className="btn btn-primary" onClick={(e) => {
                                                e.preventDefault();


                                                if (fname === "") {
                                                    setfnameerror("Please provide First name")

                                                } else if (lname === "") {
                                                    setlnameerror("Please Provide Last name")
                                                } else if (newemail === "") {
                                                    setNewemailError("Please Provide a email")
                                                } else if (password === "") {
                                                    setpassworderror("Please provide your Current Password")
                                                } else if (newpassword !== confirmpassword) {
                                                    setNewpassworderror("New Password and Confirm Password are not same ")
                                                }
                                                else {
                                                    if (cookies.user.role === "student") {
                                                        axios
                                                            .post("/update-profile", {
                                                                firstname: fname,
                                                                lastname: lname,
                                                                newemail: newemail,
                                                                currentemail: email,
                                                                currentpassword: password,
                                                                newpassword: newpassword
                                                            }, {
                                                                headers: {
                                                                    "student-auth-token": cookies.user.AuthToken
                                                                }
                                                            })
                                                            .then((res) => {
                                                                if (res.data.success === true) {
                                                                    setUser({
                                                                        logedin: true,
                                                                        user: res.data.user
                                                                    })
                                                                    alert.success(res.data.msg);
                                                                    navigate("/dashboard")
                                                                    setfnameerror("");
                                                                    setlnameerror("");
                                                                    setNewemailError("");
                                                                    setpassworderror("");
                                                                    setNewpassworderror("")

                                                                }
                                                                else {
                                                                    alert.error(res.data.msg)
                                                                }
                                                            })
                                                            .catch(err => console.error(err));
                                                    } else if (cookies.user.role === "teacher") {
                                                        axios
                                                            .post("/update-teacher-profile", {
                                                                firstname: fname,
                                                                lastname: lname,
                                                                newemail: newemail,
                                                                currentemail: email,
                                                                currentpassword: password,
                                                                newpassword: newpassword
                                                            }, {
                                                                headers: {
                                                                    "teacher-auth-token": cookies.user.AuthToken
                                                                }
                                                            })
                                                            .then((res) => {
                                                                if (res.data.success === true) {
                                                                    setUser({
                                                                        logedin: true,
                                                                        user: res.data.user
                                                                    })
                                                                    alert.success(res.data.msg);
                                                                    navigate("/teacher/dashboard")
                                                                    setfnameerror("");
                                                                    setlnameerror("");
                                                                    setNewemailError("");
                                                                    setpassworderror("");
                                                                    setNewpassworderror("")

                                                                }
                                                                else {
                                                                    alert.error(res.data.msg)
                                                                }
                                                            })
                                                            .catch(err => console.error(err));
                                                    }


                                                }








                                            }}>Save Changes</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    </div >

}
