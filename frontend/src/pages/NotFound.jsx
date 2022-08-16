import { Link } from "react-router-dom";

import Bee from '../assets/bee.gif'

const NotFound = () => {
    console.log('404 loaded')

    return (

        <div>
            <br></br>
            <br></br>
            <img src={Bee} className="bee"></img>
            <h1 className='not-found'>Page Not Found!</h1>
            <br></br>
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
        </div>




    );
}

export default NotFound;