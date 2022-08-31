import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';



export default function Discussionboard(props) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [cookies, Setcookies] = useCookies();

  let sender = "";

  const role = props.role;
  const courseid = props.courseid;
  if (role === "teacher") {
    sender = cookies.teacherAuth

  }
  else if (role === "student") {
    sender = cookies.StudentAuth;
  }

  // const loadmessages = () => {
  //   socket.emit("load_message", {
  //     discussion: courseid,
  //   })

  // }

 


  return (
    <div>
      <div>
        <div className="panel-body">

          {
            messages.length < 1 ? "PLease send a messgae nothing to show" :
              messages.map((message) => {
                return <div className="">
                  <div className="chat-body clearfix">
                    <div className="header">
                      <strong className="primary-font">{message.sender.firstname}</strong> <small className="pull-right text-muted">
                        <span className="glyphicon glyphicon-time"></span>12 mins ago</small>
                    </div>
                    <p>
                      {
                        message.message
                      }
                    </p>
                  </div>
                </div>
              })

          }


          <div className="text-end">

            <div className="chat-body clearfix">
              <div className="header">
                <strong className="primary-font">Jack Sparrow</strong>
                <small className="text-muted ms-2">12 mins ago</small>
              </div>
              <p>
                hy
              </p>
            </div>
          </div>

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
              }}>
                Send</button>
            </span>
          </div>
        </div>      </div>
    </div>
  )
}
