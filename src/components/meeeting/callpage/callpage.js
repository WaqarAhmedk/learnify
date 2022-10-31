import React, { useEffect, useRef, useState, useContext } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import micmute from "../../../assets/icons/micmute.svg";
import micunmute from "../../../assets/icons/micunmute.svg";
import webcam from "../../../assets/icons/webcam.svg";
import webcamoff from "../../../assets/icons/webcamoff.svg";
import { useParams } from 'react-router-dom';
import "./callpage.css"
import { useAlert } from 'react-alert';
import { UserContext } from "../../../context/usercontext";













const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video className="video" playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
  const user = useContext(UserContext);
  const [peers, setPeers] = useState([]);
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
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };
  useEffect(() => {

    socketRef.current = io.connect("http://localhost:4001");
    createStream();
  }, []);

  function createStream() {
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          console.log(users)
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
          alert.info("user having id " + payload)
          console.log("==", payload)
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
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div >
      <video className="video" muted ref={userVideo} autoPlay playsInline />
      <div className="controls-div">
        <img className="controls-img"
          src={videoFlag ? webcam : webcamoff}
          onClick={() => {
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
          }}
        />

        <img className="controls-img"
          src={audioFlag ? micunmute : micmute}
          onClick={() => {
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
          }}
        />
      </div>











    
    </div>

  );
};

export default Room;


// {peers.map((peer, index) => {
//   let audioFlagTemp = true;
//   let videoFlagTemp = true;
//   if (userUpdate) {
//     userUpdate.forEach((entry) => {
//       if (peer && peer.peerID && peer.peerID === entry.id) {
//         audioFlagTemp = entry.audioFlag;
//         videoFlagTemp = entry.videoFlag;
//       }
//     });
//   }
//   return (

//     //video of ALl the connected peers
//     <div key={peer.peerID} className="others-vid">
//       <Video peer={peer.peer} />
//       <div className="small-controls">
//         <img src={videoFlagTemp ? webcam : webcamoff} />
//         &nbsp;&nbsp;&nbsp;
//         <img src={audioFlagTemp ? micunmute : micmute} />
//       </div>
//     </div>
//   );
// })}