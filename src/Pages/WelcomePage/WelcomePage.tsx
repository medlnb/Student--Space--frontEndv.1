import './WelcomePage.css'
import logo from '../../assets/KasdiLogo.png'
import Signup from '../../Components/Signup/Signup'
import Login from '../../Components/Login/Login'
import { Route, Routes } from 'react-router-dom'

function WelcomePage() {

  return (
    <div className='welcomePage--container'>
      <div className="welcomePage--left">
        <img src={logo} className='welcomePage--logo' />
      </div>
      <div className="welcomePage--right">
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default WelcomePage