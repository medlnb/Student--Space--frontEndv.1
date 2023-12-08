import { useNavigate } from 'react-router-dom'
import './Class.css'
import { useContext } from 'react'
import { DarkModeContext } from '../../Contexts/Theme'

interface props {
  Module: string,
  Teacher: string,
  description?: string,
}


function Class({ Module, Teacher, description }: props) {
  const {DarkMode} = useContext(DarkModeContext)
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/:${Module}`)
  }
  return (
    <div onClick={handleClick}
      className={`class--container ${!DarkMode && "dark--navbar--container"}`}>
      <h2>{Module}</h2>
      <h3>{Teacher}</h3>
      <p>{description && description}</p>
    </div>
  )
}

export default Class