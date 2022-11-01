import React,{useContext} from 'react'
import CustomPopup from '../scanface/joinmeeting-popup1'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../../context/usercontext";



export default function CallHomePage() {
    const user=useContext(UserContext);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    console.log(user);
    return <>
        <form>
            <input type="text" value={title} onChange={(e) => {
                setTitle(e.target.value);
            }} />
            <button onClick={(e) => {
                e.preventDefault();
                axios.post("/create-online-meeting", { title }).then((res) => {
                    if (res.data.link) {
                        navigate(res.data.link);
                    }
                })

            }}>Create a Meeting</button>

        </form>
    </>
}
