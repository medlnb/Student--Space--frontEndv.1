import { useContext, useState } from 'react'
import './UserBar.css'
import { AuthContext } from '../../Contexts/UserContext'
import { FaUserGraduate } from "react-icons/fa"
import { AiOutlineLogout } from "react-icons/ai";
import { DarkModeContext } from '../../Contexts/Theme';
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
  const { DarkMode } = useContext(DarkModeContext)
  const { user, handleUserChange } = useContext(AuthContext)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const HandleChange = (e: any) => {
    const email = e.target.value
    handleUserChange({ ...user, email: moveStringToFront(("" + localStorage.getItem("email")).split("$$"), email) })
  }

  return (
    <div className='userbar--container'>
      <div className="logout--icon">
        <FaUserGraduate onClick={() => setShowUserInfo(prev => !prev)} />
        {showUserInfo &&
          <div className='logout'>
            <div className='up--arrow'></div>
            <div
              onClick={() => handleUserChange({
                username: null,
                email: null
              })}
              className='logout--sign'>
              <AiOutlineLogout fill={DarkMode ? "Black" : "white"} />
              Logout
            </div>
            {Object.entries(user).map((element,index) =>
            (<p key={index}>
              {`${element[0]} :
                ${(element[0] === "speciality") ?
                element[1][0].name + " / " + element[1][0].Module
                    :
                  element[1]}`}
            </p>)
            )}
          </div>
        }

      </div>
      {`Hi, ${user.username}`}
      {localStorage.getItem("email")?.split("$$").length !== 1 &&
        < select
          onChange={HandleChange}
          style={{ background: "none", border: "none", outline: "none" }}>
          {localStorage.getItem("email")?.split("$$").map(mdl => (
            <option className="inside--option" key={mdl} value={mdl}>{mdl}</option>
          ))}
        </select>}
    </div>
  )
}
export default UserBar