import { createContext, useContext, useEffect, useState } from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";
interface scheduleDayType {
  id: number,
  module: string,
  Classroom: string,
  type: string
}
export const ScheduleContext = createContext<{
  ScheduleData: scheduleDayType[][],
  setScheduleData: React.Dispatch<React.SetStateAction<scheduleDayType[][]>>
}>
  ({
    ScheduleData: [],
    setScheduleData: () => { }
  })

export const ScheduleContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext)
  const day = {
    id: 1000000000,
    module: " ",
    Classroom: " ",
    type: " "
  }
  const [ScheduleData, setScheduleData] = useState<scheduleDayType[][]>(
    [[day, day, day, day, day, day],
      [day, day, day, day, day, day],
      [day, day, day, day, day, day],
      [day, day, day, day, day, day],
      [day, day, day, day, day, day],
      [day, day, day, day, day, day]]
  )
  useEffect(() => {
    const fetchingSchedule = async () => {
      if (!user.speciality)
        return
      const response = await fetch(`${Server}/api/newSchedule/get`, {
        method: "POST",
        body: JSON.stringify({
          Class: user.speciality[0].name,
          Group: 0,
          Year: user.speciality[0].Year
        }),
        headers: {
          "Content-Type": "Application/json"
        }
      })
      const json = await response.json()
      const scheduledata: scheduleDayType[][] = [[], [], [], [], [], []];

      for (let index = 0; index < 36; index++) {
        const day = {
          id: index + 1,
          Classroom: json.Classrooms[index],
          type: json.types[index],
          module: json.modules[index],
        };
        const arrayIndex = Math.floor(index / 6)
        scheduledata[arrayIndex].push(day)
      }
      setScheduleData(scheduledata)
    }
    fetchingSchedule()
  }, [])
  return (
    <ScheduleContext.Provider value={{ ScheduleData, setScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  )
}