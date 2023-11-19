import { useEffect, useState } from 'react'
import './Announcement.css'
import AnnouncementElement from '../AnnouncementElement/AnnouncementElement'
import PropagateLoader from 'react-spinners/PropagateLoader'

interface AnnouncementType {
  Publisher: string,
  Content: string,
  Date: Date
}

function Announcement() {
  const [AnnouncementsData, setAnnouncementsData] = useState<AnnouncementType[]>([{
    Publisher: "####",
    Content: "####",
    Date: new Date()
  }
  ])
  useEffect(() => {
    const getData = async () => {
      const response = await fetch("https://student-space-backend.onrender.com/api/announcement")
      const json = await response.json()
      setAnnouncementsData(json)
    }
    getData()
  }, [])

  const Announcements = AnnouncementsData.map((element, index) => (
    <AnnouncementElement
      key={index}
      Publisher={element.Publisher}
      Content={element.Content}
      Date={element.Date}
    />
  )
  )
  return (
    <div className='sub--main--container'>
      <h1 className='sub--main--title'>Announcement</h1>
      <div className='flex--it'>
        {AnnouncementsData.length === 0 ?
        <p>Nothing New.</p>  
          :(AnnouncementsData[0].Publisher === "####") ?
          <PropagateLoader
            color={"white"}
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