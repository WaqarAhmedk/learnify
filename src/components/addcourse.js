import React ,{useState}from 'react'
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Addcourse(){

    const navigate = useNavigate();
  
    let [subj, setSubj] = useState("");
    let [subjdesc, setSubjdesc] = useState("");
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
                            <input className="" type="text"  placeholder='Your course title' onChange={(e) => {
                                setSubj(e.target.value);
                            }} />

                        </div>
                        <div className="row email-div">
                            <label className="">Description</label>
                            <input className="" type="text" placeholder='Your course Description' onChange={(e) => {
                                setSubjdesc(e.target.value);
                            }} />
                         
                        </div>

                        <div className="signup-btn">
                            <div className="row">

                                <div className="form-btn-group">
                                    <input className="btn btn-primary " type="submit" value="Insert Course" onClick={(e) => {
                                        e.preventDefault();


                                        axios.post("http://localhost:4000/createsub", {
                                            subjectname: subj,
                                            subjectdesc: subjdesc
                                        }).then((response) => {
                                                if (response.status === 200) {

                                                    navigate("/dashboard");
                                                }
                                                else {
                                                    // console.log(response);
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
