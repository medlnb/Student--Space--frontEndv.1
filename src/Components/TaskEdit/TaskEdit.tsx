import { useContext, useState } from 'react';
import './TaskEdit.css'
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AuthContext } from '../../Contexts/UserContext';
import { TasksContext } from '../../Contexts/TaskContext';
import { BiTrash } from "react-icons/bi"
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from '../../Pages/HomePage/HomePage';

function TaskEdit() {

  const { user } = useContext(AuthContext)
  const { state, dispatch } = useContext(TasksContext)

  if (!state || !dispatch)
    return

  const HandleDelete = async (id: string | undefined) => {
    const response = await fetch(`https://student-space-backend.onrender.com/api/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }
    })
    if (response.ok)
      dispatch({
        type: "REMOVETASK",
        payload: id
      })
  }
  const TasksToDelete = state.map((task, index) => (
    <div className='tasktodelete' key={index} onClick={() => HandleDelete(task._id)}>
      <h4>{task.taskTitle}</h4>
      <BiTrash />
    </div>
  ))

  const today = new Date()
  const [inputs, setInputs] = useState<{ taskTitle: string, deadline: Dayjs | null, loading: boolean }>({
    taskTitle: "",
    deadline: dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T00:00`),
    loading: false
  })


  const HandleSubmit = async (e: any) => {
    e.preventDefault()
    if (!inputs.deadline)
      return

    if (inputs.taskTitle == "")
      return notify("error","Task must have a title")

    setInputs(prev => ({
      ...prev, loading: true
    }))

    const task = {
      className: user.username,
      taskTitle: inputs.taskTitle,
      deadLine: {
        day: parseInt(inputs.deadline.format('DD')),
        month: parseInt(inputs.deadline.format('MM')),
        year: parseInt(inputs.deadline.format('YYYY')),
        time: inputs.deadline.format('HH:mm')
      }
    }

    const response = await fetch("https://student-space-backend.onrender.com/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      }
      , body: JSON.stringify(task)
    })
    const json = await response.json()
    setInputs(prev => ({
      ...prev, loading: false, taskTitle: "",
    }))
    if (response.ok)
      dispatch({
        type: "ADDTASK",
        payload: json
      })
  }
  return (
    <div className='taskedit--container'>
      <form className='taskedit--create' onSubmit={HandleSubmit}>
        <div className='taskedit--title'>
          <h3>New Task</h3>
        </div>
        <div className='taskedit--body'>
          <input
            placeholder='Task title...'
            value={inputs.taskTitle}
            className='task--title--input'
            onChange={e => setInputs(prev => ({ ...prev, taskTitle: e.target.value }))}
          />
          <DateTimePicker
            value={inputs.deadline}
            onChange={(newValue) =>
              setInputs(prev => (
                { ...prev, deadline: newValue }
              ))
            }
            label="DeadLine:" />
          <button
            className={inputs.loading ? 'taskedit--body--submit isSubmitting' : 'taskedit--body--submit'}>
            Add
            <ClipLoader
              color={"white"}
              loading={inputs.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </div>


      </form>
      {!(state.length == 0) &&
        <div className='taskedit--create'>
          <div className='taskedit--title'>
            <h3>Delete Tasks</h3>
          </div>
          <div className='taskedit--body'>
            {TasksToDelete}
          </div>
        </div>
      }
    </div>
  )
}

export default TaskEdit