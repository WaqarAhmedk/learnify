import { createContext } from 'react';


const StudentCourseContext = createContext();



const StudentCourseContextProvider = (props) => {



    

    return (
        <StudentCourseContext.Provider>
            {
                props.children
            }
        </StudentCourseContext.Provider>
    )
}