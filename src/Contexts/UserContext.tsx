import { createContext, useState } from "react";

interface User {
  username: string | null,
  email: string | null,
  isTeacher?:string | null
}

interface UserContext_type {
  user: User,
  handleUserChange: any
}

let _default: User = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email")
}
if (localStorage.getItem("isTeacher"))
  _default = { ..._default, isTeacher: localStorage.getItem("isTeacher") }

export const AuthContext = createContext<UserContext_type>({
  user: _default,
  handleUserChange: null
});

export const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<User>(_default)
  const handleUserChange = (user: User) => {
    if (user.username) {        
      localStorage.setItem("username", "" + user.username)
      localStorage.setItem("email", "" + user.email)
      if (user.isTeacher)
        localStorage.setItem("isTeacher", "" + user.isTeacher)
    } else {
      location.reload()
      localStorage.clear()
    }
    console.log(user)
    setUser(user)
  }
  return (
    <AuthContext.Provider value={{ user, handleUserChange }}>
      {children}
    </AuthContext.Provider>
  )
}