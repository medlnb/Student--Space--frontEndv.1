import { useContext } from "react"
import { TasksContext } from "../../Contexts/TaskContext"
import './TaskPage.css'

function TaskPage() {
  const { state } = useContext(TasksContext)
  if (!state)
    return
  const Announcements = state.map((element, index) => (
    <div
      className="Task--container"
      key={index}>
      <h3 className="tasks--title">{element.className} ({element.taskTitle}) </h3>
      {element.Description &&
        <>
          <p>Description:</p>
          <p className="Description--container">{element.Description}</p>
        </>
      }
      <p className="task--deadline">DeadLine: {element.deadLine?.day}/{element.deadLine?.month}/{element.deadLine?.year} {element.deadLine?.time}</p>
    </div>
  ))
  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>Tasks</h1>
      <div className='tasks--container'>
        {Announcements}
      </div>
    </div>
  )
}

export default TaskPage