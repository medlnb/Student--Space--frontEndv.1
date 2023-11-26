import './AnnouncementElement.css'

interface AnnouncementType {
  Publisher: string,
  Content: string,
  date: Date
}

function AnnouncementElement({ Publisher, Content, date }: AnnouncementType) {
  const dateObject = new Date(date);
  const readableString = dateObject.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' });
  return (
    <div className='announcementelement--container'>
      <div className='taskedit--create' >
        <div className='taskedit--title'>
          <h3>{Publisher}</h3>
        </div>
        <div className='AnnouncementElement--body'>
          {Content}
        </div>
        <h4 style={{
          whiteSpace: "nowrap", textAlign: "right", padding: "0 0.5rem", color: "#939395"
        }}>{`Published at: ${readableString}`}
        </h4>
      </div>
    </div>
  )
}

export default AnnouncementElement