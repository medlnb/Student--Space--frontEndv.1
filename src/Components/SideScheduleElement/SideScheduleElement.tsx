import './SideScheduleElement.css'
import { nanoid } from 'nanoid'

interface scheduleDayType {
  module: string | "",
  Classroom: string | "",
  type: "Lecture" | "TP" | "TD" | "EL" | "",
  id: number
}

interface props {
  scheduleDay: scheduleDayType | string,
  index: number,
  source?: string,
  handleChange?: any
}

function getShortCut(str: string) {
  const words = str.split(' ')
  if (words.length == 1)
    return str

  const firstLetters = words.map(word => {
    if (!isNaN(parseFloat(word)))
      return word
    return word[0]
  })
  return firstLetters.join('')
}

function moveStringToFirst(arr: string[], str: string) {
  const index = arr.indexOf(str)
  if (index !== -1) {
    arr.splice(index, 1)
    arr.unshift(str)
  }
  return arr;
}

function SideScheduleElement({ scheduleDay, index, source, handleChange }: props) {

  if (typeof scheduleDay === 'string')
    return (
      <div className='SideScheduleElement--container empty'>
        <p>{scheduleDay}</p>
      </div>
    )

  const typeList = ["Lecture", "TP", "TD", "EL", ""]

  const Modules = ["Image Numérique", "Programming for Data Science",
    "Data exploration and visualization", "Mathematics for Machine Learning 1",
    "Anglais", ""]

  const ClassroomList = ["Classroom 24", "Classroom 22", "Labo 7", ""]

  moveStringToFirst(typeList, scheduleDay.type)
  moveStringToFirst(Modules, scheduleDay.module)
  moveStringToFirst(ClassroomList, scheduleDay.Classroom)



  const Classroomoptions = ClassroomList.map((element) => (
    <option
      key={nanoid()}
      value={element}
    >{getShortCut(element)}</option>
  ))

  const Typeoptions = typeList.map((element) => (
    <option
      key={nanoid()}
      value={element}
    >{element}</option>
  ))

  const Modluesoptions = Modules.map((element) => (
    <option
      key={nanoid()}
      value={element}
    >{getShortCut(element)}</option>
  ))

  let classname = '';
  if (index == 1)
    classname = "first"
  else if (index == 6)
    classname = "last"



  if (source == "EditSchedule") {
    return (
      <div className='EditSchedule--class'>
        <p className='class--type'>
          <select className={scheduleDay.module == "" ? `dehighlighted select--class` : "select--class"} value={"cas"} onChange={e => handleChange(e, scheduleDay.id, "module")}>
            {Modluesoptions}
          </select>
        </p>
        <p>
          <select className={scheduleDay.module == "" ? `hidden select--class` : "select--class"} onChange={e => handleChange(e, scheduleDay.id, "type")}>
            {Typeoptions}
          </select>
        </p>
        <p className='class--type'>
          <select className={scheduleDay.module == "" ? `hidden select--class` : "select--class"} onChange={e => handleChange(e, scheduleDay.id, "Classroom")}>
            {Classroomoptions}
          </select>
        </p>
      </div>
    )
  }
  return (
    <div className={`SideScheduleElement--container classes ${classname}`}>
      <p>{scheduleDay.module ? getShortCut(scheduleDay.module) : ""}</p>
      <p className='class--type'>{scheduleDay.type}</p>
      <p className='class--type'>{getShortCut(scheduleDay.Classroom)}</p>
    </div>
  )
}

export default SideScheduleElement