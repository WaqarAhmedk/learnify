import React, { useContext } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'react-bootstrap';


export default function AllStudents(props) {

  const alert = useAlert();
  const [cookies] = useCookies();
  const [admins, setAdmins] = useState([]);
  const [showdelete, setShowDelete] = useState(false);
  const [idtoapprove, setIdtoApprove] = useState();
  const [adminemail, setAdminEmail] = useState("");


  const getAllAdmins = () => {
    axios
      .get("/get-all-admins", {
        headers: {
          'admin-auth-token': cookies.user.AuthToken

        }
      })
      .then((res) => {
        console.log(res.data);
        setAdmins(res.data.admins)

      })
      .catch(err => console.error(err));
  }
  useEffect(() => {
    getAllAdmins()
  }, [])





  return (<>


    <table className="table table-striped">
      <tbody>

        <tr>
          <th>User Id</th>
          <th>Full Name</th>
          <th>User Email</th>

          <th>Action</th>




        </tr>
        {

          admins.length > 0 ? <>
            {
              admins.map((admin, index) => {
                return <tr key={index}>

                  <td>{admin._id}</td>
                  <td>{admin.name}</td>

                  <td>{admin.email}</td>

                  <td><button className='btn btn-primary btn-sm'>Approve</button></td>



                </tr>
              })
            }
          </> : <tr></tr>

        }


      </tbody>
    </table>
    <Modal show={showdelete}>
      <ModalHeader>Remove Teacher {adminemail} </ModalHeader>
      <ModalBody>
        <span className='d-block'>Are You sure You want to Approve this Admin ? </span>
        <span className='btn-warning '>This action cannot be undone</span>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-primary ' onClick={(e) => {

          e.preventDefault();
          axios
            .post("/approve-admin/adminid" + idtoapprove, {}, {
              headers: {
                'admin-auth-token': cookies.user.AuthToken

              }
            })
            .then((res) => {
              console.log(res.data);

              if (res.data.success) {
                alert.success(res.data.message);
                setShowDelete(false)
              }
              else {
                alert.info(res.data.message)

              }

            })
            .catch(err => console.error(err));


        }}>Remove Teacher</button>
        <button className='btn btn-secondry ' onClick={() => {
          setAdminEmail("");
          setIdtoApprove("");
          setShowDelete(false);

        }}>cancel</button>

      </ModalFooter>
    </Modal>

  </>)
}
