import { Link } from "react-router-dom";

const About = () => {
    console.log('About loaded')

    return (
        <div>
            <h2>This is the About page</h2>
            <br></br>
            <br></br>
            <Link to='/'>
                <button>Back to Home</button>
            </Link>
        </div>
    );
}

export default About;