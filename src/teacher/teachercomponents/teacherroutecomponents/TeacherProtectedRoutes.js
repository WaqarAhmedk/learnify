import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../../../context/usercontext';

export default function TeacherProtectedRoutes(props) {

    const [user,setUser] = useContext(UserContext);
    let role;
    let logedin;
    console.log(user);
    if (Object.keys(user).length > 0) {
        console.log("dd");
        logedin = true;
        role=user.role;
        
    }
    else {
        logedin=false;
    }



    return (
        logedin ? <> {role==="teacher" ?   <Outlet />:"" } </>  : <Navigate to="/" />
        
        )

}
