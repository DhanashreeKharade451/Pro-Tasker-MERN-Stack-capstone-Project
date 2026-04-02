import { useEffect } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'


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
    <Routes>
      <Route path="/login" element={null}/>
      <Route path="/register" element={null}/>
      <Route path="/dashboard" element={null}/>
      <Route path="/project" element={null}/>
      <Route path="/task" element={null}/>

    </Routes>
    </>
  )
}

export default App
