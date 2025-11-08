import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000"
  const [userData, setUserData] = useState(null)
  const [selected, setSelected] = useState(null);
  const [customImage, setCustomImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      // backend exposes current user at /api/user/current
      const res = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
      setUserData(res.data)
      console.log("Current user data:", res.data)
    } catch (error) {
      console.error("Error fetching current user:", error.response?.data || error.message)
    }
  }

  useEffect(() => {
    handleCurrentUser()
  }, [])

  const value = {
    serverUrl,
    userData,
    setUserData
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext