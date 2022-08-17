// sfc = 'stateless functional component'
import { Link } from 'react-router-dom';
import Beehive from '../assets/beehive-sm.png'
import React, { useState } from 'react';
import Popup from '../components/Popup';
// console.log('Navbar loaded')

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div><nav className="navbar">
            <img className='beehive' src={Beehive}></img>
            <h2>Apis: Beehive Management</h2>
            <div className="links">
                <Link to="/login">Login</Link>
                <Link to="#" onClick={() => togglePopup()}>About</Link>
            </div>
        </nav>
            {isOpen && <Popup
                content={<>
                    <h2 className='popup-text'>About Apis:</h2>
                    <br />
                    <p><b className='popup-text'>Apis is an application to help you manage and record your periodic beehive inspections.  You can create an instance for each hive in your apiary and create and review inspection records for each hive. Hive records include the latitude and longitude of the installation location (which are auto-populated), breed of the bees installed, physical hive characteristics such as body depth and frame count, as well as a note section for additional specifications.<br />
                        Inspection records include the inspection date, current temperature, humidity and pollen count (which are auto-populated through geolocation data), queen sightings, supplements and medications and any observations of disease.  Each record includes an unlimited-sized notes section for any additional observations or narrative that you'd like to record with the inspection.</b><br /></p>

                </>}
                handleClose={togglePopup}
            />}
        </div>
    );
}

export default Navbar;