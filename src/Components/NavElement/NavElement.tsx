import { useContext } from 'react'
import './NavElement.css'
import { DarkModeContext } from '../../Contexts/Theme'

interface props {
  title: string,
  icon: any,
  isSelected: boolean,
  HandleClick: any
}

function NavElement({ title, icon, isSelected, HandleClick }: props) {
  const {DarkMode} = useContext(DarkModeContext)
  return (
    <div
      className={isSelected ? 'navelement--container selected' : "navelement--container "}
      onClick={() => HandleClick(title)}>
      <div className={`icon--holder ${!DarkMode && "DarkMode--nav--icon" }`}>
        {icon}
      </div>
      {title}
    </div>
  )
}

export default NavElement