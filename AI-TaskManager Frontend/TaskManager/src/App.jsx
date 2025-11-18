
import Navbar from '../src/Components/Navbar'
import './App.css'
import SignUp from './Components/SignUp'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import MyTaskList from './Components/MyTaskList'
import NotificationList from './Components/NotificationList'

function App() {

  //api key for google ai studio  AIzaSyDDL8FkmohUOXGY2EQbXfpsmpkYc7Pbc84
  return (
    <>
    <Navbar></Navbar>
    <Routes>

      <Route exact path='/tasks' element={<MyTaskList />}/>
      <Route exact path='/notification' element={<NotificationList />} />

    <Route exact path='/login' element={<Login />}/>
    <Route exact path='/signup' element={<SignUp />}/>
    <Route exact path='/profile' element={<Home />}/>
    <Route exact path='/home' element={<Dashboard />}/>
    <Route exact path='/' element={<Dashboard />}/>
    </Routes>
    </>
  )
}

export default App
