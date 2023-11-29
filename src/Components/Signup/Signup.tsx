import { ChangeEvent, useState } from 'react';
import '../../Pages/WelcomePage/WelcomePage.css'
import ClipLoader from "react-spinners/ClipLoader";
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/KasdiLogo.png'
import { Server } from '../../Data/API';

const isValidEmail = (inputEmail:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(inputEmail);
  return isValid
}

function Signup() {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    matricule: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loading: false,
    msg: { err: "", msg: "" }
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValidEmail(inputs.email))
      return setInputs(prev => ({ ...prev, msg: { ...prev.msg, err: "Please Entre Valid Email" } }))
    
    setInputs(prev => ({ ...prev, loading: true }))
    const response = await fetch(`${Server}/api/request`, {
      method: "POST",
      body: JSON.stringify({
        matricule: inputs.matricule,
        mail: inputs.email,
        firstname: inputs.firstName,
        lastname: inputs.lastName,
        password: inputs.password,
        Speciality:"1ermasterAi&DS"
      }),
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (/^\d+$/.test(e.target.value) || e.target.value === "")
                  setInputs(prev => ({ ...prev, matricule: e.target.value }))
              }}
            />

          </div>
          <h4>First Name</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              value={inputs.firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputs(prev => ({ ...prev, firstName: e.target.value }))
              }}
            />
          </div>
          <h4>Last Name</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              value={inputs.lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputs(prev => ({ ...prev, lastName: e.target.value }))
              }}
            />
          </div>
          <h4>Email</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              value={inputs.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputs(prev => ({ ...prev, email: e.target.value }))
              }}
            />
          </div>
          <h4>Password</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              type="password"
              value={inputs.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputs(prev => ({ ...prev, password: e.target.value }))
              }}
            />
          </div>
          <p
            style={inputs.msg.err ? { color: "#FF5733" } : { color: "white" }}
            className='error--msg'>
            {inputs.msg.err && inputs.msg.err}
            {inputs.msg.msg && `${inputs.msg.msg}`}
          </p>
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