import React from 'react'
import MeetingHeader from '../meetingheader/meetingheader';
import MeetingFooter from '../meetingfooter/meetingfooter';
import MeetingInfo from '../meetinginfo/meetinginfo';
import MeetingMessages from '../meetingmessages/meetingmessages';
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
