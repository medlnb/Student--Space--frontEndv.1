import './AnnouncementElement.css'

interface AnnouncementType {
  Publisher: string,
  Content: string,
  Date: Date
}

function AnnouncementElement({ Publisher, Content }: AnnouncementType) {
  return (
    <div className='announcementelement--container'>
      <div className='taskedit--create' >
        <div className='taskedit--title'>
          <h3>{Publisher}</h3>
        </div>
        <div className='AnnouncementElement--body'>
          {Content}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementElement