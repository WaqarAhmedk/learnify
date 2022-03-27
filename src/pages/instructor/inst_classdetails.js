
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPeopleArrowsLeftRight, faCirclePlus, faEdit, faCircleXmark, faBookOpen, faClipboardList, faBrain, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

import "../../style/coursedetails.css"
function InstClassDetails() {
    let role = "instructor";

    let today = Date().toString();

    return <>

        <div id="class-details-container"  >
            <div className="d-flex class-details-hd" >
                <h1 className="col-3 " >Course Name</h1>
                <div className="form-group has-search class-details-searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>
                {
                    role === "instructor" ? <div className="inst-class-details-options">

                        <div>
                            <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                            <span>Discussion Board</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCirclePlus} />
                            <span>Create new Activity</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faBars} />
                            <span>Course Settings</span>
                        </div>

                    </div>
                        :

                        //after this colon student options of class detailsreq on condtion of roles

                        <div className="inst-class-details-options">

                            <div>
                                <FontAwesomeIcon icon={faPeopleArrowsLeftRight} />
                                <span>Discussion Board</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCirclePlus} />
                                <span>Create new Activity</span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faBars} />
                                <span>Course Settings</span>
                            </div>

                        </div>
                }
            </div>

        </div>

        {/* class topic details are shown here */}

        <div className="row classdetails-content">

            <div>
                <div className="class-det-topic-heading">
                    <span>1. </span>
                    <span>Depth First Search</span>
                    <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" />
                </div>

                <div className="class-det-topic-content">

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBookOpen} />
                            <span>Helping Material</span>
                        </div>
                        <div className="inner-content-right">

                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faClipboardList} />
                            <span>Assignment No 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Due Date :{today}</span>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBrain} />
                            <span>Quiz no 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Scheduled :{today}</span>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faCirclePlay} />
                            <span>Recorded Video Session</span>
                        </div>
                        <div className="inner-content-right">
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                </div>
            </div>

        </div>


        {/* 2nd topic to be make dyanmic later */}
        <div className="row classdetails-content">

            <div>
                <div className="class-det-topic-heading">
                    <span>1. </span>
                    <span>Depth First Search</span>
                    <FontAwesomeIcon icon={faEdit} className="topic-heading-edit" />
                </div>

                <div className="class-det-topic-content">

                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBookOpen} />
                            <span>Helping Material</span>
                        </div>
                        <div className="inner-content-right">

                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />

                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faClipboardList} />
                            <span>Assignment No 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Due Date :{today}</span>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faBrain} />
                            <span>Quiz no 1</span>
                        </div>
                        <div className="inner-content-right">
                            <span className="time">Scheduled :{today}</span>
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                    <div className="main-content-1">
                        <div className="inner-content-left">
                            <FontAwesomeIcon icon={faCirclePlay} />
                            <span>Recorded Video Session</span>
                        </div>
                        <div className="inner-content-right">
                            <FontAwesomeIcon icon={faEdit} />
                            <FontAwesomeIcon icon={faCircleXmark} className="cross-icon" />
                        </div>
                    </div>
                    <hr className="hr" />
                </div>
            </div>




        </div>


    </>
}

export default InstClassDetails;