'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: number
  username: string | undefined
  email: string
  provider: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserState(JSON.parse(storedUser))
    }
  }, [])

  const setUser = (newUser: User | null) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
    setUserState(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
