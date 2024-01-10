import { useContext, useState } from 'react'
import './AddTeacher.css'
import { AuthContext } from '../../Contexts/UserContext'
import { Server } from '../../Data/API'
import { notify } from '../../Pages/HomePage/HomePage'
import ClipLoader from 'react-spinners/ClipLoader'

function AddTeacher() {
  const { user } = useContext(AuthContext)
  const [inputs, setInputs] = useState({
    email: "",
    Module: "",
    loading: false
  })

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputs(prev => ({...prev,loading:true}))
    const response = await fetch(`${Server}/api/user/teacher`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputs.email,
        speciality: {
          name: user.speciality[0].name,
          Year: user.speciality[0].Year,
          Module: inputs.Module
        }
      })
    })
    setInputs(prev => ({ ...prev,email:"",Module:"", loading: false}))
    if (response.ok)
      notify("success", "Teacher was added successfully")
    else
      notify("error", "Error Adding Teacher")
  }
  return (
    <form className='taskedit--create' onSubmit={HandleSubmit}>
      <div className='taskedit--title'>
        <h3>Add Teachers </h3>
      </div>
      <div className='members--body'>
        <input
          placeholder='Email'
          className='task--title--input'
          value={inputs.email}
          onChange={(e) => setInputs(prev => ({ ...prev, email: e.target.value }))}
        />
        <input
          placeholder='Module'
          className='task--title--input'
          value={inputs.Module}
          onChange={(e) => setInputs(prev => ({ ...prev, Module: e.target.value }))}
        />
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <button
            className={inputs.loading ? 'taskedit--body--submit isSubmitting' : 'taskedit--body--submit'}>
            Add
            <ClipLoader
              color="yellow"
              loading={inputs.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
          
        </div>
      </div>
    </form>
  )
}

export default AddTeacher