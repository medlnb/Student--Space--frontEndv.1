import EditNavBar from '../EditNavBar/EditNavBar'
import './Edit.css'
import { Outlet, useLocation } from 'react-router-dom'

function Edit() {
  const NavOptions = ["Classes", "Tasks", "Annou"]
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  const PageSelected = allpath.split("/")[1] || "Classes"
  return (
    <div className="sub--main--container">   
      <h1 className='sub--main--title'>{PageSelected}</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Outlet />
        </div>
        <EditNavBar
          PageSelected={PageSelected}
          NavOptions={NavOptions}
          source="Edit"
        />
      </div>
    </div>
  )
}

export default Edit