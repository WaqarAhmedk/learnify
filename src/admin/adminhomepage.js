import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import { useNavigate } from 'react-router-dom';
import AllStudents from './components/allstudents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrimace } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { UserContext } from '../context/usercontext';
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { useAlert } from 'react-alert';
import AllTeachers from './components/allteachers';
import AllCourses from './components/allcourses';
import PendingAdmins from './components/pendingadmins';


export default function Adminhomepage() {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate();
    const alert = useAlert();
    console.log(user);
    const [Cookies, setCookies, removeCookie] = useCookies('user');

    const [sidebar, setSidebar] = useState("sidebaropen");
    const [sidebaropen, setSidebaropen] = useState("sidebar-open-content-div");
    const [sidebarstate, setSidebarstate] = useState(false);
    const [admin, setadmin] = useState({});
    const [loadpage, setLoadpage] = useState(<AllStudents />);
    const HandleSidebar = () => {
        if (sidebarstate) {
            setSidebar("sidebar-close");
            setSidebaropen("sidebar-close-content-div");
            setSidebarstate(false);


        } else {
            setSidebar("sidebaropen");
            setSidebaropen("sidebar-open-content-div");
            setSidebarstate(true);

        }

    }






    return (<>
        {/* Sidebar  */}


        <div className='d-flex'>
            <div id="mySidenav" className={sidebar}>
                <div className='header'>
                    <img src={require("../assets/images/images.png")} />
                    <div>
                        <span>{user.user.name}</span>
                        <p>{user.user.email}</p>
                    </div>
                    <span onClick={() => {

                        if (Cookies.user.role === "admin") {
                            removeCookie('user', { path: "/" })

                            setUser({});
                            alert.success("You Logged Out Successfully")

                            navigate("/admin/login")
                        }
                    }}>Logout</span>
                </div>


                <div className='sidebar-options'>

                    <li className='sidebar-li' onClick={() => {
                        setLoadpage(<AllStudents />);
                    }}>All Students</li>
                    <li className='sidebar-li' onClick={() => {
                        setLoadpage(<AllTeachers />)
                    }}>All Teachers</li>
                    <li className='sidebar-li' onClick={() => {
                        setLoadpage(<AllCourses />)
                    }}>All Courses</li>
                    
                    <li className='sidebar-li' onClick={() => {
                        setLoadpage(<PendingAdmins />)
                    }}>Pending Admins</li>




                </div>
            </div>

            <div className={sidebaropen}>

                <div className='top-btn-div'>
                    <FontAwesomeIcon icon={faGrimace} className='open-btn' onClick={HandleSidebar} />
                </div>
                <div>
                    {
                        loadpage
                    }
                </div>

            </div>
        </div>

    </>
    )
}
