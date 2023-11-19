import { useContext, useState } from 'react'
import './EditClass.css'
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from '../../Pages/HomePage/HomePage';
import { AuthContext } from '../../Contexts/UserContext';

function EditClass() {
  const { user } = useContext(AuthContext)
  if (!user)
    return

  const SelectedModule = user.email
  const Teacher = user.username
  const [isloading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    Module: SelectedModule,
    Teacher,
    Chapter: "",
    Link: "",
    DescriptionClass: "",
    title: ""
  })

  const HandleSubmit = async (e: any) => {
    e.preventDefault()
    if (inputs.Chapter == "" || inputs.Link == "" || inputs.title == "") {
      notify("error", "Chapter, Link & title must be filled")
      return
    }
    setLoading(true)
    await fetch("https://student-space-backend.onrender.com/api/file", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      }
      , body: JSON.stringify(inputs)
    })
    setLoading(false)
    window.location.reload();

  }

  return (
    <div className='editclass--container'>
      <div className='taskedit--create'>
        <div className='taskedit--title'>
          <h3>Add File</h3>
        </div>
        <form className='taskedit--body editclass--body' onSubmit={HandleSubmit}>
          <input
            placeholder='Title...'
            value={inputs.title}
            onChange={e => setInputs(prev => ({ ...prev, title: e.target.value }))}
          />
          <div>
            <input
              placeholder='Chapter...'
              value={inputs.Chapter}
              onChange={e => setInputs(prev => ({ ...prev, Chapter: e.target.value }))}
            />
          </div>
          <input
            placeholder='Link...'
            value={inputs.Link}
            onChange={e => setInputs(prev => ({ ...prev, Link: e.target.value }))}
          />
          <input
            placeholder="File's Description..."
            value={inputs.DescriptionClass}
            onChange={e => setInputs(prev => ({ ...prev, DescriptionClass: e.target.value }))}
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
    </div>
  )
}

export default EditClass