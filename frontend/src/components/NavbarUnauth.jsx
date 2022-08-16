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
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;