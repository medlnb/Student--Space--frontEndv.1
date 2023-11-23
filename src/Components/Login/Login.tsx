import { useContext, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './Login.css'
import logo from '../../assets/KasdiLogo.png'
import { AuthContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Server } from '../../Data/API';
import { FaCheck } from "react-icons/fa6";

function Login() {
  const [TeacherIndex, setTeacherIndex] = useState(0)

  const [selectTeacher, setSelectTeacher] = useState<any>({
    isShowed: false,
    Data: null
  })
  const { handleUserChange } = useContext(AuthContext)
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
    loading: false,
    err: { MailErr: "", PwErr: "" }
  })

  const submitTeacher = (User: any) => {
    handleUserChange(
      {
        username: User.username,
        email: User.email,
        token: User.token
      }
    )
    setInputs(prev => ({ ...prev, loading: false }))
    navigate("/My classes")
  }
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

    if (json.username[1]) {
      setSelectTeacher({
        isShowed: true,
        Data: json
      })
    } else {
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
  }

  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={logo} className='welcomePage--logo' />
      </div>
      <div className="welcomePage--right">
        {selectTeacher.isShowed &&
          <div className="teacher--select--container">
            <h2>Identify ur Self</h2>
            <div>
              {selectTeacher.Data.username
                .map((teacher: string, index: number) => (
                  <div
                    key={index}
                    className='teacher'
                    onClick={() =>
                      setTeacherIndex(index)
                    }
                  >
                    <p>{teacher}</p>
                    {TeacherIndex === index && <FaCheck />}
                  </div>
                ))}
            </div>
            <button
              className='login'
              onClick={() => submitTeacher({ ...selectTeacher.Data, username: selectTeacher.Data.username[TeacherIndex] })}
            >Submit</button>
          </div>
        }
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