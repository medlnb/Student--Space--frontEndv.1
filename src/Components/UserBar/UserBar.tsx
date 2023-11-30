import { useContext } from 'react'
import './UserBar.css'
import { AuthContext } from '../../Contexts/UserContext'
import { FaUserGraduate } from "react-icons/fa"

function UserBar() {
  const { user, handleUserChange } = useContext(AuthContext)
  return (
    <div className='userbar--container' onClick={() => handleUserChange({
      username:  null,
      email: null
    })}>
      <FaUserGraduate  />
      {`Hi, ${user.username}`}
    </div>
  )
}
export default UserBar