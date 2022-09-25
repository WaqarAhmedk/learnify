import React, { createContext, useState } from "react";

export const CourseContext = createContext();


export const CourseDetailsProvider = (props) => {
    const [coursename, setCoursename] = useState("");
    const [topics, setTopics] = useState([]);




    return (
        <CourseContext.Provider
            value={{
                'course': [coursename, setCoursename],
                'topics': [topics, setTopics],
            }}>
            {
                props.children
            }
        </CourseContext.Provider>
    );






}

