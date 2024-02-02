import { useNavigate } from 'react-router-dom'
import './Class.css'

interface props {
  Module: string,
  Teacher: string,
}

function Class({ Module, Teacher }: props) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/Module/:${Module}`)
  }
  return (
    <div onClick={handleClick}
      className="class--container ">
      <h2>{Module}</h2>
      <h3>{Teacher}</h3>
    </div>
  )
}

export default Class