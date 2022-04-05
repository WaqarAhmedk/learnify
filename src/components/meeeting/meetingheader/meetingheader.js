import React from 'react'
import "./meetingheader.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faUser, faMessage } from "@fortawesome/free-solid-svg-icons";

export default function MeetingHeader() {
  return (
    <div className='meeting-header-frame'>

      <div className='icon-block'>
        <FontAwesomeIcon icon={faUserFriends} className="header-icon" />

      </div>
      <div className='icon-block'>
        <FontAwesomeIcon icon={faMessage} className="header-icon" />
        <span className='message-alert-icon'></span>
      </div>
      <div className='icon-block'>
        <span className='date-block'>   1 :45 pm</span>

      </div>
      <div className='icon-block'>
        <FontAwesomeIcon icon={faUser} className="header-icon meeting-profile" />

      </div>
    </div>


  )
}
