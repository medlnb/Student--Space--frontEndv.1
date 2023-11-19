import { useContext, useEffect, useState } from 'react'
import Task from '../Task/Task'
import PropagateLoader from "react-spinners/PropagateLoader";
import './OngoingTasks.css'
import { TasksContext } from '../../Contexts/TaskContext';

interface date {
  day: number;
  month: number;
  year: number;
  time: string;
}
interface TaskType {
  _id?: string,
  className: string,
  taskTitle: string,
  deadLine: date | null
}

function OngoingTasks() {
  const { state } = useContext(TasksContext)
  if (!state)
    return

  if (state.length == 0)
    return (
      <div className='ongointasks--container'>
        <div className='top--task--container'>
          <h3>Module (Task)</h3>
          <h3>Time left</h3>
        </div>
        <h4>U have no tasks relax.</h4>

      </div>
    )
  const [isloading, SetLoading] = useState(true)

  useEffect(() => {
    if (isloading) {
      if (state[0]._id != "default_value")
        SetLoading(false)
    }
  }, [state])

  const Tasks = state.map((task: TaskType, index: number) => (
    <Task
      key={index}
      className={task.className}
      deadLine={task.deadLine}
      taskTitle={task.taskTitle}
    />
  ))
  return (
    <div className='ongointasks--container'>
      <div className='top--task--container'>
        <h3>Module (Task)</h3>
        <h3>Time left</h3>
      </div>
      <div
        style={{ display: `${isloading ? "" : "none"}` }}
        className='loader--container'>
        <PropagateLoader
          color={"white"}
          loading={isloading}
          size={20}
        />
      </div>
      {!isloading && Tasks}
    </div>

  )
}

export default OngoingTasks