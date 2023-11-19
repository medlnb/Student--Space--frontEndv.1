import EditNavBar from '../EditNavBar/EditNavBar'
import './Edit.css'
import ScheduleEdit from '../ScheduleEdit/ScheduleEdit'
import TaskEdit from '../TaskEdit/TaskEdit'
import EditClass from '../EditClass/EditClass'
import AnnouncementEdit from '../AnnouncementEdit/AnnouncementEdit'
import { Route, Routes, useLocation } from 'react-router-dom'

function Edit() {
  const NavOptions = ["Classes", "Tasks", "Annou", "Schedule"]
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  const PageSelected = allpath.split("/")[1] || "Classes"
  
  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>{PageSelected}</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Routes>
            <Route path="" element={<EditClass />} />
            <Route path="Tasks" element={<TaskEdit />} />
            <Route path="Annou" element={<AnnouncementEdit />} />
            <Route path="Schedule" element={<ScheduleEdit />} />
          </Routes>
        </div>
        <EditNavBar
          PageSelected={PageSelected}
          NavOptions={NavOptions}
        />
      </div>
    </div>
  )
}

export default Edit