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
import Admin from '../Admin/Admin'

function Redirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("My classes")
  }, [])
  return (
    <>
    </>
  )
}
function Main() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  if (!user.email) {
    navigate("/signup")
    return
  }

  return (
    <div className='main--container'>
      <UserBar />
      <Routes>
        <Route path="" element={<Redirect />} />
        <Route path="My classes" element={<Classes />} />
        <Route path="Announcement" element={<Announcement />} />
        <Route path="Task" element={<TaskPage />} />
        <Route path="Edit/*" element={(user.Module) ? <Edit /> : ""} />
        {/* checking if the user is admin */}
        <Route path="Admin/*" element={(user.speciality && user.speciality[0].Admin) && <Admin /> } />
        <Route path=":selected" element={<Module />} />
      </Routes>
    </div>
  )
}

export default Main