import { useLocation } from 'react-router-dom';
import TeacherClasses from './teacherclasses';

function TeacherDashboard(props) {

    let state = useLocation();

    let role = "teacher";

    return <>
        
    <TeacherClasses />


    


    </>
}
export default TeacherDashboard;