
import './App.css'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { jwtDecode } from "jwt-decode";
import Home from './pages/Home'
import GetStarted from './pages/GetStarted'
import Maps from './pages/Maps'
import UserDetails from './pages/UserDetails'
import { useUser } from './context/UserContext'

function App() {
const {isLoggedIn, setIsLoggedIn, setUserInfo} = useUser()

useEffect(() => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    setIsLoggedIn(true);
    const decodedToken = jwtDecode(authToken);
    setUserInfo(decodedToken);
  }
}, []);


  return (
    <div className="">
        <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/boarding' element={isLoggedIn ? <GetStarted/> : <Navigate to="/"/>}></Route>
        <Route path='/map' element={isLoggedIn ? <Maps/>  : <Navigate to="/"/>}></Route>
        <Route path='/user/details' element={<UserDetails/>}></Route>
        </Routes>
    </div>
  )
}

export default App
