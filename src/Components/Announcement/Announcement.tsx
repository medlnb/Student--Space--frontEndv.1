import { useContext } from 'react'
import './Announcement.css'
import AnnouncementElement from '../AnnouncementElement/AnnouncementElement'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { AnnouncementsContext } from '../../Contexts/AnnouncementContext'
import { DarkModeContext } from '../../Contexts/Theme'

function Announcement() {
  const {DarkMode} = useContext(DarkModeContext)
  const { state } = useContext(AnnouncementsContext)
  if (!state)
    return
  const Announcements = state.map((element, index) => (
    <AnnouncementElement
      key={index}
      Publisher={element.Publisher}
      Content={element.Content}
      date={element.Date}
    />
  ))
  return (
    <div className={`sub--main--container ${!DarkMode && "dark--sub--main--container"}`}>
      <h1 className='sub--main--title'>Announcement</h1>
      <div className='flex--it'>
        {state.length === 0 ?
          <p>Nothing New.</p>
          : (state[0].Publisher === "####") ?
            <PropagateLoader
              color={`${DarkMode ? "white" : "black"}`}
              loading={true}
              size={20}
            />
            :
            Announcements}
      </div>
    </div>
  )
}

export default Announcement