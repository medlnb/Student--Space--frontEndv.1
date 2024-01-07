import { useContext, useState } from 'react'
import './AddTeacher.css'
import { AuthContext } from '../../Contexts/UserContext'
import { Server } from '../../Data/API'

function AddTeacher() {
  const { user } = useContext(AuthContext)
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    Module: "",
    speciality: {
      name: user.speciality[0].name,
      Year: user.speciality[0].Year
    }
  })

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    fetch(`${Server}/api/user/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs)
    })
  }
  return (
    <form className='taskedit--create' onSubmit={HandleSubmit}>
      <div className='taskedit--title'>
        <h3>Add Teachers </h3>
      </div>
      <div className='members--body'>
        <div style={{ display: "flex", alignItems: "center" }}
          className='task--title--input'
        >
          Dr.
          <input
            placeholder='Username'
            className='task--title--input'
            style={{border:"none"}}
            value={inputs.username}
            onChange={(e) => setInputs(prev => ({ ...prev, username: e.target.value }))}
          />
        </div>
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
        <input
          placeholder='Password'
          className='task--title--input'
          value={inputs.password}
          onChange={(e) => setInputs(prev => ({ ...prev, password: e.target.value }))}
        />
        <button
          className={false ? 'taskedit--body--submit isSubmitting' : 'taskedit--body--submit'}>
          Add
          {/* <ClipLoader
            color={`${DarkMode ? "white" : "black"}`}
            loading={isloading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> */}
        </button>
      </div>
    </form>
  )
}

export default AddTeacher