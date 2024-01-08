import './HomePage.css'
import './Main.css'
import { ScheduleContextProvider } from '../../Contexts/ScheduleContext'
import { TasksContextProvider } from '../../Contexts/TaskContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassesContextProvider } from '../../Contexts/Class'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/UserContext'
import { Outlet } from 'react-router-dom'
import { AnnouncementsContextProvider } from '../../Contexts/AnnouncementContext'
import { DarkModeContext } from '../../Contexts/Theme'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import UserBar from '../../Components/UserBar/UserBar';
import SideBar from '../../Components/SideBar/SideBar';
import NavBar from '../../Components/NavBar/NavBar';

export const notify = (toastType: "success" | "info" | "warn" | "error", toastMsg: string) =>
  toast[toastType](`${toastMsg}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

function HomePage() {
  const { user } = useContext(AuthContext)
  const { DarkMode } = useContext(DarkModeContext)

  return (
    <div className={`homepage--container ${!DarkMode && "dark--homepage--container"}`}>
      <ClassesContextProvider>
        <TasksContextProvider>
          <ScheduleContextProvider>
            <AnnouncementsContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <NavBar />
                <div className='main--container'>
                  <UserBar />
                  <Outlet />
                </div>
                {!user.speciality[0].Module && <SideBar />}
                <ToastContainer />
              </LocalizationProvider>
            </AnnouncementsContextProvider>
          </ScheduleContextProvider>
        </TasksContextProvider>
      </ClassesContextProvider>
    </div >
  )
}

export default HomePage