import { createContext, useContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

interface date {
  day: number;
  month: number;
  year: number;
  time: string;
}
interface TaskType {
  _id?: string,
  className: string,
  taskTitle: string,
  Link: string,
  Description: string,
  deadLine: date | null,
  speciality: string
}

export const TasksContext = createContext<{ state: TaskType[] | null, dispatch: any | null }>({
  state: null,
  dispatch: null
})
export const TaskReducer = (state: TaskType[], action: any) => {
  switch (action.type) {
    case "SETTASKS":
      return action.payload

    case "ADDTASK":
      return [...state, action.payload];

    case "REMOVETASK":
      return state.filter(task => task._id !== action.payload)

    default:
      return state
  }
}
export const TasksContextProvider = ({ children }: any) => {

  const default_value = {
    _id: "default_value",
    className: "",
    taskTitle: "",
    Description: "",
    Link: "",
    speciality: "",
    deadLine: null
  }
  const [state, dispatch] = useReducer<React.Reducer<TaskType[], any>>(TaskReducer, [default_value])
  const { user } = useContext(AuthContext)
  const fetchTasks = async () => {
    const response = await fetch(`${Server}/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        speciality: user.speciality[0].name,
        Year: user.speciality[0].Year
      })
    })
    const json: TaskType[] = await response.json();
    dispatch({
      type: "SETTASKS",
      payload: json
    })
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}