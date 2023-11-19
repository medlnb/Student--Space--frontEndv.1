import { Route, Routes, useNavigate } from 'react-router-dom'
import Classes from '../Classes/Classes'
import UserBar from '../UserBar/UserBar'
import './Main.css'
import Edit from '../Edit/Edit'
import Module from '../Module/Module'
import { useContext } from 'react'
import { AuthContext } from '../../Contexts/UserContext'
import Announcement from '../Announcement/Announcement'
import TaskEdit from '../TaskEdit/TaskEdit'
import AnnouncementEdit from '../AnnouncementEdit/AnnouncementEdit'
import ScheduleEdit from '../ScheduleEdit/ScheduleEdit'

function Redirect() {
  const navigate = useNavigate()
  navigate('/My classes')
  return (
    <></>
  )
}


function Main() {
  const { user } = useContext(AuthContext)
  if (!user.email)
    return

  let isTeacher = false
  if (!user.email.includes(".com")) {
    isTeacher = true
  }
  return (
    <div className='main--container'>
      <UserBar />
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="My classes" element={<Classes />} />
        <Route path="Announcement" element={<Announcement />} />
        <Route path="Edit/*" element={isTeacher ? <Edit /> : ""}>
        </Route>

        <Route path="My classes/:selected" element={<Module />} />
      </Routes>
    </div>
  )
}

export default Main