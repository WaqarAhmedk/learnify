import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

export default function AdminProtectedRoutes(props) {

    const [user] = useContext(UserContext);






    return (
        user.logedin ? <> {user.user.role === "admin" ? <Outlet /> : "s"} </> : <Navigate to="/admin/login" />

    )

}
