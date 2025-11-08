import React, { useContext } from 'react'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Home from './pages/home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'

function App() {
  const { userData, setUserData } = useContext(userDataContext)
  return (
    <Routes>
      <Route path="/customize" element={userData ? <Customize /> : <Navigate to={"/signin"} />} />
      <Route path="/" element={(userData?.assistantImage && userData?.assistantname) ? <Home /> : <Navigate to={"/customize"} />} />
      <Route path="/signin" element={!userData ? <Signin /> : <Navigate to={"/"} />} />
      <Route path="/signup" element={!userData ? <Signup /> : <Navigate to={"/"} />} />
    </Routes>
  )
}

export default App