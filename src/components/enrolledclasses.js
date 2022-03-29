import "../style/enrolledclasses.css"
import SingleClass from "./singleclasscomponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from 'react-router-dom';
function EnrolledClasses(props) {

    let role = props.role;


    var enrolledclasses = [
        {
            id: 1,
            subjname: "Programmming Fundamentals",
            imgsrc: "images.png",
        },
        {
            id: 2,
            subjname: "Object Oriented Programming",
            imgsrc: "images.png",
        },
        {
            id: 3,
            subjname: "Data Structures and Algorithms",
            imgsrc: "images.png",
        },
        {
            id: 4,
            subjname: "Artifical Intelligence",
            imgsrc: "images.png",
        },
        {
            id: 5,
            subjname: "Data Bases",
            imgsrc: "images.png",
        },
        {
            id: 6,
            subjname: "Web Engineering",
            imgsrc: "images.png",
        },
        {
            id: 7,
            subjname: "Digital Logic Design",
            imgsrc: "images.png",
        },
        {
            id: 8,
            subjname: "Digital Logic Design",
            imgsrc: "images.png",
        },
    ];


    let instclasses = [
        {
            id: 1,
            subjname: "Programmming Fundamentals",
            imgsrc: "images.png",
        },
        {
            id: 2,
            subjname: "Object Oriented Programming",
            imgsrc: "images.png",
        },
        {
            id: 3,
            subjname: "Data Structures and Algorithms",
            imgsrc: "images.png",
        },
        {
            id: 4,
            subjname: "Artifical Intelligence",
            imgsrc: "images.png",
        },
        {
            id: 5,
            subjname: "Data Bases",
            imgsrc: "images.png",
        },
    ];
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
                        return <SingleClass id={instclass.id} subjname={instclass.subjname} imgsrc={require("../assets/images/" + instclass.imgsrc)} role={role} />

                    }) :

                        enrolledclasses.map((enclass) => {

                            return <SingleClass id={enclass.id} subjname={enclass.subjname} imgsrc={require("../assets/images/" + enclass.imgsrc)} role={role} />

                        })

                }


            </div>
        </div>
    </>
}
export default EnrolledClasses;