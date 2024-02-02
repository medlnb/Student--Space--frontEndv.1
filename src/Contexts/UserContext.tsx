import { ReactNode, createContext, useReducer } from "react";

interface User {
  username: string;
  email: string;
  token: string;
  speciality: { name: string; Admin: boolean; Year: string; Module?: string }[];
  specIndex: number;
  Group: [string] | string;
}

interface UserContext_type {
  user: User;
  dispatchUser: any;
}

// Web App version check
if (localStorage.getItem("V") !== "1.0.0") {
  localStorage.clear(); 
}

export const AuthContext = createContext<UserContext_type>({
  user: {
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    token: localStorage.getItem("token") || "",
    speciality: JSON.parse(localStorage.getItem("speciality") + ""),
    specIndex: parseInt(localStorage.getItem("specIndex") + "") || 0,
    Group: localStorage.getItem("Group") || "main",
  },
  dispatchUser: null,
});

export const UserReducer = (
  state: User,
  action: {
    type:
      | "SETUSER"
      | "CHANGEGROUP"
      | "LOGOUT"
      | "CHANGETOKEN"
      | "CHANGEspecIndex"
      | "NEWSPEC";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETUSER":
      //Set App Version
      localStorage.setItem("V", "1.0.0");
      //Set User version
      localStorage.setItem("__v", action.payload.__v);
      // to log in by adding the user infomation to the local storage
      localStorage.setItem("Types", "TD$TP$");
      localStorage.setItem("ClassRooms", "ClassRoom 24$ClassRoom 22$");
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("specIndex", action.payload.specIndex);
      localStorage.setItem(
        "speciality",
        JSON.stringify(action.payload.speciality)
      );

      return {
        ...action.payload,
        email: action.payload.email,
        Group: localStorage.getItem("Group") || "main",
      };

    case "CHANGEGROUP":
      localStorage.setItem("Group", action.payload);
      return { ...state, Group: action.payload };

    case "LOGOUT":
      localStorage.clear();
      return {
        username: "",
        email: "",
        token: "",
        speciality: [],
        specIndex: 0,
        Group: "main",
      };

    case "CHANGEspecIndex":
      localStorage.setItem("specIndex", "" + action.payload);
      return { ...state, specIndex: action.payload };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatchUser] = useReducer<React.Reducer<User, any>>(
    UserReducer,
    {
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
      token: localStorage.getItem("token") || "",
      speciality: JSON.parse(localStorage.getItem("speciality") + ""),
      specIndex: parseInt(localStorage.getItem("specIndex") + "") || 0,
      Group: localStorage.getItem("Group") || "main",
    }
  );
  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
