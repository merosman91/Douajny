import { createContext, useContext, useState } from "react"
import { getCurrentUser, logout } from "./authService"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser())

  const signOut = () => {
    logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
