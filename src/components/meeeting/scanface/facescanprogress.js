import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import "./facescanprogress.css"



const CustomPopupShowFace = () => {
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
      <div className="popups">
        <span className="popup close" onClick={closeHandler}>
          &times;
        </span>
        <div className="camera-scan">

        </div>
        <div className="camera-scan-progress">
          Facial Scan in Progress
        </div>

      </div>

    </div>
    </>
  );
};


export default CustomPopupShowFace;