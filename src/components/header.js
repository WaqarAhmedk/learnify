import "../style/navbar.css"
import { ReactComponent as Dashboardsvg } from '../assets/icons/Dashboard blue.svg';
import { ReactComponent as Calendersvg } from '../assets/icons/calendarblue.svg';
import { ReactComponent as Mytasksvg } from '../assets/icons/taks blue.svg';
import { ReactComponent as Progressdvg } from '../assets/icons/Progress blue.svg';
import { ReactComponent as Messagesvg } from '../assets/icons/messages blue.svg';
import { ReactComponent as Settingsvg } from '../assets/icons/Settings Blue.svg';
import { ReactComponent as Signoutsvg } from '../assets/icons/Sign out blue.svg';
import { ReactComponent as Notificationsvg } from '../assets/icons/notifications blue.svg';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faBell } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { useContext } from "react";
import { UserContext } from "../context/usercontext"




function Header() {


    const [Cookies, setCookies, removeCookie] = useCookies('user');
    const [user, setUser] = useContext(UserContext);
    console.log(user);

    const navigate = useNavigate();





    return <nav className="navbar navbar-expand-lg navbar-light bg-light " id="navbar">

        <Link className="navbar-brand ps-5" id="brand" to="/">
            <img src={require("../assets/icons/Learnify logo.png")} alt={"drop-down-sign"} />
        </Link>


        <div id="profile">

            <div >
                <FontAwesomeIcon icon={faMessage} className="nav-icons" />
                <FontAwesomeIcon icon={faBell} className="nav-icons" />
            </div>



            <img src={require("../assets/images/avatar.jpg")} className="navbar-brand rounded-circle " id="profile-img" alt="ds" />
            <span className="d-block">{user.firstname}</span>


            {/* Drop down using react-bootstrap component  */}

            <Dropdown className="dropdown">
                <Dropdown.Toggle id="dropdown-basic" className="drop-down-main">
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu" >

                    <ul className="drop-down-ul">
                        <div id="drop-down-profile">
                            <img src={require("../assets/images/avatar.jpg")} className="navbar-brand rounded-circle " id="profile-img" alt="ds" />
                            <br />
                            <span>{user.firstname}</span>
                        </div>


                        <div className="drop-down-menu-item" >
                            <Dashboardsvg className="icon-img" />
                            <span>Dashboard</span>
                        </div>

                        <div className="drop-down-menu-item" onClick={() => {
                            navigate("/events")
                        }}>
                            <Calendersvg className="icon-img" />
                            <span>Calender</span>
                        </div>

                        <div className="drop-down-menu-item">
                            <Mytasksvg className="icon-img" />
                            <span>My Tasks</span>
                        </div>

                        <div className="drop-down-menu-item">
                            <Progressdvg className="icon-img" />
                            <span>Progress</span>
                        </div>

                        <div className="drop-down-menu-item">
                            <Messagesvg className="icon-img" />
                            <span>Messages</span>
                        </div>

                        <div className="drop-down-menu-item">
                            <Notificationsvg className="icon-img" />
                            <span>Notifications</span>
                        </div>

                        <div className="drop-down-menu-item">
                            <Settingsvg className="icon-img" />
                            <span>Settings</span>
                        </div>

                        <div className="drop-down-menu-item" onClick={() => {
                            removeCookie('user', { path: "/" })

                            setUser({});
                            navigate("/signin")


                        }}>
                            <Signoutsvg className="icon-img" />
                            <span >Signout</span>
                        </div>




                    </ul>

                </Dropdown.Menu>
            </Dropdown>




        </div>

        <hr />
    </nav>


}

export default Header