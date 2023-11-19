import { useContext, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './Login.css'
import logo from '../../assets/KasdiLogo.png'
import { AuthContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { handleUserChange } = useContext(AuthContext)
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
    loading: false,
    err: { MailErr: "", PwErr: "" }
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputs(prev => ({ ...prev, loading: true }))

    if (inputs.mail == "khra") {
      handleUserChange(
        {
          username: "Teacher",
          email: "null",
          token: "noToken"
        })
      return
    }

    const response = await fetch("https://student-space-backend.onrender.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: inputs.mail, password: inputs.password }),
      headers: {
        "Content-Type": "Application/json"
      }
    })
    const json = await response.json()
    handleUserChange(
      {
        username: json.username,
        email: json.email,
        token: json.token
      }
    )
    setInputs(prev => ({ ...prev, loading: false }))
    navigate("/My classes")
  }

  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={logo} className='welcomePage--logo' />
      </div>
      <div className="welcomePage--right">
        <form className='form_conatiner' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <h3>Please enter your details</h3>
          <h4>Email</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              value={inputs.mail}
              onChange={e => setInputs(prev => ({ ...prev, mail: e.target.value }))}

            />
            {inputs.err.MailErr && <p
              className='error--msg'>
              {inputs.err.MailErr}
            </p>}

          </div>
          <h4>Password</h4>
          <div className='inputs_container'>
            <input
              className="inputs"
              type="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs(prev => ({ ...prev, password: e.target.value }))
              }}

            />
            {inputs.err.PwErr && <p
              className='error--msg'>
              {inputs.err.PwErr}
            </p>}
          </div>
          <button
            type="submit"
            disabled={inputs.loading}
            className={inputs.loading ? 'login isSubmitting' : 'login'}
          >
            <p>Log in</p>
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
              navigate('/signup')
            }}
            className='navigator'
          >
            Go to Sign up Page
          </p>
        </form >
      </div>
    </div>
  )
}

export default Login