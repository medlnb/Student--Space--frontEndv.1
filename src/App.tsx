import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { AuthContext } from './Contexts/UserContext';
import { useContext } from 'react';


function App() {
  const { user } = useContext(AuthContext)
  return (
    <BrowserRouter>
      <div>
        {!user.username ?
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          :
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HomePage />
          </LocalizationProvider>
        }
      </div>
    </BrowserRouter>
  )
}

export default App
