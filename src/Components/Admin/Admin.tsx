import { Route, Routes, useLocation } from 'react-router-dom'
import './Admin.css'
import ScheduleEdit from '../ScheduleEdit/ScheduleEdit'
import EditNavBar from '../EditNavBar/EditNavBar'
import Members from '../Members/Members'

function Admin() {
  const NavOptions = ["Schedule", "Members", "Promo"]
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  const PageSelected = allpath.split("/")[1] || "Schedule"

  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>{PageSelected}</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Routes>
            <Route path="" element={<ScheduleEdit />} />
            <Route path="Members" element={<Members />} />
            <Route path="Promo" element={"Working on it."} />
          </Routes>
        </div>
        <EditNavBar
          PageSelected={PageSelected}
          NavOptions={NavOptions}
          source="Admin"
        />
      </div>
    </div>
  )
}

export default Admin