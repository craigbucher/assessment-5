// https://www.codingnepalweb.com/login-and-registration-form-in-html/
// https://www.codinglabweb.com/2022/02/login-registration-form-html-css-javascript.html
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    console.log('Login page loaded')
    const navigate = useNavigate();

    const submitLoginForm = function (event) {
        // this isn't actually necessary, since this isn't in a form. but if it WAS a form, we'd need to prevent default.
        event.preventDefault();
        try {
            axios.post('/login/', { email: event.target[0].value, password: event.target[1].value })
                .then((response) => {
                    console.log('login response from server: ', response)
                    // window.location.reload() // forces hard reload - don't get django token unless logged-in when page loads
                    if (response.data !== 'Invalid login credentials') {
                        navigate("/home");
                    } else {
                        window.alert('Invalid login credentials!')
                        navigate("/login");
                    }

                })


        } catch (e) {
            console.log(e)
            navigate("/login");
        }
    }

    // useEffect(() => {
    //     window.location.reload()
    // }, [])

    return (
        <div>
            <h2>Log In</h2>
            <container>
                <form onSubmit={submitLoginForm} >
                    <br />
                    <label>
                        <input type="email" name="email" placeholder="Email address" className='login' size='30' />
                    </label>
                    <br />

                    <label>
                        <input type="password" name="password" placeholder="Password" className='login' size='30' />
                    </label>
                    <br />
                    <input type="submit" value="Submit" className="submit" />
                    <input type="reset" value="Reset" />
                    <br />
                    <br />
                    <Link to="/Register" className='register'>Register</Link>
                </form>
            </container>
        </div>


    );
}

export default Login;