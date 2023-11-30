import NavElement from '../NavElement/NavElement'
import './NavBar.css'
import { MdOutlineClass } from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FiEdit } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
import { FaTasks } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";


function NavBar() {
  const [ToggleNavBar, setToggleNavBar] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])



  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  if (!user.email )
    return

  const navNames = [
    { title: 'My classes', icon: <MdOutlineClass className="icon" /> },
    { title: 'Announcement', icon: <TfiAnnouncement className="icon" /> },
    { title: 'Task', icon: < FaTasks className="icon" /> },
  ]
  
  if (user.isTeacher)
    navNames.push({ title: 'Edit', icon: <FiEdit className="icon" /> })
  
  if (user.email === "Image Numérique")
    navNames.push({ title: 'Admin', icon: <RiAdminLine className="icon" /> })
  
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  var selectedNav = allpath.split("/")[0]
  if (selectedNav[0] === ":") {
    selectedNav = "My classes"
  }

  const HandleClick = (title: string) => {
    setToggleNavBar(false)
    navigate(`/${title}`)
  }

  const NavElements = navNames.map(element => (
    <NavElement
      key={element.title}
      HandleClick={HandleClick}
      title={element.title}
      icon={element.icon}
      isSelected={element.title == selectedNav} />
  ))
  return (
    <div className='navbar--container'>
      <div className='navbar--top'>
        <h2 className='navbar--logo'>Student's Space</h2>
        <AiOutlineMenu
          className='phoneNav'
          onClick={() => setToggleNavBar(prev => !prev)} />
      </div>

      <div
        style={ToggleNavBar || windowWidth > 700 ? { display: "block" } : { display: "none" }}
        className="navig"
      >
        {NavElements}
      </div>

    </div>
  )
}

export default NavBar