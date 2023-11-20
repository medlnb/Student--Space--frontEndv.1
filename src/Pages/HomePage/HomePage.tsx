import Main from '../../Components/Main/Main'
import NavBar from '../../Components/NavBar/NavBar'
import SideBar from '../../Components/SideBar/SideBar'
import './HomePage.css'
import { ScheduleContextProvider } from '../../Contexts/ScheduleContext'
import { TasksContextProvider } from '../../Contexts/TaskContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassesContextProvider } from '../../Contexts/Class'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.username) {
      return navigate("/signup")
      
    }
  }, [])


  return (
    <div className='homepage--container'>
      <ClassesContextProvider>
        <TasksContextProvider>
          <ScheduleContextProvider>
            <>
              <NavBar />
              <Main />
              <SideBar />
              <ToastContainer />
            </>
          </ScheduleContextProvider>
        </TasksContextProvider>
      </ClassesContextProvider>
    </div >
  )
}

export default HomePage