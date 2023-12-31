import { createContext, useState } from "react";

interface User {
  username: string,
  email: string,
  Module?: string,
  speciality: { name: string, Admin: boolean, Year: string, Module?: string }[]
}

interface UserContext_type {
  user: User,
  handleUserChange: any
}

const specs: { name: string, Admin: boolean, Year: string, Module?: string }[] = [];
const specialityString = localStorage.getItem("speciality");
if (specialityString) {
  specialityString.split("####").forEach(element => {
    if (element !== "") {
      const spec: { name: string, Admin: boolean, Year: string, Module?: string } = {
        name: element.split("$$")[0],
        Admin: element.split("$$")[1] === "true",
        Year: element.split("$$")[2],
      };

      if (element.split("$$")[3] !== undefined && element.split("$$")[3] !== "undefined") {
        spec.Module = element.split("$$")[3];
      }

      specs.push(spec);
    }
  });
}


let _default: User = {
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  speciality: specs,
}

export const AuthContext = createContext<UserContext_type>({
  user: _default,
  handleUserChange: null
});

export const AuthContextProvider = ({ children }: any) => {

  // State for holding the current user and a function to change it
  const [user, setUser] = useState<User>(_default)

  // Function to update the state when a change occurs in the user's data
  const handleUserChange = (user: User) => {

    // to log in by adding the user infomation to the local storage
    if (user.username) {
      localStorage.setItem("username", user.username)

      localStorage.setItem("email", user.email)

      let specialities = ''
      user.speciality?.map((spec: { name: string, Admin: boolean, Year: string, Module?: string }) => {
        specialities += spec.name + "$$" + spec.Admin + "$$" + spec.Year + "$$" + spec.Module + "####";
      })
      localStorage.setItem("speciality", "" + specialities)

      if (user.Module)
        localStorage.setItem("Module", "" + user.Module)
    }
    // to log out by deleting the user infomation from the local storage
    else {
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