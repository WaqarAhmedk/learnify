import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useCookies } from 'react-cookie';

export default function Studentcard(props) {
  const[cookies]=useCookies();


  return (

    <>
      <br />
      <div class="alert alert-info text-center" role="alert">
        Student Found!
      </div>
      <br />

      <div className='text-center'>
        <div className="cardstyle">
          <img src={props.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>

            <table className="table table-success table-striped">

              <tr>

                <th>First Name</th> <th>Lastname</th> <th>Email</th>
              </tr>

              <tr>

                <td>{props.title}</td> <td>Dummy</td> <td>{props.email}</td>
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
                  console.log(res.data);
                })
                .catch(err => console.error(err));
            }}>Enroll Now</button>
          </div>
        </div>
      </div>
    </>
  )
}
