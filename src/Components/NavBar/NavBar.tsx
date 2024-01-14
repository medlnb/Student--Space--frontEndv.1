import NavElement from '../NavElement/NavElement'
import './NavBar.css'
import { MdOutlineClass } from 'react-icons/md';
import { TfiAnnouncement } from 'react-icons/tfi';
import { FiEdit } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'
import { FaTasks } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { BsChevronDoubleDown } from "react-icons/bs";
import { DarkModeContext } from '../../Contexts/Theme';

function NavBar() {
  const [ToggleNavBar, setToggleNavBar] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { DarkMode, setDarkMode } = useContext(DarkModeContext)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToggleNavBar(false)
      }
    };

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef]); 
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const navNames = [
    { title: 'My classes', icon: <MdOutlineClass className="icon" /> },
    { title: 'Announcement', icon: <TfiAnnouncement className="icon" /> },
    { title: 'Task', icon: < FaTasks className="icon" /> },
  ]
  if (user.speciality[0].Module)
    navNames.push({ title: 'Edit', icon: <FiEdit className="icon" /> })
  if (user.speciality && user.speciality[user.specIndex].Admin )
      navNames.push({ title: 'Admin', icon: <RiAdminLine className="icon" /> })
    
  const { pathname } = useLocation()
  const allpath = pathname.substring(1).replace("%20", " ")
  var selectedNav = allpath.split("/")[0]
  if (selectedNav === "Module") {
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
    <div className={`navbar--container `} ref={dropdownRef}>
      <div className='navbar--top'>
        <h2 className='navbar--logo'>Student's Space</h2>
        {ToggleNavBar ?
          <BsChevronDoubleDown
            className='phoneNav'
            onClick={() => setToggleNavBar(prev => !prev)} /> :
          <AiOutlineMenu
            className='phoneNav'
            onClick={() => setToggleNavBar(prev => !prev)} />
        }
      </div>

      <div
        className={ToggleNavBar || windowWidth > 700 ? "navig" : "navig hide"}
      >
        <div className='thenavigbar'>
          {NavElements}
          <div className='darkmode--switch'>
            <label className="ui-switch">
              <input type="checkbox" checked={DarkMode} onClick={() => setDarkMode(prev => !prev)} onChange={() => { }} />
              <div className="slider">
                <div className="circle"></div>
              </div>
            </label>
          </div>

        </div>
        <div>
          <p className='feedback-msg'>Please Send ur feedbacks here :</p>
          <p className='feedback-msg'>lanabi.mohamed@univ-ouargla.dz</p>
        </div>
      </div>

    </div>
  )
}

export default NavBar