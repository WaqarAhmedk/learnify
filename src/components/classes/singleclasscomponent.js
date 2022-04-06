
import { useNavigate } from "react-router-dom";



function SingleClass(props) {
    let role = props.role;
    let subjid = props.id;
    let Navigate = useNavigate();
    return <>
        <div className="card"  onClick={() => {
            //to do here we will rediect to the page where the deatils of the enrolled classes will show
            console.log(subjid);
            Navigate("/dashboard/classdetails", { state: { role: role, subjid: subjid } });

        }}  >
            
            <img className="card-img" src={props.imgsrc} alt="Card cap" />
            <div className="card-body">
                <p className="card-">{props.subjname}</p>
            </div>
        </div>

    </>
}
export default SingleClass;