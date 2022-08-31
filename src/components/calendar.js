import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { hydrate } from 'react-dom';



export default function Calendar() {

    const [events, setEvents] = useState([]);
    const [cookies, setCookies] = useCookies();

    const getevents = () => {
        axios
            .get("/get-all-upcoming-events", {
                headers: {
                    "student-auth-token": cookies.StudentAuth
                }
            })
            .then((res) => {
                console.log(res);
                setEvents(res.data.allevents);
            })
            .catch(err => console.error(err));
    }

    useEffect(()=>{
        getevents();
    },[]);

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
        
            events={events.map((item)=>{
                
                return {
                    
                    title:item.title,
                    date:item.submissiondate || item.classtime
                }
            })}
        />
    )
}

    //     {
    //         title:"d",
    //       date:  "2022-08-10"
    //     }
    // ]