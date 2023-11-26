import { useContext, useState } from 'react'
import './AnnouncementEdit.css'
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from '../../Pages/HomePage/HomePage';
import { AuthContext } from '../../Contexts/UserContext';
import { BiTrash } from 'react-icons/bi';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Server } from '../../Data/API';
import { AnnouncementsContext } from '../../Contexts/AnnouncementContext';

interface AnnouncementType {
  _id: string,
  Publisher: string,
  Content: string,
  Date: Date
}


function AnnouncementEdit() {
  const { user } = useContext(AuthContext)
  if (!user)
    return
  const { state,dispatch } = useContext(AnnouncementsContext)
  if (!state)
    return

  const Teacher = user.username
  const [isloading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    Publisher: Teacher,
    Content: ""
  })

  const HandleSubmit = async (e: any) => {
    e.preventDefault()
    if (inputs.Content == "") {
      notify("error", "Content must be filled")
      return
    }
    setLoading(true)
    const response = await fetch(`${Server}/api/Announcement`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      }
      , body: JSON.stringify(inputs)
    })
    const json = await response.json()
    setLoading(false)
    dispatch({
      type: "ADDANNOUNCEMENTS",
      payload: json
    })

  }
  const HandleDelete = async (id: string) => {
    await fetch(`${Server}/api/announcement/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }
    })
    dispatch({
      type: "REMOVEANNOUNCEMENT",
      payload: id
    })
  }
  const TasksToDelete = state.map((element: AnnouncementType, index: number) => (
    <div className='tasktodelete' key={index} onClick={() => HandleDelete(element._id)}>
      <h4>{element.Content}</h4>
      <BiTrash />
    </div>
  ))


  return (
    <div className='editclass--container'>
      <div className='taskedit--create'>
        <div className='taskedit--title'>
          <h3>Add Anoucement</h3>
        </div>
        <form className='taskedit--body editclass--body' onSubmit={HandleSubmit}>
          <input
            placeholder="Content..."
            value={inputs.Content}
            onChange={e => setInputs(prev => ({ ...prev, Content: e.target.value }))}
          />
          <button
            className={isloading ? 'taskedit--body--submit isSubmitting' : 'taskedit--body--submit'}>
            Add
            <ClipLoader
              color={"white"}
              loading={isloading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </form>
      </div>
      {!(state.length === 0) && (state[0]._id === "####") &&
        <PropagateLoader
          color={"white"}
          size={20}
          className='loader--anouc'
        />
      }
      {!(state.length === 0) && (state[0]._id !== "####") &&
        <div className='taskedit--create'>
          <div className='taskedit--title'>
            <h3>Delete Anouccements</h3>
          </div>
          <div className='taskedit--body'>
            {TasksToDelete}
          </div>
        </div>
      }
    </div>
  )
}

export default AnnouncementEdit