import React from 'react'
import { useState } from 'react'
import axios, { Axios } from "axios";
import { useCookies } from 'react-cookie';

export default function Studentcard(props) {


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
            <button className="btn btn-primary">Enroll Now</button>
          </div>
        </div>
      </div>
    </>
  )
}
