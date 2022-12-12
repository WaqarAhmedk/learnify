import React, { useRef, useEffect } from 'react'
import * as faceapi from '@vladmandic/face-api';
import { useCookies } from 'react-cookie';
import { UserContext } from '../context/usercontext';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useAlert } from 'react-alert';


export default function FaceRecognition() {

    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const [user, setUser] = useContext(UserContext);
    const [cookies] = useCookies();
    const data = useLocation();
    const classlink = data.state.classlink;
    const topicid = data.state.topicid;
    const courseid = data.state.courseid;
    const classid = data.state.classid;
    const navigate = useNavigate();
    const alert = useAlert();
    console.log(topicid, classid, topicid);
    console.log(user);
    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();
    let interval;



    const markAttendence = () => {
        axios.post(`/markattendence/${courseid}/${topicid}/${classid}`, {}, {
            headers: {
                'student-auth-token': cookies.user.AuthToken

            }
        }).then((res) => {
            if (res.data.success === true) {
                closeWebcam()
                alert.success(res.data.msg)
                navigate(classlink, { state: { courseid, topicid, classid } })

            }
        })
    }

    useEffect(() => {
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //heavier/accurate version of tiny face detector
        ]).then(() => {
            setModelsLoaded(true)

            console.log('video added')
        })
    }, [])

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 200 } })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("error:", err);        //video.src = '../videos/speech.mp4'

            });
    }

    const StopScan = () => {
        clearInterval(interval)
    }


    const recognizeFaces = async () => {

        const labeledDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5)


        if (canvasRef && canvasRef.current && captureVideo) {
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize = {
                width: videoWidth,
                height: videoHeight
            }



            faceapi.matchDimensions(canvasRef.current, displaySize)


            interval = setInterval(async () => {
                const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();



                if (detections) {
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

                    const result = faceMatcher.findBestMatch(resizedDetections.descriptor);
                    // const a=faceMatcher.matchDescriptor()
                    console.log(result);
                    if (result.label === user.user._id.toString()) {


                        markAttendence();


                    }
                    else {
                        console.log("No face matched");
                    }
                    const box = resizedDetections.detection.box

                    if (captureVideo === "true") {
                        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                        drawBox.draw(canvasRef.current)
                    }

                }
                else {
                    console.log("no face detected");
                }





            }, 100);







        }



        function loadLabeledImages() {
            const label = user.user._id.toString();
            console.log(label);
            const labels = [label, "unknown"] // for WebCam


            return Promise.all(
                labels.map(async (label) => {
                    const descriptions = [];
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(require('../labeled_images/' + label + "/" + i + ".jpeg"));


                        console.log(img);
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                        console.log(label + i + JSON.stringify(detections))
                        descriptions.push(detections.descriptor)
                    }
                    return new faceapi.LabeledFaceDescriptors(label, descriptions)
                })
            )
        }


    }

    const closeWebcam = async () => {
        console.log(captureVideo);
    try {
        if (captureVideo) {
            console.log("Cld");

            await videoRef.current.srcObject.getTracks().forEach((track) => {
                track.stop();
            })

            setCaptureVideo(false);
            StopScan();


        }
        
    } catch (error) {
        console.log("error"+error);
    }






        // window.location.reload()
    }

    return (
        <div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {
                    captureVideo && modelsLoaded ?
                        <button onClick={closeWebcam} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Close Webcam
                        </button>
                        :
                        <button onClick={startVideo} style={{ cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px' }}>
                            Open Webcam
                        </button>
                }
            </div>
            {
                captureVideo ?
                    modelsLoaded ?
                        <div>

                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={recognizeFaces} style={{ borderRadius: '10px' }} />
                                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                            </div>
                        </div>
                        :
                        <div>loading...</div>
                    :
                    <>
                    </>
            }
        </div>
    )
}
