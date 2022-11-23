import React, { useRef, useEffect } from 'react'
import * as faceapi from "face-api.js"
export default function FaceRecognition() {
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);

    const videoRef = useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef();


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





    const recognizeFaces = async () => {

        const labeledDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 7)


        if (canvasRef && canvasRef.current) {
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize = {
                width: videoWidth,
                height: videoHeight
            }



            faceapi.matchDimensions(canvasRef.current, displaySize)


            setInterval(async () => {
                // const detections = await faceapi.detectAllFaces(videoRef.current).withFaceLandmarks().withFaceDescriptors()
                const detections = await faceapi.detectSingleFace(videoRef.current).withFaceLandmarks().withFaceDescriptor();



                if (detections) {
                    const resizedDetections = faceapi.resizeResults(detections, displaySize);
                    canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
                    canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                    canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

                    const result = faceMatcher.findBestMatch(resizedDetections.descriptor);
                    console.log(result);
                    const box = resizedDetections.detection.box

                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvasRef.current)
                    // const results = resizedDetections.map((d) => {
                    //     console.log(d.descriptor);
                    //     return faceMatcher.findBestMatch(d.descriptor);
                    // })

                    // results.forEach((result, i) => {
                    //     const box = resizedDetections[i].detection.box
                    //     const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    //     drawBox.draw(canvasRef.current)
                    // })
                }





            }, 100)




        }


        function loadLabeledImages() {
            //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes', 'Tony Stark', 'Thor', 'Captain Marvel']
            const labels = ['Prashant Kumar', 'Waqar Ahmed', 'unknown'] // for WebCam
            return Promise.all(
                labels.map(async (label) => {
                    const descriptions = []
                    for (let i = 1; i <= 2; i++) {
                        const img = await faceapi.fetchImage(require('../labeled_images/' + label + "/" + i + ".jpg"));
                        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                         console.log(label + i + JSON.stringify(detections))
                        descriptions.push(detections.descriptor)
                    }
                    document.body.append(label + ' Faces Loaded | ')
                    return new faceapi.LabeledFaceDescriptors(label, descriptions)
                })
            )
        }


    }

    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
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
