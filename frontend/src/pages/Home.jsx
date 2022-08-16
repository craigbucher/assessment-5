import { useReducer } from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

console.log('Home loaded')
function HomePage() {
    const [count, setCount] = useState(0)

    const [user, setUser] = useState(null)  // <== user login state; inital = null, because no one logged in

    const whoAmI = async () => {    // in real project, should go in separate file (say, 'utils.js')
        const response = await axios.get('/whoami')
        // Below is primitive error checking - 'response.data' and 'response.data[0] must exist
        // otherwise just returns 'undefined'; If both exist, returns 'response.data[0].fields'
        const user = response.data && response.data[0] && response.data[0].fields
        // console.log('user from whoami? ', user, response)
        setUser(user)
        console.log(user)
    }

    useEffect(() => {  // on page load, runs 'whoAmI', which sets 'user' 
        whoAmI()
    }, [])

    return (
        <div className="HomePage">

            <h2>Welcome to Apis Beehive Management, {user && user.username}!</h2>
            <br />
            <h2>Please select an option from the toolbar above ⇧</h2>

        </div>
    )
}

export default HomePage;






