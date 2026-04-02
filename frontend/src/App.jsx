import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import Projects from "./pages/Projects";

import userClient from "./clients/api";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Project from './pages/Project'
// import Task from './pages/Task'

import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    // async function getData() {
    //   const response = await fetch('http://localhost:3000')
    //   const data = await response.json()
    //   console.log(data)
    // }
    // getData( )
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route
          path = "/projects" element=
          {
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/task" element={<Task/>}/> */}
      </Routes>
    </>
  );
}

export default App;
