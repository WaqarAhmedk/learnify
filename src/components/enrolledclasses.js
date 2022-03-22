import "../style/enrolledclasses.css"
import SingleClass from "./singleclasscomponent";

function EnrolledClasses() {
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
    return <>

        <div id="class-container"  >
            <div className="d-flex bg-primary hd" >
                <h1 className="col-6 " >Enrolled classes</h1>
                
                <div className="form-group has-search searchdiv">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control in-field" placeholder="Search" />
                </div>
            </div>


            <div id="class-container-content" className="row">


                {

                    enrolledclasses.map((enclass) => {
                       
                        return <SingleClass key={enclass.id} subjname={enclass.subjname} imgsrc={require("../assets/images/"+enclass.imgsrc)} />

                    })

                }


            </div>
        </div>
    </>
}
export default EnrolledClasses;