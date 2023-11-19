import { createContext, useEffect, useReducer } from "react";

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
  deadLine: date | null
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
    deadLine: null
  }
  const [state, dispatch] = useReducer<React.Reducer<TaskType[], any>>(TaskReducer, [default_value])


  const fetchNotes = async () => {
    const response = await fetch(`https://student-space-backend.onrender.com/api/task`)
    const json: TaskType[] = await response.json();
    dispatch({
      type: "SETTASKS",
      payload: json
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}