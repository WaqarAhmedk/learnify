import EnrolledClasses from "./enrolledclasses";
import Header from "./header";

function Dashboard(props){
    return <>
    <Header />
    <EnrolledClasses role={props.role}/>
    
    </>
}
export default Dashboard;