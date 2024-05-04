
import './App.css'
import Home from './pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Maps from './pages/Maps'
import UserDetails from './pages/UserDetails'
import { useUser } from './context/UserContext'

function App() {
const {isLoggedIn } = useUser()
  return (
    <div className="">
        <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/boarding' element={isLoggedIn ? <GetStarted/> : <Navigate to="/"/>}></Route>
        <Route path='/map' element={isLoggedIn ? <Maps/>  : <Navigate to="/"/>}></Route>
        <Route path='/user/details' element={isLoggedIn ? <UserDetails/> : <Navigate to="/"/>}></Route>
        </Routes>
    </div>
  )
}

export default App
