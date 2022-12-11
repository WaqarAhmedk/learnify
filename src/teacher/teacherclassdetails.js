
import { useParams } from "react-router-dom";
import { CourseDetailsProvider } from "./context/Coursecontext";
import ClassTopicsDetail from "./teachercomponents/teacherdashboardcomponents/classTopicDetailscomponent";
import TeacherDashboardHeader from "./teachercomponents/teacherdashboardcomponents/teacherdashboardheader";
import { CourseContext } from "./context/Coursecontext";
import React,{ useContext } from 'react';

function TeacherClassDetails() {
    const params = useParams();
    const cid = params.id;




    return <>
        <CourseDetailsProvider>
            <TeacherDashboardHeader />
            {/* class topic details*/}
            <ClassTopicsDetail />
        </CourseDetailsProvider>


    </>

}

export default TeacherClassDetails;

