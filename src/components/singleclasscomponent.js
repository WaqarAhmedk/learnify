



function SingleClass(props) {

    return <>
        <div className="card">
            <img className="card-img" src={props.imgsrc} alt="Card cap"  />
            <div className="card-body">
                <p className="card-">{props.subjname}</p>
            </div>
        </div>

    </>
}
export default SingleClass;