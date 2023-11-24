import { useContext, useState } from 'react'
import './EditClass.css'
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from '../../Pages/HomePage/HomePage';
import { AuthContext } from '../../Contexts/UserContext';
import { Server } from '../../Data/API';
import { FaGoogleDrive } from "react-icons/fa";
import { ClassesContext } from '../../Contexts/Class';

function EditClass() {
  const { user } = useContext(AuthContext)
  if (!user)
    return

  const { state } = useContext(ClassesContext)
  const chapters:string[] = ["Chapters"]
  state?.map(modulee => {
    modulee.map(file => {
      if (file.Module === user.email && file.Chapter && !chapters.includes(file.Chapter))
        chapters.push(file.Chapter)
    })
  })

  const SelectedModule = user.email
  const Teacher = user.username
  const [isloading, setLoading] = useState(false)
  const [inputs, setInputs] = useState({
    Module: SelectedModule,
    Teacher,
    Chapter: chapters[0],
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
    await fetch(`${Server}/api/file`, {
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
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <input
              placeholder='Chapter...'
              value={inputs.Chapter}
              onChange={e => setInputs(prev => ({ ...prev, Chapter: e.target.value }))}
            />
            <select
              style={{ background: "#1f1e26", border: "none", outline: "none", width: "5rem" }}
              value={inputs.Chapter}
              onChange={(e) => setInputs((prev) => ({ ...prev, Chapter: e.target.value }))}
            >
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
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
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
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
            <a href="https://drive.google.com/drive" target="_blank">
              <FaGoogleDrive />
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditClass