import { ChangeEvent, useState } from 'react';
import '../../Pages/WelcomePage/WelcomePage.css'
import ClipLoader from "react-spinners/ClipLoader";
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/KasdiLogo.png'

function Signup() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    matricule: "",
    loading: false,
    msg: { err: "", mail: "" }
  })

  const HandleMatriculeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({ ...prev, matricule: e.target.value }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputs(prev => ({ ...prev, loading: true }))
    const response = await fetch("https://student-space-backend.onrender.com/api/student/send-mail", {
      method: "POST",
      body: JSON.stringify({ matricule: inputs.matricule }),
      headers: {
        "Content-Type": "Application/json"
      }
    })
    const json = await response.json()
    setInputs(prev => (
      { ...prev, loading: false, msg: json }
    ))
  }

  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={logo} className='welcomePage--logo' />
      </div>
      <div className="welcomePage--right">
        <form className='form_conatiner' onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <h3>Please enter your details</h3>
          <h4>Matricule</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              value={inputs.matricule}
              onChange={HandleMatriculeChange}
            />
            <p
              style={inputs.msg.err ? { color: "#FF5733" } : { color: "white" }}
              className='error--msg'>
              {inputs.msg.err && inputs.msg.err}
              {inputs.msg.mail && `Please verify ur mail (${inputs.msg.mail})`}
            </p>
          </div>
          <button
            type="submit"
            disabled={inputs.loading}
            className={inputs.loading ? 'login isSubmitting' : 'login'}
          >
            <p>Sign up</p>
            <ClipLoader
              color={"white"}
              loading={inputs.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>

          <p
            onClick={() => {
              navigate("/login")
            }}
            className='navigator'
          >
            Go to Login Page
          </p>
        </form >
      </div>
    </div>
  )
}

export default Signup