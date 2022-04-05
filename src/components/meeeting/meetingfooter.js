import React from 'react';
import "./meetingfooter.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPhone, faAngleUp, faClosedCaptioning, faDesktop, faMicrophoneSlash, faVideo } from '@fortawesome/free-solid-svg-icons';

export default function MeetingFooter() {
  return (
    <div className='meeting-footer-container'>

      <div className='meeting-footer-left-item'>
        <div >
        <span>  Meeting Details</span>
          <FontAwesomeIcon icon={faAngleUp} className="meeting-footer-icon" />
        </div>
      </div>


      <div className='meeting-footer-center-item'>
        <div className='meeting-footer-icon-block'>
          <FontAwesomeIcon icon={faMicrophone} className="icon" />
        </div>
        <div className='meeting-footer-icon-block'>
          <FontAwesomeIcon icon={faPhone} className="icon red" />
        </div>
        <div className='meeting-footer-icon-block'>
          <FontAwesomeIcon icon={faVideo} className="icon" />
        </div>

      </div>


      <div className='meeting-footer-right-item'>
        <div className='meeting-footer-icon-block-right'>
          <FontAwesomeIcon icon={faClosedCaptioning} className="icon red" />
          <p>Turn on captions</p>
        </div>
        <div className='meeting-footer-icon-block-right'>
          <FontAwesomeIcon icon={faDesktop} className="icon red" />
          <p>Present now</p>
        </div>
      </div>
    </div>
    
  )
}
