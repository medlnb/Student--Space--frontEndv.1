import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { DarkModeContextProvider } from './Contexts/Theme';

function App() {

  return (
    <div>
      <BrowserRouter>
        <DarkModeContextProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <HomePage />
            </LocalizationProvider>
          } />
          </Routes>
        </DarkModeContextProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
