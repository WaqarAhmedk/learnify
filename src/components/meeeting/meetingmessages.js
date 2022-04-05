import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUserFriends, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./messenger.css"
export default function MeetingMessages() {
  return (
    <div className='meeting-messenger-container'>

      <div className='messenger-header'>
        <h3>Meeting details</h3>
        <FontAwesomeIcon icon={faTimes} className="icon" />
      </div>

      <div className='messenger-header-tabs'>
        <div className='tab'>
          <FontAwesomeIcon icon={faUserFriends} className="icon" />
          <p>people 1</p>
        </div>
        <div className='tab-open'>
          <FontAwesomeIcon icon={faCommentAlt} className="icon" />
          <p>Chat</p>
        </div>
      </div>

      <div className='chat-section'>
        <div className='chat-block'>
          <div className='sender'>
            you <small>10pm</small>
            <p>Here is actual message</p>
          </div>
        </div>


      </div>

      <div className='send-msg-section'>
        <input placeholder='enter message to send'/>

          <FontAwesomeIcon icon={faPaperPlane} className="icon" />

      </div>
    </div>
  )
}
