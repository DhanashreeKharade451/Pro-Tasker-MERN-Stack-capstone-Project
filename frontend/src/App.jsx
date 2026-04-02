import { useEffect } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'


import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import Task from './pages/Task'

import Navbar from './components/Navbar'


function App() {
  useEffect(() => {
    // async function getData() {
    //   const response = await fetch('http://localhost:3000')
    //   const data = await response.json()
    //   console.log(data)
    // }
    // getData( )
  },[])

  return (
    <>
       <Navbar/>

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/project/:id" element={<Project/>}/>
      {/* <Route path="/task" element={<Task/>}/> */}

    </Routes>
    </>
  )
}

export default App
