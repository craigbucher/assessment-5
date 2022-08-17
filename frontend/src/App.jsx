import { useState, useEffect } from 'react'

import './App.css'

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import Home from './pages/Home'
import NavBar from './components/Navbar'
import NavBarUnauth from './components/NavbarUnauth'
import Hives from './pages/Hives'
import NewHive from './pages/NewHive'
import HiveList from './pages/HiveList'
import HiveDetail from './pages/HiveDetail';
import Inspections from './pages/Inspections'
import InspectionList from './pages/InspectionList'
import InspectionDetail from './pages/InspectionDetail'
import NewInspection from './pages/NewInspection'
import About from './pages/About'
import NotFound from './pages/NotFound';
import Test from './pages/APITest';
import Login from './pages/Login'
import Logout from './pages/Logout'
import DeleteHive from './pages/Delete';
import Register from './pages/Register';

// Outside of 'App' component because it really has nothing to do with react; it' just parsing strings
const getCSRFToken = () => {
  let csrfToken

  // the browser's cookies for this page are all in one string, separated by semi-colons
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    // individual cookies have their key and value separated by an equal sign
    const crumbs = cookie.split('=')
    if (crumbs[0].trim() === 'csrftoken') {
      csrfToken = crumbs[1]
    }
  }
  return csrfToken
}
console.log('token? ', getCSRFToken())
// by setting as default, any axios request will have CSRF token included as a header
// axios code for this is at docs.djangoproject.com/en/4.0/ref/csrf/
axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()


function App() {
  const [user, setUser] = useState(null)  // <== user login state; inital = null, because no one logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // let isAuthenticated = true  // for NavBar switching

  const whoAmI = async () => {    // in real project, should go in separate file (say, 'utils.js')
    const response = await axios.get('/whoami')
    // Below is primitive error checking - 'response.data' and 'response.data[0] must exist
    // otherwise just returns 'undefined'; If both exist, returns 'response.data[0].fields'
    const user = response.data && response.data[0] && response.data[0].fields
    // console.log('user from whoami? ', user, response)
    setUser(user)
    console.log(user)
    if (user !== undefined) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {  // on page load, runs 'whoAmI', which sets 'user' 
    whoAmI()
  }, [])

  return (
    <Router>
      <div className="App">
        {(isAuthenticated) && <NavBar />}
        {!isAuthenticated && <NavBarUnauth />}
        {/* <NavBar /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hives" element={<Hives />} />
            <Route path="/newhive" element={<NewHive />} />
            <Route path="/hivelist" element={<HiveList />} />
            <Route path="/hivedetail/:hiveId" element={<HiveDetail />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/newinspection" element={<NewInspection />} />
            <Route path="/inspectionlist" element={<InspectionList />} />
            <Route path="/inspectiondetail/:inspectId" element={<InspectionDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<main style={{ padding: "1rem" }}>
              <p>This is test text</p>
            </main>} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/delete/:hiveId" element={<DeleteHive />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div >
    </Router>
  )
}

export default App
