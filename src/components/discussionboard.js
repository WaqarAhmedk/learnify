import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import socketClient from "socket.io-client";
import { UserContext } from '../context/usercontext';






export default function Discussionboard(props) {

  const [user] = useContext(UserContext);
  const role = user.user.role;
  const courseid = props.courseid;
  var socket = socketClient("http://localhost:4001", { query: { courseid } });



  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [cookies, Setcookies] = useCookies();





  let sender;


  if (role === "teacher") {
    sender = cookies.user.AuthToken;

  }
  else if (role === "student") {
    sender = cookies.user.AuthToken;
  }
  useEffect(() => {

    socket.on("connection", (data) => {
      console.log("you are connected with chat" + data);

      socket.emit("load_message", {
        discussion: courseid,
      });


      socket.on("early_messages", (data) => {
        setMessages(data)
      });

    });
    socket.on("receive_message", (data) => {

      if (data.success === false) {
        console.log("something bad happend ");
        console.log(data);

      }
      else {
        setMessages((messages) => [...messages, data])

      }
    });



  }, [])

  return (
    <div>
      <div>
        <div className="panel-body">

          {
            messages.length < 1 ? "PLease send a messgae nothing to show" :
              messages.map((message) => {
                return <div key={message._id} className="">


                  {
                    message.sender._id === user.user._id ?
                      <div className="text-end">

                        <div className="chat-body clearfix">
                          <div className="header">

                            <div className='d-inline'>
                              <div className='d-inline'>
                                <small className='me-3'>{message.createdAt}</small>

                                {

                                  message.sender_type === "teacher" ?
                                    <strong className="primary-font text-success">{message.sender.firstname}</strong>
                                    : <strong className="primary-font">{message.sender.firstname}</strong>
                                }
                              </div>
                              <img src={require("../assets/avatar/"+message.sender.avatar)} className="rounded-circle" style={{ width: "30px", height: "30px" }} />

                            </div>
                          </div>
                          <p>
                            {
                              message.message
                            }

                          </p>

                        </div>
                      </div> : <div className="chat-body clearfix">

                        <div className="header">
                        <img src={require("../assets/avatar/"+message.sender.avatar)} className="rounded-circle" style={{ width: "30px", height: "30px" }} />

                          {

                            message.sender_type === "teacher" ?
                              <strong className="primary-font text-success ms-1">{message.sender.firstname}</strong>
                              : <strong className="primary-font ms-1">{message.sender.firstname}</strong>
                          }
                          <small className='ms-3'>{message.createdAt}</small>
                        </div>
                        <p className='ms-4'>
                          {
                            message.message
                          }

                        </p>


                      </div>
                  }

                </div>
              })

          }




        </div>
      </div>
      <div>
        <div className="panel-footer">
          <div className="input-group">
            <input type="text" className="form-control input-sm" value={message} placeholder="Type your message here..." onChange={(e) => {
              setMessage(e.target.value);
            }} />
            <span className="input-group-btn">
              <button className="btn btn-warning btn-md" id="btn-chat" onClick={(e) => {
                e.preventDefault();
                if (message === "") {
                  console.log("type a  message plese");
                }
                else {
                  socket.emit("send_message", {
                    role, sender, message, courseid
                  });
                  setMessage("");
                }

              }}>
                Send</button>
            </span>
          </div>
        </div>      </div>
    </div>
  )
}
