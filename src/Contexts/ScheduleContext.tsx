import { createContext, useEffect, useState } from "react";
// import { Server } from "../Data/API";

interface scheduleDayType {
  id: number,
  module: string,
  Classroom: string,
  type: string
}
export const ScheduleContext = createContext<{ ScheduleData: scheduleDayType[][] , setScheduleData: React.Dispatch<React.SetStateAction<scheduleDayType[][]>> }>({ ScheduleData: [], setScheduleData: () => {} })

export const ScheduleContextProvider = ({ children }: any) => {

  const [ScheduleData, setScheduleData] = useState<scheduleDayType[][]>([])
  useEffect(() => {
    const fetchingSchedule = async () => {
      const response = await fetch(`http://localhost:4000/api/newSchedule/1ermasterAi&DS@0`)
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