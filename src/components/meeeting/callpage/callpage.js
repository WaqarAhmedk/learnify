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













const Video = (props) => {
  const [name, setname] = useState("hello");





  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {

      ref.current.srcObject = stream;
    });
  }, []);

  return <>
    <video className="others-video" playsInline autoPlay ref={ref} />
    <span>{ }</span>
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

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,

  };


  useEffect(() => { }, [user])



  useEffect(() => {

    socketRef.current = io.connect("http://localhost:4001");
    createStream();
    console.log(user);
  }, []);

  useEffect(() => { })

  function createStream() {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        console.log(user.user);
        socketRef.current.emit("join room", roomID, user.user,);

        socketRef.current.on("all users", (users, dbusers) => {
          setUsers(dbusers);
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          alert.info(payload.user.firstname + " " + payload.user.lastname + " Joined the Class")
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          const peerObj = {
            peer,
            peerID: payload.callerID,
          };
          setPeers((users) => [...users, peerObj]);
        });

        socketRef.current.on("user left", (id) => {
          console.log(id);
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("change", (payload) => {
          setUserUpdate(payload);
        });
      });
  }

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
        user
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID, user });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="main-div-call">
      <div className="d-flex">
        <div className="my-video-div">

          <video className="video" muted ref={userVideo} autoPlay playsInline />
          <div className=" d-flex justify-content-between mb-4 my-vid-bottom">
            <span className="ms-5 me-5 text-primary">{user.user.firstname}</span>
          </div>
          <FontAwesomeIcon icon={faExpand} className="expand-btn" />

        </div>




        <div className="">
          {peers.map((peer, index) => {
            console.log(peer);
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
                <Video peer={peer.peer} users={users} />
                <span>{peer.peerID}</span>
                {/* <div className="small-controls">
        <img src={videoFlagTemp ? webcam : webcamoff} />
        &nbsp;&nbsp;&nbsp;
        <img src={audioFlagTemp ? micunmute : micmute} />
      </div> */}
              </div>
            );
          })}
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
            <FontAwesomeIcon icon={faPhone} className="icon red" />
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