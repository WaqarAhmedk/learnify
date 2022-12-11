import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from 'react-router-dom';
import "./callpage.css"
import "../meetingfooter/meetingfooter.css"
import { useAlert } from 'react-alert';
import { UserContext } from "../../../context/usercontext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneAltSlash, faPhone, faExpand, faAngleUp, faClosedCaptioning, faDesktop, faMicrophoneSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';












const Video = (props) => {





  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {

      ref.current.srcObject = stream;
    });
  }, []);

  return <>
    <video className="others-video" playsInline autoPlay ref={ref} />

  </>
}



const Room = (props) => {
  const [user] = useContext(UserContext);
  const [peers, setPeers] = useState([]);
  const [users, setUsers] = useState({});
  const [audioFlag, setAudioFlag] = useState(true);
  const [videoFlag, setVideoFlag] = useState(true);
  const [userUpdate, setUserUpdate] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const params = useParams();
  const roomID = params.id;
  const alert = useAlert();
  const [cookies]=useCookies();
  const navigate=useNavigate();

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,

  };


  useEffect(() => { }, [user])

  const username = user.user.firstname + " " + user.user.lastname;


  useEffect(() => {

    socketRef.current = io.connect("http://localhost:4001");
    createStream();
    console.log(user);

  }, []);



  function createStream() {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID, username,);

        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((user) => {
            const peer = createPeer(user.id, socketRef.current.id, stream, user.username);
            peersRef.current.push({
              peerID: user.id,
              peername: user.username,
              peer,
            });
            peers.push({
              peerID: user.id,
              peername: user.username,

              peer,

            });
          });
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          alert.info(payload.username + " Joined the Class")
          const peer = addPeer(payload.signal, payload.callerID, stream, payload.username);
          peersRef.current.push({
            peerID: payload.callerID,
            username: payload.username,
            peer,
          });
          const peerObj = {
            peer,
            username: payload.username,
            peerID: payload.callerID,
          };
          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
          alert.info("Some User Left");
          
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          console.log(payload);
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("change", (payload) => {
          setUserUpdate(payload);
        });
      });
  }

  function createPeer(userToSignal, callerID, stream, name) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      username: name
    });

    peer.on("signal", (signal) => {
      console.log(signal);
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        username: username
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream, username) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      name: username
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID, username });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="main-div-call">
      <div className="d-flex">
        <div className="my-video-div d-flex">

          <div>
            <video className="video" muted ref={userVideo} autoPlay playsInline />
            <span className="ms-3">{user.user.firstname}</span>
          </div>

          <div className="d-flex ">

            {
              peers.map((peer, index) => {
                let audioFlagTemp = true;
                let videoFlagTemp = true;
                if (userUpdate) {
                  userUpdate.forEach((entry) => {
                    if (peer && peer.peerID && peer.peerID === entry.id) {
                      audioFlagTemp = entry.audioFlag;
                      videoFlagTemp = entry.videoFlag;
                    }
                  });
                }
                return (

                  //video of ALl the connected peers
                  <div key={peer.peerID} className="others-vid">


                    <Video peer={peer.peer} className="d-block" />
                    {
                      peer.peername ?
                        <span className="d-block ms-3">{peer.peername}</span>
                        :
                        <span className="d-block ms-3">{peer.username}</span>

                    }

                  </div>
                );
              })}
          </div>
        </div>



      </div>
      <div className='meeting-footer-container'>

        <div className='meeting-footer-left-item'>
          <div >
            <span>  Meeting Details</span>
            <FontAwesomeIcon icon={faAngleUp} className="meeting-footer-icon" />
          </div>
        </div>


        <div className='meeting-footer-center-item'>
          <div className='meeting-footer-icon-block' onClick={() => {
            if (userVideo.current.srcObject) {
              userVideo.current.srcObject.getTracks().forEach(function (track) {
                if (track.kind === "audio") {
                  if (track.enabled) {
                    socketRef.current.emit("change", [...userUpdate, {
                      id: socketRef.current.id,
                      videoFlag,
                      audioFlag: false,
                    }]);
                    track.enabled = false;
                    setAudioFlag(false);
                  } else {
                    socketRef.current.emit("change", [...userUpdate, {
                      id: socketRef.current.id,
                      videoFlag,
                      audioFlag: true,
                    }]);
                    track.enabled = true;
                    setAudioFlag(true);
                  }
                }
              });
            }
          }}>
            <FontAwesomeIcon icon={audioFlag ? faMicrophone : faMicrophoneAltSlash} className="icon" />
          </div>

          <div className='meeting-footer-icon-block' >
            <FontAwesomeIcon icon={faPhone} className="icon red" onClick={() => {
              userVideo.current.srcObject.getTracks().forEach((track)=>{
                track.stop();
              })
              socketRef.current.disconnect();
              if(cookies.user.role==="teacher"){
                navigate("/teacher/dashboard")
    
              }
              else{
                navigate("/dashboard")
    
              }

            }} />
          </div>

          <div className='meeting-footer-icon-block' onClick={() => {
            if (userVideo.current.srcObject) {
              userVideo.current.srcObject.getTracks().forEach(function (track) {
                if (track.kind === "video") {
                  if (track.enabled) {
                    socketRef.current.emit("change", [...userUpdate, {
                      id: socketRef.current.id,
                      videoFlag: false,
                      audioFlag,
                    }]);
                    track.enabled = false;
                    setVideoFlag(false);
                  } else {
                    socketRef.current.emit("change", [...userUpdate, {
                      id: socketRef.current.id,
                      videoFlag: true,
                      audioFlag,
                    }]);
                    track.enabled = true;
                    setVideoFlag(true);
                  }
                }
              });
            }
          }}>
            <FontAwesomeIcon icon={videoFlag ? faVideo : faVideoSlash} className="icon" />
          </div>

        </div>


        <div className='meeting-footer-right-item'>

          <div className='meeting-footer-icon-block-right'>
            <FontAwesomeIcon icon={faDesktop} className="icon red" />
            <p>Present now</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Room;