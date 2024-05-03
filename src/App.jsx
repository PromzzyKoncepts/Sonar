
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Maps from './pages/Maps'

function App() {

  return (
    <div className="">
        <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path='/boarding' element={<GetStarted/>}></Route>
        <Route path='/map' element={<Maps/>}></Route>
        </Routes>
    </div>
  )
}

export default App
