import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../style/enrolledclasses.css";
import SingleClass from "./classes/singleclasscomponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";



function Dashboard() {
  const [subj, setSubj] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:4000/subj")
      .then((res) => {
        setSubj(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>




    <div id="class-container"  >

      <div className="d-flex hd" >
        <h1 className="col-6 " >Enrolled classes</h1>

        <div className="form-group has-search searchdiv">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control in-field" placeholder="Search" />
        </div>
        <FontAwesomeIcon icon={faPlus} className="text-light display-5" onClick={() => {
          navigate("/addcourse");
        }} />

      </div>


      <div id="class-container-content" className="row">
        {

          subj.map((item) => {
            let id = item._id;
            return <SingleClass key={id} id={id} subjname={item.subjectname} subjdesc={item.subjectdesc} imgsrc={require("../assets/images/images.png")} />

          })



        }


      </div>
    </div>


    

  </>
}
export default Dashboard;