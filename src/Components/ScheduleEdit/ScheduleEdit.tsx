import { useContext } from 'react';
import SideScheduleElement from '../SideScheduleElement/SideScheduleElement';
import './ScheduleEdit.css'
import { ScheduleContext } from '../../Contexts/ScheduleContext';

interface scheduleDayType {
  id: number,
  module: string,
  Classroom: string,
  type: "Lecture" | "TP" | "TD" | "EL" | ""
}

function zip(array0: any[][], array1: any[]) {
  const copyOfarray0 = JSON.parse(JSON.stringify(array0));
  for (let i = 0; i < array1.length; i++) {
    copyOfarray0[i].unshift(array1[i]);
  }
  return copyOfarray0
}

function ScheduleEdit() {
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const classes = ['', "8.00", "9.40", "11.20", "13.10", "14.50", "16.30"]
  const { ScheduleData, setScheduleData } = useContext(ScheduleContext)
  if (ScheduleData.length == 0)
    return

  const handleChange = async (event: any, id: number, option: "module" | "type" | "Classroom") => {
    const updatedScheduleData = [...ScheduleData];

    for (let row = 0; row < updatedScheduleData.length; row++) {
      for (let col = 0; col < updatedScheduleData[row].length; col++) {
        const item = updatedScheduleData[row][col];
        if (item.id === id) {
          if (option === "module" && event.target.value == "") {
            updatedScheduleData[row][col] = {
              ...item,
              module: "",
              type: "",
              Classroom: ""
            }
          }

          else {
            updatedScheduleData[row][col] = {
              ...item,
              [option]: event.target.value,
            }
          }
        }
      }
    }
    setScheduleData(updatedScheduleData);
    await fetch("https://student-space-backend.onrender.com/api/schedule", {
      method: "PATCH",
      body: JSON.stringify(ScheduleData),
      headers: {
        "Content-Type": "Application/json"
      }
    })

  };

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