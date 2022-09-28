import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../../context/usercontext';

export default function TeacherProtectedRoutes(props) {

    const [user, setUser] = useContext(UserContext);






    return (
        user.logedin ? <> {user.user.role === "teacher" ? <Outlet /> : "jjdkj"} </> : <Navigate to="/" />

    )

}
