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

export default function CallPage() {


  //runnig socketio on diffrent server port 
  var socket = socketClient("http://localhost:4001");
  const params = useParams();
  const meetingid = params.id;
  console.log(meetingid);

  const peer = new Peer(undefined, {
    host: "localhost",
    port: "4000",
    path: "/peerjs"
  });




  const videoRef = useRef(null);
  const userVideoRef = useRef(null);



  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();

        socket.on("user-connected", (userid, stream) => {
          console.log(stream);
          setTimeout(connectToNewuser ,3000,userid ,stream  );
        });



      })
      .catch(err => {
        console.error("error:", err);
      });
  };



  const connectToNewuser = (userid, stream) => {
    console.log("user joined hving id " + userid);
console.log(stream);
    var call = peer.call(userid, stream);
    
    call.on('stream', userVideoStream => {
      let a = userVideoRef.current;
      a.srcObject = userVideoStream;
      a.play();
    });






  }


  useEffect(() => {
    socket.on("connection", () => {

      peer.on("open", (id) => {
        socket.emit("join-room", meetingid, id);

      });

      peer.on("call", (call) => {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia({ video: true }, (stream) => {
          call.answer(stream);
        });
      });
    });





  }, [socket])












  useEffect(() => {
    getVideo();
  }, [videoRef])






  return (


    <div className='callpage-container'>
      <div className='video-grid' id='vid'>
        <video ref={videoRef} className="video-container" />
        <video ref={userVideoRef} className="video-container" controls />


      </div>


      {/* <MeetingHeader />
      <MeetingInfo />
      <MeetingFooter />
      <MeetingMessages /> */}
    </div>
  )
}
