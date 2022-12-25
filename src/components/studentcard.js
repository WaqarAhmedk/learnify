import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';

export default function Studentcard(props) {
  const[cookies]=useCookies();
const alert=useAlert();

  return (

    <>
      <br />
      <div class="alert alert-info text-center" role="alert">
        Student Found!
      </div>
      <br />

      <div className='text-center'>
        <div className="cardstyle">
          <img src={require("../assets/avatar/"+props.image)} className="card-img-top w-25" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.fname+" "+props.lname}</h5>

            <table className="table table-success table-striped">

              <tr>

                <th>First Name</th> <th>Lastname</th> <th>Email</th>
              </tr>

              <tr>

                <td>{props.fname}</td> <td>{props.lname}</td> <td>{props.email}</td>
              </tr>


            </table>
            <button className="btn btn-primary" onClick={() => {
              axios
                .post("/enroll-student/" + props.courseid, {
                  studentid: props.std_id
                },{
                  headers:{
                    'teacher-auth-token': cookies.user.AuthToken

                  }
                })
                .then((res) => {
                  if(res.data.success===true){
                    alert.success(res.data.msg);
                    props.onHide();
                  }
                  else{
                    alert.info(res.data.msg);
                    props.onHide();
                  }
                })
                .catch(err => console.error(err));
            }}>Enroll Now</button>
          </div>
        </div>
      </div>
    </>
  )
}
