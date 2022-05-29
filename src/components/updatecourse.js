import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const uri = "http://localhost:4000/subj/id";

export default function UpdateCourse() {

    const navigate = useNavigate();
    let state = useLocation();
    let id = state.state.id;
    let [subj, setSubj] = useState("");
    let [subjdesc, setSubjdesc] = useState("");

    let[data,setData]=useState({});

    useEffect(() => {
        axios
            .post(uri, {
                id:id
            })
            .then((res) => {
                console.log(res.data);
             
                setSubj(res.data[0].subjectname);
                setSubjdesc(res.data[0].subjectdesc);
                
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <div className=" d-flex align-items-center justify-content-center" id="signup-form-div">


            <div className="signup-form-inner-div row">


                <div className="col-5 logo-div">

                    <span className="signup-logo-learnify">Learnify</span>
                    <span>Add Your course here </span>
                </div>
                <div className="col-6 signup-form  login-div">
                    <form className="login-form">
                        <div className="row email-div">
                            <label className="">SubjTitle</label>
                            <input className="" type="text" value={subj} placeholder='Your course title' onChange={(e) => {
                                setSubj(e.target.value);
                            }} />

                        </div>
                        <div className="row email-div">
                            <label className="">Description</label>
                            <input className="" type="text" value={subjdesc} placeholder='Your course Description' onChange={(e) => {
                                setSubjdesc(e.target.value);
                            }} />

                        </div>

                        <div className="signup-btn">
                            <div className="row">

                                <div className="form-btn-group">
                                    <input className="btn btn-primary "  value="Update Course" onClick={(e) => {
                                        e.preventDefault();


                                        axios.post("http://localhost:4000/updatec", {
                                            subjectname: subj,
                                            subjectdesc: subjdesc
                                        }).then((response) => {
                                            if (response.status === 200) {

                                              return  navigate("/dashboard");
                                            }
                                            
                                        })
                                            .catch(err => console.log(err));




                                    }} />


                                </div>
                            </div>

                        </div>

                    </form>
                </div>



            </div>



        </div>
    )
}
