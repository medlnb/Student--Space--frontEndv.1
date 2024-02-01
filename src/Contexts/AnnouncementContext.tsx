import { createContext, useContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

interface AnnouncementType {
  _id: string;
  Publisher: string;
  Content: string;
  Date: Date;
  speciality: string;
}

const default_value = {
  _id: "####",
  Publisher: "####",
  Content: "####",
  speciality: "####",
  Date: new Date(),
};

export const AnnouncementsContext = createContext<{
  state: AnnouncementType[];
  dispatch: any | null;
}>({
  state: [default_value],
  dispatch: null,
});

export const AnnouncementReducer = (state: AnnouncementType[], action: any) => {
  switch (action.type) {
    case "SETANNOUNCEMENTS":
      return action.payload;

    case "ADDANNOUNCEMENTS":
      return [...state, action.payload];

    case "REMOVEANNOUNCEMENT":
      return state.filter((task) => task._id !== action.payload);

    default:
      return state;
  }
};
export const AnnouncementsContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<React.Reducer<AnnouncementType[], any>>(
    AnnouncementReducer,
    [default_value]
  );

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
    fetchTasks();
  }, [user.specIndex, user.token]);

  return (
    <AnnouncementsContext.Provider value={{ state, dispatch }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
