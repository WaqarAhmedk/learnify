import React from 'react'
import MeetingHeader from '../meetingheader';
import MeetingFooter from '../meetingfooter';
import MeetingInfo from '../meetinginfo';
import MeetingMessages from '../meetingmessages';
import "./callpage.css"

export default function CallPage() {
  return (
    <div className='callpage-container'>
      <video className='video-container' src='' controls>
      </video>
      <MeetingHeader />
      <MeetingInfo />
      <MeetingFooter />
      <MeetingMessages />
    </div>
  )
}
