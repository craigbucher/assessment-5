// sfc = 'stateless functional component'
import { Link } from 'react-router-dom';
import Beehive from '../assets/beehive-sm.png'
console.log('Navbar loaded')

const Navbar = () => {
    return (
        <nav className="navbar">
            <img className='beehive' src={Beehive}></img>
            <h2>Apis: Beehive Management</h2>
            <div className="links">
                <Link to="/home">Home</Link>
                <Link to="/inspectionlist">List Inspections</Link>
                <Link to="/newinspection">New Inspection</Link>
                <Link to="/hives">List Hives</Link>
                <Link to="/newhive">New Hive</Link>
                <Link to="/about">About</Link>
                <Link to="/test">test</Link>
                <Link to="/logout"><b>Logout</b></Link>
            </div>
        </nav>
    );
}

export default Navbar;