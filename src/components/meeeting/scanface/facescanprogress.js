import React from 'react'
import CustomPopup from '../../joinmeeting-popup1'
import { useState } from 'react';

export default function Scanface() {
  const [visibility, setVisibility] = useState(true);

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  return (
    <CustomPopup
    onClose={popupCloseHandler}
    show={visibility}
    title="Face Recognition"
    msg="Please Open WebCam to get your face Scaned and verify your identity"
    btntxt="Scan Now"
  />
    

  );
}
