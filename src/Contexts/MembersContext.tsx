import { createContext, useContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

interface MemberType {
  _id: string;
  username: string;
  email: string;
  speciality: {
    name: string;
    Year: string;
    Admin?: boolean;
    Module?: string;
  }[];
}
const default_value = [
  {
    username: "Default",
    _id: "Default",
    email: "Default",
    speciality: [],
  },
];
export const MembersContext = createContext<{
  state: MemberType[];
  dispatch: any;
}>({
  state: default_value,
  dispatch: null,
});

export const MemberReducer = (state: MemberType[], action: any) => {
  switch (action.type) {
    case "SETMEMBERS":
      return action.payload;

    default:
      return state;
  }
};

export const MembersContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer<React.Reducer<MemberType[], any>>(
    MemberReducer,
    default_value
  );

  const fetchMembers = async () => {
    //maybe change this latter for better preformance
    const response = await fetch(
      `${Server}/api/user/users/${localStorage.getItem("specIndex")}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const json: MemberType[] = await response.json();

    dispatch({
      type: "SETMEMBERS",
      payload: json,
    });
  };

  useEffect(() => {
    fetchMembers();
  }, [user.specIndex, user.token]);

  return (
    <MembersContext.Provider value={{ state, dispatch }}>
      {children}
    </MembersContext.Provider>
  );
};
