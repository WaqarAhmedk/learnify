
import { useLocation } from "react-router-dom";
import { CourseDetailsProvider } from "./context/Coursecontext";
import ClassTopicsDetail from "./teachercomponents/teacherdashboardcomponents/classTopicDetailscomponent";
import TeacherDashboardHeader from "./teachercomponents/teacherdashboardcomponents/teacherdashboardheader";

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

