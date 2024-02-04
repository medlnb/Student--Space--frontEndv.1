import EditNavBar from '../EditNavBar/EditNavBar'
import './Edit.css'
import { Outlet} from 'react-router-dom'

function Edit() {
  const NavOptions = ["Classes", "Tasks", "Annou"]
  
  return (
    <div className="sub--main--container">   
      <h1 className='sub--main--title'>Teacher</h1>
      <div className='edit--container'>
        <div className='edit--page'>
          <Outlet />
        </div>
        <EditNavBar
          NavOptions={NavOptions}
        />
      </div>
    </div>
  )
}

export default Edit