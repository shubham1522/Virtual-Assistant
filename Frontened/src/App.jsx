import React from 'react'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Home from './pages/home'
import { Routes, Route } from 'react-router-dom'
import Customize from './pages/Customize'

function App() {
  return (
    <Routes>  
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/customize" element={<Customize />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App