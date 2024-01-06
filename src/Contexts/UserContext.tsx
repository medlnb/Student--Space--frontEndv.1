import { createContext, useState } from "react";

interface User {
  username: string | null,
  email: string | null,
  Module?: string | null,
  speciality: { name: string, Admin: boolean, Year: string | boolean }[] | null
}

interface UserContext_type {
  user: User,
  handleUserChange: any
}

// Converting the Speciality variable:
const specs: { name: string, Admin: boolean, Year: string | boolean }[] = []
localStorage.getItem("speciality")?.split("####").map(element => {
  if (element != "")
    specs.push({ name: element.split("$$")[0], Admin: (element.split("$$")[1] === "true"), Year: element.split("$$")[2] })
})

let _default: User = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email") || null,
  speciality: specs || null,
}

if (localStorage.getItem("Module"))
  _default = { ..._default, Module: localStorage.getItem("Module") }

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
      let specialities = ''
      // { name: string, Admin: string }
      user.speciality?.map((spec: any) => {
        specialities += spec.name + "$$" + spec.Admin + "$$" + spec.Year + "####";
      })
      localStorage.setItem("speciality", "" + specialities)
      if (user.Module)
        localStorage.setItem("Module", "" + user.Module)
    } else {
      location.reload()
      localStorage.removeItem("username")
      localStorage.removeItem("email")
      localStorage.removeItem("isTeacher")
      localStorage.removeItem("Module")
      localStorage.removeItem("speciality")
    }
    setUser({ ...user, email: user.email, })
  }
  return (
    <AuthContext.Provider value={{ user, handleUserChange }}>
      {children}
    </AuthContext.Provider>
  )
}