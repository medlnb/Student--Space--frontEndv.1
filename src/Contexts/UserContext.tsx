import { createContext, useState } from "react";
// import { User } from "../Models/Models";

interface User {
  username: string | null,
  email: string | null,
  token: string | null
}

interface UserContext_type {
  user: User,
  handleUserChange: any
}

const _default: User = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  token: localStorage.getItem("token")
}

export const AuthContext = createContext<UserContext_type>({
  user: _default,
  handleUserChange: null
});

export const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>(_default)
  const handleUserChange = (user: User) => {
    if (user.username) {
      localStorage.setItem("username", "" + user.username)
      localStorage.setItem("token", "" + user.token)
      localStorage.setItem("email", "" + user.email)
    } else {
      localStorage.clear()
    }
    setUser(user)
  }
  return (
    <AuthContext.Provider value={{ user, handleUserChange }}>
      {children}
    </AuthContext.Provider>
  )
}