import { useContext, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './Login.css'
import logo from '../../assets/KasdiLogo.png'
import { AuthContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Server } from '../../Data/API';

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


    const response = await fetch(`${Server}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({ email: inputs.mail, password: inputs.password }),
      headers: {
        "Content-Type": "Application/json"
      }
    })

    const json = await response.json()
    if (!response.ok) {
      if (json.MailErr)
        setInputs(prev => ({ ...prev, err: { ...prev.err, MailErr: json.MailErr } }))
      else
        setInputs(prev => ({ ...prev, err: { ...prev.err, MailErr: "" } }))

      if (json.PwErr)
        setInputs(prev => ({ ...prev, err: { ...prev.err, PwErr: json.PwErr } }))

      setInputs(prev => ({ ...prev, loading: false }))
      return
    }
    handleUserChange({
      username: json.username,
      email: json.email,
      speciality: json.speciality,
      Module: json.Module
    })
    setInputs(prev => ({ ...prev, loading: false }))
    navigate("/My classes")
  }

  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={logo} className='welcomePage--logo' />
      </div>
      <div className="welcomePage--right">
        <div
          onClick={() => navigate("/promotionrequest")}
          className="promotionLink">
          Promotion Request
        </div>
        <form className='form_conatiner' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <h3>Please enter your details</h3>
          <div className='inputs_container'>
            <input
              placeholder='Email...'
              className='task--title--input'
              value={inputs.mail}
              onChange={e => setInputs(prev => ({ ...prev, mail: e.target.value }))}
            />
            {inputs.err.MailErr && <p
              className='error--msg'>
              {inputs.err.MailErr}
            </p>}

          </div>
          <div className='inputs_container'>
            <input
              placeholder='Password...'
              className='task--title--input'
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