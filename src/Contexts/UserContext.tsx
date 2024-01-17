import { createContext, useState } from "react";

interface User {
  username: string;
  email: string;
  token: string;
  speciality: { name: string; Admin: boolean; Year: string; Module?: string }[];
  specIndex: number;
  Group: string;
}

interface UserContext_type {
  user: User;
  handleUserChange: any;
}

const specs: { name: string; Admin: boolean; Year: string; Module?: string }[] =
  [];
const specialityString = localStorage.getItem("speciality");
if (specialityString) {
  specialityString.split("####").forEach((element) => {
    if (element !== "") {
      const spec: {
        name: string;
        Admin: boolean;
        Year: string;
        Module?: string;
      } = {
        name: element.split("$$")[0],
        Admin: element.split("$$")[1] === "true",
        Year: element.split("$$")[2],
      };

      if (
        element.split("$$")[3] !== undefined &&
        element.split("$$")[3] !== "undefined"
      ) {
        spec.Module = element.split("$$")[3];
      }
      specs.push(spec);
    }
  });
}

let _default: User = {
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  speciality: specs,
  specIndex: parseInt(localStorage.getItem("specIndex") + "") || 0,
  Group: localStorage.getItem("Group") || "main",
};

export const AuthContext = createContext<UserContext_type>({
  user: _default,
  handleUserChange: null,
});

export const AuthContextProvider = ({ children }: any) => {
  // State for holding the current user and a function to change it
  const [user, setUser] = useState<User>(_default);

  // Function to update the state when a change occurs in the user's data

  const handleUserChange = (userinfo: User) => {
    // to log in by adding the user infomation to the local storage
    if (userinfo.username) {
      localStorage.setItem("username", userinfo.username);
      localStorage.setItem("email", userinfo.email);
      localStorage.setItem("token", userinfo.token);
      localStorage.setItem("specIndex", "" + userinfo.specIndex);

      let specialities = "";
      userinfo.speciality?.map(
        (spec: {
          name: string;
          Admin: boolean;
          Year: string;
          Module?: string;
        }) => {
          specialities +=
            spec.name +
            "$$" +
            spec.Admin +
            "$$" +
            spec.Year +
            "$$" +
            spec.Module +
            "####";
        }
      );
      localStorage.setItem("speciality", "" + specialities);
      setUser({ ...userinfo, email: userinfo.email });
    } else if (userinfo.Group) {
      localStorage.setItem("Group", "" + userinfo.Group);
      return setUser((prev) => ({ ...prev, Group: userinfo.Group }));
    }
    // to log out by deleting the user infomation from the local storage
    else {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("speciality");
      localStorage.removeItem("specIndex");
      localStorage.removeItem("token");
      setUser({ ...userinfo, email: userinfo.email });
    }
    console.log("out");
  };
  // console.log(user);
  return (
    <AuthContext.Provider value={{ user, handleUserChange }}>
      {children}
    </AuthContext.Provider>
  );
};
