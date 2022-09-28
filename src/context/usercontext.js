import axios from 'axios';
import React, { createContext, useState } from 'react';

import { useCookies } from 'react-cookie';
import { useEffect } from 'react';




export const UserContext = createContext();



export const UserProvider = (props) => {


    const [user, setUser] = useState({
        logedin:false,
        user:{}
    });

    const [cookies, setCookies] = useCookies();


    const LoadUser = () => {

        if (cookies.user.role === 'teacher') {

            axios
                .get("/getteacher", {
                    headers: {
                        "teacher-auth-token": cookies.user.AuthToken
                    }
                })
                .then((res) => {
                    setUser({logedin:true ,user:res.data});
                })
                .catch(err => console.error(err));
        }
        else if (cookies.user.role === "student") {
            axios
                .get("/getstudent", {
                    headers: {
                        "student-auth-token": cookies.user.AuthToken
                    }
                })
                .then((res) => {
                    setUser({logedin:true ,user:res.data});
                })
                .catch(err => console.error(err));
        }

    }


    useEffect(() => {

        if (cookies.user) {
            LoadUser();
        }
        else {
            console.log("no user");
        }
    }, []);


    return (

        <UserContext.Provider value={[user, setUser]}>
            {
                props.children
            }
        </UserContext.Provider>
    );

}