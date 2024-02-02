import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

interface AnnouncementType {
  _id: string;
  Publisher: string;
  Content: string;
  Date: Date;
  speciality: string;
}

export const AnnouncementsContext = createContext<{
  state: AnnouncementType[] | null;
  dispatch: any | null;
}>({
  state: null,
  dispatch: null,
});

export const AnnouncementReducer = (
  state: AnnouncementType[] | null,
  action: {
    type: "SETANNOUNCEMENTS" | "ADDANNOUNCEMENTS" | "REMOVEANNOUNCEMENT";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETANNOUNCEMENTS":
      return action.payload;

    case "ADDANNOUNCEMENTS":
      return state ? [...state, action.payload] : [action.payload];

    case "REMOVEANNOUNCEMENT":
      if (!state) return;
      return state.filter((task) => task._id !== action.payload);

    default:
      return state;
  }
};
export const AnnouncementsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<
    React.Reducer<AnnouncementType[] | null, any>
  >(AnnouncementReducer, null);

  const fetchTasks = async () => {
    const response = await fetch(
      `${Server}/api/announcement/${user.specIndex}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json: AnnouncementType[] = await response.json();
    dispatch({
      type: "SETANNOUNCEMENTS",
      payload: json,
    });
  };

  useEffect(() => {
    dispatch({
      type: "SETANNOUNCEMENTS",
      payload: null,
    });
    fetchTasks();
  }, [user.specIndex, user.token]);

  return (
    <AnnouncementsContext.Provider value={{ state, dispatch }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
