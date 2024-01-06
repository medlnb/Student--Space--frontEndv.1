import { createContext, useContext, useEffect, useReducer } from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

interface ClassType {
  Module: string,
  Teacher: string,
  description?: string,
  Chapter?: string
}
export const ClassesContext = createContext<{ state: ClassType[][] | null, dispatch: any | null }>({
  state: null,
  dispatch: null
})

const GroupingData = (Data: any) => {
  const groupedData: any = []
  const moduleIndexes = new Map()
  Data.forEach((item: any) => {
    const { Module } = item
    if (!moduleIndexes.has(Module)) {
      moduleIndexes.set(Module, groupedData.length)
      groupedData.push([])
    }
    const index = moduleIndexes.get(Module)
    groupedData[index].push(item)
  })
  return groupedData
}
export const TaskReducer = (state: ClassType[][], action: any) => {
  switch (action.type) {
    case "SETCLASSES":
      return GroupingData(action.payload)

    case "ADDCLASSES":
      if (action.payload[1])
        return GroupingData([...state, action.payload[0], action.payload[1]].flat())
      else
        return GroupingData([...state, action.payload[0]].flat())

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
  const {user} = useContext(AuthContext)
  const fetchNotes = async () => {
    if (!user.speciality || !user.speciality[0])
      return 
    let json = ["dsadsad", "asdsad"]
    let index = 0
    while (json.length !== 0) {
      const response = await fetch(`${Server}/api/file`, {
        method: "POST",
        body: JSON.stringify({
          speciality: user.speciality[0].name,
          p: index,
          Year: user.speciality[0].Year
        }),
        headers: {
          "Content-Type": "Application/json"
        }
      })
      json = await response.json();
      if (json.length === 0) {
        dispatch({
          type: "ADDCLASSES",
          payload: [{
            Module: "end",
            Teacher: ""
          }]
        })
        break
      }
      dispatch({
        type: `${index === 0 ? "SETCLASSES" : "ADDCLASSES"}`,
        payload: json
      })
      index++;
    }


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