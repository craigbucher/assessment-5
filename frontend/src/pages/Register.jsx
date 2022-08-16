// https://www.codingnepalweb.com/login-and-registration-form-in-html/
// https://www.codinglabweb.com/2022/02/login-registration-form-html-css-javascript.html

import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    console.log('Register page loaded')
    const navigate = useNavigate();

    const submitSignupForm = function (event) {
        // this isn't actually necessary, since this isn't in a form. but if it WAS a form, we'd need to prevent default.
        event.preventDefault()
        axios.post('/signup/', { first_name: event.target[0].value, last_name: event.target[1].value, email: event.target[2].value, password: event.target[3].value }).then((response) => {
            console.log('response from server: ', response)
        })
        navigate("/login");
    }

    return (
        <div>
            <h2>New User Registration</h2>
            <br />
            <h3>Please complete the following:</h3>
            <container>
                <form onSubmit={submitSignupForm} >
                    <br />
                    <label>
                        <input type="first_name" name="first_name" placeholder="First Name" className='login' size='30' />
                    </label>
                    <br />
                    <label>
                        <input type="last_name" name="last_name" placeholder="Last Name" className='login' size='30' />
                    </label>
                    <br />
                    <label>
                        <input type="email" name="email" placeholder="Email address" className='login' size='30' />
                    </label>
                    <br />

                    <label>
                        <input type="password" name="password" placeholder="Password" className='login' size='30' />
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Submit" className="submit" />
                    <input type="reset" value="Reset" />
                </form>
            </container>
        </div>


    );
}

export default Register;