import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
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

export const MembersContext = createContext<{
  state: MemberType[] | null;
  dispatch: any;
}>({
  state: null,
  dispatch: null,
});

export const MemberReducer = (
  state: MemberType[] | null,
  action: {
    type: "SETMEMBERS";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETMEMBERS":
      return action.payload;

    default:
      return state;
  }
};

export const MembersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useContext(AuthContext);
  const [state, dispatch] = useReducer<React.Reducer<MemberType[] | null, any>>(
    MemberReducer,
    null
  );

  const fetchMembers = async () => {
    //maybe change this latter for better preformance
    const response = await fetch(`${Server}/api/user/users/${user.specIndex}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json: MemberType[] = await response.json();

    dispatch({
      type: "SETMEMBERS",
      payload: json,
    });
  };

  useEffect(() => {
    dispatch({
      type: "SETMEMBERS",
      payload: null,
    });
    fetchMembers();
  }, [user.specIndex, user.token]);

  return (
    <MembersContext.Provider value={{ state, dispatch }}>
      {children}
    </MembersContext.Provider>
  );
};
