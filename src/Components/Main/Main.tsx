import { Route, Routes, useNavigate } from 'react-router-dom'
import Classes from '../Classes/Classes'
import UserBar from '../UserBar/UserBar'
import './Main.css'
import Edit from '../Edit/Edit'
import Module from '../Module/Module'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../Contexts/UserContext'
import Announcement from '../Announcement/Announcement'
import TaskPage from '../TaskPage/TaskPage'


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
        <Route path="My classes" element={<Classes />} />
        <Route path="Announcement" element={<Announcement />} />
        <Route path="Task" element={<TaskPage />} />
        <Route path="Edit/*" element={isTeacher ? <Edit /> : ""} />
        <Route path=":selected" element={<Module />} />
      </Routes>
    </div>
  )
}

export default Main