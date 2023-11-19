import './NavElement.css'

interface props {
  title: string,
  icon: any,
  isSelected: boolean,
  HandleClick: any
}

function NavElement({ title, icon, isSelected, HandleClick }: props) {
  return (
    <div
      className={isSelected ? 'navelement--container selected' : "navelement--container "}
      onClick={() => HandleClick(title)}>
      <div className='icon--holder'>
        {icon}
      </div>
      {title}
    </div>
  )
}

export default NavElement