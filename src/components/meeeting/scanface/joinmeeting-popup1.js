import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import "./meeting-custompopup.css"



const CustomPopup = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(true);





  const closeHandler = (e) => {
    setShow(false);

  };



  return (
    <>
   <Header />
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? "1" : "0"
        }}
        className="overlay"
      >
        <div className="popup">
          <span className="popup close" onClick={closeHandler}>
            &times;
          </span>
          <h2>Face Recognition </h2>

          <h3>Please Open WebCam to get your face Scaned and verify your identity</h3>
          <button className="btn btn-primary" onClick={() => {
            navigate("/showface");
          }}>ScanNow</button>
        </div>
      </div>
    </>
  );
};


export default CustomPopup;