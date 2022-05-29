import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit ,faPlus} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SingleClass(props) {
    const navigate = useNavigate();
    console.log(props.id);
    return <>


        <div className="card">
            <div>
                <FontAwesomeIcon icon={faTrash} className="me-5" onClick={() => {

                    axios.post("http://localhost:4000/delete", {
                        id: props.id
                    })
                        .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                                navigate("/dashboard");

                            }
                        })
                        .catch(err => console.error(err));

                }}
                />
                <FontAwesomeIcon icon={faEdit} onClick={() => {
                    navigate("/updatecourse", { state: { id: props.id } })
                }} />
            </div>

            <img className="card-img" src={props.imgsrc} alt="Card cap" />
            <div className="card-body">
                <h3 className="card-">{props.subjname}</h3>
                <p className="card-">{props.subjdesc}</p>
            </div>
        </div>

    </>
}
export default SingleClass;