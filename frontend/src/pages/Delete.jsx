import Warning from '../assets/warning.png'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from "react-router-dom";

const DeleteHive = () => {
    let navigate = useNavigate();
    let { hiveId } = useParams()
    console.log(`delete request for hive #${hiveId}`)

    function confirmDelete() {
        axios.delete(`/hives/${hiveId}`).then((response) => {
            console.log(response)
            window.alert(`Hive ${hiveId} successfully deleted! 👍`)
            navigate('/hives')
        })
    }

    function confirmCancel() {
        navigate(-1)
    }

    return (
        <div>
            <img src={Warning} className="warning"></img>
            <br />
            <h1>Warning!</h1>
            <h2>Deleting a hive is irreversible</h2>
            <h2>and all associated inspections will be lost!</h2>
            <br />
            <h2>Are you sure you wish to proceed?</h2>
            <br />
            <div>
                {/* <button onclick={confirmCancel}>Cancel</button> */}
                <button onClick={() => confirmCancel()}>Cancel</button>
                <div className='space'></div>
                {/* <button onclick={confirmDelete}><b>Delete</b></button> */}
                <button onClick={() => confirmDelete()}><b>Delete</b></button>
            </div>
        </div >

    );
}

export default DeleteHive;