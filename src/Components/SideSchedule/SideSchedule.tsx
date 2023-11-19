import { useContext } from 'react';
import SideScheduleElement from '../SideScheduleElement/SideScheduleElement';
import './SideSchedule.css'
import { ScheduleContext } from '../../Contexts/ScheduleContext';

interface scheduleDayType {
  id: number,
  module: string ,
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

function SideSchedule() {
  
  const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const classes = ['', "8.00", "9.40", "11.20", "13.10", "14.50", "16.30"]
  const { ScheduleData } = useContext(ScheduleContext)
  if (ScheduleData.length == 0)
    return
  
  const formedSchedule: (scheduleDayType | string)[][] = zip(ScheduleData, days)
  formedSchedule.unshift(classes)

  let key = 0
  const schedule: JSX.Element[] = []
  formedSchedule.map(element => {
    element.map((subElement, index) => {
      schedule.push(
        <SideScheduleElement
          key={key}
          index={index}
          scheduleDay={subElement} />)
      key++
    }
    )
  })

  return (
    <div className='sideschedule--container--big'>
      <h3 className='sideschedule--title'>Schedule</h3>
      <div className='sideschedule--container'>
        {schedule}
      </div>
    </div>
  )
}

export default SideSchedule