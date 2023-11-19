import Main from '../../Components/Main/Main'
import NavBar from '../../Components/NavBar/NavBar'
import SideBar from '../../Components/SideBar/SideBar'
import './HomePage.css'
import { ScheduleContextProvider } from '../../Contexts/ScheduleContext'
import { TasksContextProvider } from '../../Contexts/TaskContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClassesContextProvider } from '../../Contexts/Class'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/UserContext'
import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'

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
// const notifyUser = (notificationText = "Thx from enabling notofications!") => {
//   if (!("Notification" in window)) {
//     alert("Browser does not support notification")
//   } else if (Notification.permission === "granted") {
//     new Notification(notificationText)
//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         new Notification(notificationText)
//       }
//     })
//   }
// }
function HomePage() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  //  notifyUser()
  // useEffect(() => {
  //   new Notification("kaka")
  // }, [])
  if (!user.username)
    navigate("/signup")
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