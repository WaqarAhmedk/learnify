import { useLocation } from 'react-router-dom';
import EnrolledClasses from "./studentenrolledclasses";


function Dashboard(props) {

    let state = useLocation();
    return <>
        <EnrolledClasses />
    </>
}
export default Dashboard;