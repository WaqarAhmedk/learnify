import React, { useRef } from 'react'
import MeetingHeader from '../meetingheader/meetingheader';
import MeetingFooter from '../meetingfooter/meetingfooter';
import MeetingInfo from '../meetinginfo/meetinginfo';
import MeetingMessages from '../meetingmessages/meetingmessages';
import "./callpage.css";
import { useEffect } from 'react';
import socketClient from "socket.io-client";
import { useLocation, useParams } from 'react-router-dom';
import Peer from "peerjs"
import { UserContext } from '../../../context/usercontext';
import { useContext } from 'react';
import { useAlert } from 'react-alert';


export default function CallPage() {

  const [user] = useContext(UserContext);
  const alert = useAlert();




  //runnig socketio on diffrent server port 
  var socket = socketClient("http://localhost:4001");
  const params = useParams();
  const meetingid = params.id;

  const peer = new Peer(undefined, {
    host: "localhost",
    port: "4000",
    path: "/peerjs"
  });




  // getting my own video and appending it
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(stream => {
      const myvideo = document.createElement("video");
      myvideo.setAttribute("id", "myvid");

      addVideoStream(myvideo, stream)
    })
    .catch(err => {
      console.error("error:", err);
    });





  const addVideoStream = (video, stream, userid) => {

    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("vid").appendChild(video);


  }

  // get joined suer media and connect a call 
  const connectToNewUser = (userid) => {
    console.log("user joined hving id " + userid);
    var getUserMedia = navigator.getUserMedia;

    getUserMedia({ audio: true, video: true }, (stream) => {
      var call = peer.call(userid, stream);
      console.log("calling");
      const video = document.createElement("video");
      video.setAttribute("id", userid)

      call.on('stream', userVideoStream => {
        console.log("dskj");

        addVideoStream(video, userVideoStream);

      });


      // call.on("close", (userid) => {
      //   console.log("asked");
      //   document.getElementById(userid).remove();
      //   video.remove();
      // })

    })

  }




  socket.on("connection", () => {


    peer.on("open", (id) => {
      console.log("connectionn opened");
      socket.emit("join-room", meetingid, user.user._id);
    });

  });

  socket.on("user-connected", (user) => {
    alert.info("New user" + user.firstname + " joined the meeting")
    connectToNewUser(user._id)
  });

  peer.on("call", (call) => {
    console.log("on called");
    var getUserMedia = navigator.getUserMedia;
    getUserMedia({ video: true }, (stream) => {
      const video = document.createElement("video")
      call.answer(stream);
      call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
      });


      call.on("close", () => {
        console.log("asked");
        video.remove();
      })
    });
  });


















  // useEffect(() => {
  //   getVideo();
  // }, [videoRef])






  return (


    <div className='callpage-container'>
      <div className='video-grid' id='vid'>


      </div>


      {/* <MeetingHeader />
      <MeetingInfo />
      <MeetingFooter />
      <MeetingMessages /> */}
    </div>
  )
}
