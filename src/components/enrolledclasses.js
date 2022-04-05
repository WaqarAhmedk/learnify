import "../style/enrolledclasses.css"
import SingleClass from "./singleclasscomponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
import { instclasses ,enrolledclasses } from "./classes";



function EnrolledClasses(props) {

    let role = props.role;


    
    return <>

        <div id="class-container"  >
            <div className="d-flex hd" >
                <h1 className="col-6 " >Enrolled classes</h1>

                <div className="form-group has-search searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>
                {
                    role === "instructor" ? <div className="course-mang"> <FontAwesomeIcon icon={faBars} />
                        <span> Course Management</span> </div> : ""
                }
            </div>


            <div id="class-container-content" className="row">


                {
                    role === "instructor" ? instclasses.map((instclass) => {
                        return <SingleClass key={instclass.id} id={instclass.id} subjname={instclass.subjname} imgsrc={require("../assets/images/" + instclass.imgsrc)} role={role} />

                    }) :

                        enrolledclasses.map((enclass) => {

                            return <SingleClass key={enclass.id} id={enclass.id} subjname={enclass.subjname} imgsrc={require("../assets/images/" + enclass.imgsrc)} role={role} />

                        })

                }


            </div>
        </div>
    </>
}
export default EnrolledClasses;