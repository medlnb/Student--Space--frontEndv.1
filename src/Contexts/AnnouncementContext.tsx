import { createContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";

interface AnnouncementType {
  _id: string,
  Publisher: string,
  Content: string,
  Date: Date,
  speciality: string
}

const default_value = {
  _id: "####",
  Publisher: "####",
  Content: "####",
  speciality: "####",
  Date: new Date()
}

export const AnnouncementsContext = createContext<{ state: AnnouncementType[] , dispatch: any | null }>({
  state: [default_value],
  dispatch: null
})

export const TaskReducer = (state: AnnouncementType[], action: any) => {
  switch (action.type) {
    case "SETANNOUNCEMENTS":
      return action.payload

    case "ADDANNOUNCEMENTS":
      return [...state, action.payload];

    case "REMOVEANNOUNCEMENT":
      return state.filter(task => task._id !== action.payload)

    default:
      return state
  }
}
export const AnnouncementsContextProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer<React.Reducer<AnnouncementType[], any>>(TaskReducer, [default_value])

  const fetchTasks = async () => {
    const response = await fetch(`${Server}/api/announcement/${localStorage.getItem("specIndex")}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const json: AnnouncementType[] = await response.json();
    dispatch({
      type: "SETANNOUNCEMENTS",
      payload: json
    })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <AnnouncementsContext.Provider value={{ state, dispatch }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}