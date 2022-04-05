import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faUser, faClipboard, faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import "./meetinginfo.css"
export default function MeetingInfo() {
  return (
    <div className='meeting-info-container'>

      <div className='meeting-info-header'>

        <h4>Your meeting is ready</h4>
        <FontAwesomeIcon className='meeting-info-icon' icon={faCircleXmark} />

      </div>
      <button className='add-others-btn'>
        <FontAwesomeIcon className='meeting-info-icon' icon={faUser} />
        Add Others</button>
      <p className='meeting-info-text'>Share this meeting link with others</p>

      <div className='meeting-url-info'>
        <span>Some random url</span>
        <FontAwesomeIcon className='meeting-info-icon' icon={faClipboard} />
      </div>
      <div className='permission-text'>
        <FontAwesomeIcon className='meeting-info-icon' icon={faShieldAlt} />
        <p className='sml-txt'>some trandom text kskdsjk</p>
      </div>
      <p className='sml-txt'>joined as Waqar Ahmed</p>

    </div>
  )
}
