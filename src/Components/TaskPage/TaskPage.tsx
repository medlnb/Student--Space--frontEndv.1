import { useContext, useEffect } from "react"
import { TasksContext } from "../../Contexts/TaskContext"
import './TaskPage.css'
import PropagateLoader from "react-spinners/PropagateLoader"
import { AuthContext } from "../../Contexts/UserContext"
import { useNavigate } from "react-router-dom"

function TaskPage() {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user.username)
      return navigate("/signup")
  }, [])


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
        {(state.length === 0) ?
          <p>U have no tasks relax.</p>
          : (state[0]._id === "default_value") ?
            <div className='loader--container'>
              <PropagateLoader
                color={"white"}
                loading={true}
                size={20}
              />
            </div>
            :
            Announcements
        }
      </div>
    </div>
  )
}

export default TaskPage