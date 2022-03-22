
import "../style/homepage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function Landingpage() {


    var teacher = [
        "Join Classrooms",
        "Learn through interactive Video Conferencing",
        "Access Course content on a central storage platform",
        "Automated attendance & AI features for ease",
        "Dynamic Progress Reports"
    ]

    function linkClicked() {
        activeclass = "d"
    }

    const activeclass = "active";
    return <>
        <div id="topdiv">
            <nav className="navbar navbar-expand-lg navbar-light bg-light " id="home-navbar">

                <a className="navbar-brand ps-5" id="brand-img" href="/">
                    <img src={require("../assets/icons/Learnify logo.png")} alt={"drop-down-sign"} />
                </a>

                <div className="home-list">
                    <ul>
                        <li >Login</li>
                        <li className="active">Home</li>
                        <li >About</li>
                        <li>Contact us</li>

                    </ul>
                </div>
            </nav>

            {/* <div className="main-div">
                <div className="home-innerdiv">
                    <span> Let’s learn on a dedicated e-Learning enviroment! </span>
                    <p>We Provide the facility of effective e-learning with the handy features of <strong>video conferencing</strong>, file storage and Artificial Intelligence for the students as well as for the instructors, to facilitate effective virtual learning.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div> */}
            <div className="home-card-div">
                <div className="home-card-div-child">
                    <div className="home-card-btn">
                        Join as  Student
                    </div>



                    {
                        teacher.map((item,index) => {
                            return <div key={index} className="home-card-cntn" >
                                <FontAwesomeIcon icon={faCheck} />
                                <span >{item}</span>
                            </div>
                        })
                    }


                    <div>

                    </div>
                </div>
                <div className="home-card-div-child">
                    <div className="home-card-btn">
                        Join as Instructor
                    </div>
                    {
                        teacher.map((item,index) => {
                            return <div key={index} className="home-card-cntn" >
                                <FontAwesomeIcon icon={faCheck} />
                                <span >{item}</span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </>
}
export default Landingpage;