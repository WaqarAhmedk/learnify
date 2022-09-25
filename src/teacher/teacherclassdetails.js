
import "../style/coursedetails.css";
import "../style/login.css";
import { useLocation } from "react-router-dom";
import TeacherDashboardHeader from "./teachercomponents/teacherdashboardheader";
import { CourseDetailsProvider } from "./context/Coursecontext";
import ClassTopicsDetail from "./teachercomponents/classTopicDetailscomponent";

function TeacherClassDetails() {

    const data = useLocation();
    const courseid = data.state.courseid;

    return <>


        <CourseDetailsProvider>

            <TeacherDashboardHeader courseid={courseid} />
            {/* class topic details*/}
            <ClassTopicsDetail />



        </CourseDetailsProvider>

    </>

}

export default TeacherClassDetails;

