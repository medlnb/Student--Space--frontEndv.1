import { createContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";

interface AnnouncementType {
  _id: string,
  Publisher: string,
  Content: string,
  Date: Date,
  speciality:string
}

export const AnnouncementsContext = createContext<{ state: AnnouncementType[] | null, dispatch: any | null }>({
  state: null,
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

  const default_value = {
    _id: "####",
    Publisher: "####",
    Content: "####",
    speciality:"####",
    Date: new Date()
  }
  const [state, dispatch] = useReducer<React.Reducer<AnnouncementType[], any>>(TaskReducer, [default_value])

  const fetchTasks = async () => {
    const response = await fetch(`${Server}/api/Announcement`)
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