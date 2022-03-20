import "../style/enrolledclasses.css"
import SingleClass from "./singleclasscomponent";

function EnrolledClasses(props) {


    // 
    return <>

        <div id="class-container"  >
            <div className="d-flex bg-primary hd" >
                <h1 className="col-6 " >Enrolled classes</h1>
                {props.role=="instructor" ? <a>+</a>:<span></span>}
               
                <div class="form-group has-search searchdiv">
    <span class="fa fa-search form-control-feedback"></span>
    <input type="text" class="form-control in-field" placeholder="Search" />
  </div>
            </div>


            <div id="class-container-content" className="row">
               <SingleClass subjname="Programmming Fundamentals" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Data Structures and Algorithms" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Object Oriented Programming" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Artifical Intelligence" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Programmming Fundamentals" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Data Structures and Algorithms" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Object Oriented Programming" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />
               <SingleClass subjname="Artifical Intelligence" imgsrc={require("../assets/images/IMG-20200527-WA0048.jpg")} />

            </div>
        </div>
    </>
}
export default EnrolledClasses;