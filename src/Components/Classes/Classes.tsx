import { useContext } from 'react'
import './Classes.css'
import { ClassesContext } from '../../Contexts/Class'
import Class from '../Class/Class'
import PropagateLoader from 'react-spinners/PropagateLoader'

interface ClassType {
  Module: string,
  Teacher: string,
  description?: string,
  Chapter?: string
}
function Classes() {
  const { state } = useContext(ClassesContext)
  let loading = false
  if (!state)
    return

  if (state[0][0].Module == "default_value")
    loading = true

  const classesData: ClassType[] = []

  state.map(element => {
    classesData.push(element[0])
  })

  const classes = classesData.map((element, index) =>
    <Class
      key={index}
      Module={element.Module}
      Teacher={element.Teacher}
      description={element.description}
    />
  )
  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>Classes</h1>
      {loading ?
        <div className='loader--container'>
          <PropagateLoader
            color={"white"}
            loading={true}
            size={20}
          />
        </div>
        :
        <div className='classes--container'>
          {classes}
        </div>
      }
    </div>
  )
}

export default Classes