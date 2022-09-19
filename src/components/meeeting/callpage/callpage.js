import React, { useRef } from 'react'
import MeetingHeader from '../meetingheader/meetingheader';
import MeetingFooter from '../meetingfooter/meetingfooter';
import MeetingInfo from '../meetinginfo/meetinginfo';
import MeetingMessages from '../meetingmessages/meetingmessages';
import "./callpage.css";
import { useEffect } from 'react';


export default function CallPage() {
  const videoref = useRef(null);


  const videoRef = useRef(null);


  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

useEffect(()=>{
  getVideo();
},[videoRef])



  const getvideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: { width: 300 },
      audio: true,

    }).then((stream) => {
      let video = videoref.current;
      video.srcObject = stream;
      video.play();
    })
  }


  return (
    <div>
      <button>Take a photo</button>
      <video ref={videoRef} />
      <canvas />
    </div>

    // <div className='callpage-container'>

    //   {/* <video className='video-container' ref={videoref} >
    //   </video> */}

    //   {/* <MeetingHeader />
    //   <MeetingInfo />
    //   <MeetingFooter />
    //   <MeetingMessages /> */}
    // </div>
  )
}
