import { Route, Routes, useLocation } from 'react-router-dom'
import './Admin.css'
import ScheduleEdit from '../ScheduleEdit/ScheduleEdit'
import EditNavBar from '../EditNavBar/EditNavBar'
import Members from '../Members/Members'
import { useContext } from 'react'
import { DarkModeContext } from '../../Contexts/Theme'

function Admin() {
  const {DarkMode} = useContext(DarkModeContext)
  const NavOptions = ["Schedule", "Members", "Promo"]
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  const PageSelected = allpath.split("/")[1] || "Schedule"

  return (
    <div className={`sub--main--container ${!DarkMode && "dark--sub--main--container"}`}>
      <h1 className='sub--main--title'>{PageSelected}</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Routes>
            <Route path="" element={<ScheduleEdit />} />
            <Route path="Members" element={<Members />} />
            <Route path="Promo" element={<p style={{ padding:"2.5rem 1rem"}}>Working on it.</p>} />
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