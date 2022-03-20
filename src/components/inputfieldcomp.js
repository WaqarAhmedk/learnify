
function Formcolumn(props) {
    return <div className="justify-content-center " id="inputdiv" >

        {
            props.type === 'submit' ?
                <input type={props.type} value={props.value}  className="form-control my-5 " />
                :
                <input type={props.type} placeholder={props.placeholder} value={props.value} className="form-control my-5" />

        }


    </div>
}

export default Formcolumn;