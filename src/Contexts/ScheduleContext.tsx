import { createContext, useEffect, useState } from "react";
import { ScheduleDefault } from '../Data/ScheduleData'

export const ScheduleContext = createContext<any>(ScheduleDefault)

export const ScheduleContextProvider = ({ children }: any) => {

  const [ScheduleData, setScheduleData] = useState(ScheduleDefault.ScheduleData)

  useEffect(() => {
    const fetchingSchedule = async () => {
      const response = await fetch("https://student-space-back-end.vercel.app/api/schedule")
      const json = await response.json()
      setScheduleData(json)
    }
    setTimeout(fetchingSchedule, 2000)

  }, [])

  return (
    <ScheduleContext.Provider value={{ ScheduleData, setScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  )
}