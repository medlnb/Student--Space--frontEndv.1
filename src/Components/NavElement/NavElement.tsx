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
  const { DarkMode } = useContext(DarkModeContext)
  let SelectedColor = "#ff5f5f"
  if (!DarkMode)
    SelectedColor = "#003892"
  return (
    <div
      className={isSelected ? 'navelement--container selected' : "navelement--container "}
      style={{ color: isSelected ? `${SelectedColor}` : 'inherit' }}
      onClick={() => HandleClick(title)}>
      <div className="icon--holder ">
        {icon}
      </div>
      {title}
    </div>
  )
}

export default NavElement