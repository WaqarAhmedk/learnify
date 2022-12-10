import React from 'react';
import "../style/notifications.css"
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Notifications() {

  const [cookies, setCookies] = useCookies();
  const [notifications, setNotifications] = useState([

  ]);

  const getStudentNotifications = () => {
    axios
      .get("/studentnotifications"
        , {
          headers: {
            'student-auth-token': cookies.user.AuthToken

          }
        })
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data.notifications)
      })
      .catch(err => console.error(err));
  }

  useState(() => {
    getStudentNotifications()

  }, [])
  return (
    <div>
      <section class="section-50">
        <div class="container">
          <h3 class="m-b-50 heading-line">Notifications </h3>
          {
            notifications.map((notification, index) => {
              return <div class="notification-ui_dd-content">
                <div class="notification-list notification-list--unread">
                  <div class="notification-list_content">
                    <div class="notification-list_detail">

                      <p class="text-muted">{notification.text}</p>
                      <p class="text-muted"><small>{notification.time}</small></p>
                    </div>
                  </div>
                </div>



              </div>

            })
          }
        </div>
      </section>
    </div>
  )
}
