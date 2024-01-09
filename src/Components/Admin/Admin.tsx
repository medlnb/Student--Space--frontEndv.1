import { Outlet, useLocation } from 'react-router-dom'
import './Admin.css'
import EditNavBar from '../EditNavBar/EditNavBar'

function Admin() {
  const NavOptions = ["Schedule", "Members", "Promo","Teachers"]
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  const PageSelected = allpath.split("/")[1] || "Schedule"

  return (
    <div className={`sub--main--container `}>
      <h1 className='sub--main--title'>{PageSelected}</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Outlet />
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