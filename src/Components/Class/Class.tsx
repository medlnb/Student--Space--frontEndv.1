import { useNavigate } from 'react-router-dom'
import './Class.css'

interface props {
  Module: string,
  Teacher: string,
  description?: string
}


function Class({ Module, Teacher, description }: props) {
const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/My classes/:${Module}`)
  }
  return (
    <div onClick={handleClick} className='class--container'>
      <h2>{Module}</h2>
      <h3>{Teacher}</h3>
      <p>{description && description}</p>
    </div>
  )
}

export default Class