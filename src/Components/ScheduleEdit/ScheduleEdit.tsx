import { useContext } from 'react';
import SideScheduleElement from '../SideScheduleElement/SideScheduleElement';
import './ScheduleEdit.css'
import { ScheduleContext } from '../../Contexts/ScheduleContext';
// import { Server } from '../../Data/API';

interface scheduleDayType {
  id: number,
  module: string,
  Classroom: string,
  type: string
}

function zip(array0: any[][], array1: any[]) {
  const copyOfarray0 = JSON.parse(JSON.stringify(array0))
  for (let i = 0; i < array1.length; i++) {
    copyOfarray0[i].unshift(array1[i])
  }
  return copyOfarray0
}

function ScheduleEdit() {
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const classes = ['', "8.00", "9.40", "11.20", "13.10", "14.50", "16.30"]
  const { ScheduleData, setScheduleData } = useContext(ScheduleContext) 
  if (ScheduleData.length === 0)
    return

  const handleChange = async (event: any, id: number, option: "module" | "type" | "Classroom") => {
    // Update ScheduleData
    
    const updatedScheduleData = ScheduleData.map(row =>
      row.map(item => {
        if (item.id === id) {
          return option === "module" && event.target.value === ""
            ? { ...item, module: "", type: "", Classroom: "" }
            : { ...item, [option]: event.target.value };
        }
        return item;
      })
    );

    // Set the updated ScheduleData
    setScheduleData(updatedScheduleData)



    const table = updatedScheduleData.flat()
    const newSchedule = {
      Class: "1ermasterAi&DS",
      Group: "0",
      modules: table.map(day => day.module),
      Classrooms: table.map(day => day.Classroom),
      types: table.map(day => day.type),
    };
    
   
    await fetch(`http://localhost:4000/api/newSchedule/1ermasterAi&DS@0`, {
      method: "PATCH",
      body: JSON.stringify(newSchedule),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  const formedSchedule: (scheduleDayType | string)[][] = zip(ScheduleData, days)
  formedSchedule.unshift(classes)

  let key = 0
  const schedule: JSX.Element[] = []
  formedSchedule.map(element => {
    element.map((subElement, index) => {
      schedule.push(
        <SideScheduleElement
          handleChange={handleChange}
          source={"EditSchedule"}
          key={key}
          index={index}
          scheduleDay={subElement} />)
      key++
    }
    )
  })


  return (
    <div className='scheduleedit--container' >
      {schedule}
    </div>
  )
}

export default ScheduleEdit