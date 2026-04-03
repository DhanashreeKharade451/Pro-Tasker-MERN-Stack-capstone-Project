import { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import ProjectPage from "./pages/ProjectPage";
import Projects from "./pages/Projects";

import userClient from "./clients/api";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import Task from './pages/Task'


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
        Default Route
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/projects"
          element={
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

        <Route 
  path="/tasks/:id" 
  element={
    <ProtectedRoute>
      <TaskPage />
    </ProtectedRoute>
  } 
/>

<Route path="/dashboard" element={<Dashboard />} />

        
      </Routes>
    </>
  );
}

export default App;
