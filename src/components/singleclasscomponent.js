



function SingleClass(props) {
    return <>
        <div class="card" >
            <img class="card-img" src={props.imgsrc} alt="Card cap" />
            <div class="card-body">
                <p class="card-">{props.subjname}</p>
            </div>
        </div>

    </>
}
export default SingleClass;