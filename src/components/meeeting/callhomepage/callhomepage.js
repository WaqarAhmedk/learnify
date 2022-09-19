import React from 'react'
import CustomPopup from '../scanface/joinmeeting-popup1'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function CallHomePage() {
    const [title, setTitle] = useState("");
    const navigate=useNavigate();
    return <>
        <form>
            <input type="text" value={title} onChange={(e) => {
                setTitle(e.target.value);
            }} />
            <button onClick={(e) => {
                e.preventDefault();
                axios.post("/create-online-meeting", { title }).then((res) => {
                    if (res.data.success===true) {
                        navigate("/meeting/"+res.data.meetingid)
                    }
                })

            }}>Create a Meeting</button>

        </form>
    </>
}
