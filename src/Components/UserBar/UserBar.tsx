import { useContext } from 'react'
import './UserBar.css'
import { AuthContext } from '../../Contexts/UserContext'
import { FaUserGraduate } from "react-icons/fa"

function moveStringToFront(array: string[], targetString: string) {
  const index = array.indexOf(targetString);
  if (index !== -1) {
    array.splice(index, 1);
    array.unshift(targetString);
  }
  let newarray = ""
  array.map((mdl, index) => {
    if (index !== 0)
      newarray = newarray + "$$" + mdl
    else
      newarray = newarray + mdl
  })
  return newarray
}

function UserBar() {
  const { user, handleUserChange } = useContext(AuthContext)
  const HandleChange = (e: any) => {
    const email = e.target.value

    handleUserChange({ ...user, email: moveStringToFront(("" + localStorage.getItem("email")).split("$$"), email) })
  }
  console.log(user)
  return (
    <div className='userbar--container'>
      <FaUserGraduate onClick={() => handleUserChange({
        username: null,
        email: null
      })} />
      {`Hi, ${user.username}`}
      <select
        onChange={HandleChange}
        style={{ background: "none", border: "none", outline: "none" }}>
        {localStorage.getItem("email")?.split("$$").map(mdl => (
          <option className="inside--option" key={mdl} value={mdl}>{mdl}</option>
        ))}
      </select>
    </div>
  )
}
export default UserBar