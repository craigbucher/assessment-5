import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();
    axios.post('/logout/').then((response) => {
        console.log('response from server: ', response)
        navigate("/login");
    });



    return (
        <div>
            <h2>Logging you out . . . </h2>
        </div>
    )
}

export default Logout;