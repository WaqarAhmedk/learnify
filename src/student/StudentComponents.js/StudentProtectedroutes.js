import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../context/usercontext';

export default function StudentProtectedRoutes(props) {

    const [user, setUser] = useContext(UserContext);






    return (
        user.logedin ? <> 
        {user.user.role === "student" ? <Outlet /> : ""
        } </>
         : <Navigate to="/" />

    )

}
