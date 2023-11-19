import { createContext, useEffect, useReducer } from "react";

interface ClassType {
  Module: string,
  Teacher: string,
  description?: string
}
export const ClassesContext = createContext<{ state: ClassType[][] | null, dispatch: any | null }>({
  state: null,
  dispatch: null
})
export const TaskReducer = (state: ClassType[][], action: any) => {
  switch (action.type) {
    case "SETCLASSES":
      return action.payload

    case "ADDCLASSES":
      return [...state, action.payload];

    // case "REMOVETASK":
    //   return state.filter(task => task._id !== action.payload)

    default:
      return state
  }
}
export const ClassesContextProvider = ({ children }: any) => {

  const default_value = {
    Module: "default_value",
    Teacher: ""
  }
  const [state, dispatch] = useReducer<React.Reducer<ClassType[][], any>>(TaskReducer, [[default_value]])


  const fetchNotes = async () => {
    const response = await fetch(`https://student-space-backend.onrender.com/api/file`)
    const json: ClassType[] = await response.json();
    dispatch({
      type: "SETCLASSES",
      payload: json
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <ClassesContext.Provider value={{ state, dispatch }}>
      {children}
    </ClassesContext.Provider>
  );
}