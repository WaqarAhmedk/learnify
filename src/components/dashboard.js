import EnrolledClasses from "./enrolledclasses";
import Header from "./header";
import { useLocation } from 'react-router-dom';

function Dashboard(props){

    let state=useLocation();

    let role=state.state.role;
    return <>
    <EnrolledClasses role={role}/>
    
    </>
}
export default Dashboard;