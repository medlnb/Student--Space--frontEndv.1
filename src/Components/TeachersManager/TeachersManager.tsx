import { useContext, useEffect, useState } from 'react'
import AddTeacher from '../AddTeacher/AddTeacher'
import './TeachersManager.css'
import { Server } from '../../Data/API'
import { AuthContext } from '../../Contexts/UserContext'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { DarkModeContext } from '../../Contexts/Theme'
import DropDown from '../DropDown/DropDown'

function TeachersManager() {
  const { DarkMode } = useContext(DarkModeContext)
  const { user } = useContext(AuthContext)
  const [TeachersData, setTeachersData] = useState([{
    username: "Default",
    Module: "Default",
    email: "Default",
    speciality: []
  }])

  useEffect(() => {
    fetch(`${Server}/api/user/teacher/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.speciality[0].name,
        Year: user.speciality[0].Year
      })
    })
      .then(res => res.json())
      .then(data => setTeachersData(data))
  }, [])
  return (
    <>
      <AddTeacher />
      <div className='taskedit--create'>
        <div className='taskedit--title'>
          <h3>Teachers </h3>
        </div>
        <div className='members--body'>
          {TeachersData[0].email === "Default" ?
            <div className='loader--container'>
              <PropagateLoader
                color={`${DarkMode ? "white" : "black"}`}
                loading={true}
                size={20}
              />
            </div>
            :
            TeachersData.map((teacher: {
              username: string,
              Module: string,
              email: string,
              speciality: {
                Module: string,
                Year: string,
                name: string
              }[]
            }, index: number) => {
              const specs = teacher.speciality.filter(spec =>
                (spec.name === user.speciality[0].name && spec.Year === user.speciality[0].Year))
              const list = specs.map(spec=>spec.Module)
              return (
                <div
                  key={index}
                  className={`members--request ${index !== 0 && "istop--members--request"}`}>
                  <div className='members--body--member--name'>
                    <h4>{teacher.username}</h4>
                  </div>
                  <div className='members--body--member--email'>
                    <h4>{teacher.email}</h4>
                  </div>
                  <div className='members--body--member--module'>
                    <h4>{teacher.Module}</h4>
                  </div>
                  <DropDown list={list} />
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}
export default TeachersManager