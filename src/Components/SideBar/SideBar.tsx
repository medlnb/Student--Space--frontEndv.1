import OngoingTasks from '../OngoingTasks/OngoingTasks'
import SideSchedule from '../SideSchedule/SideSchedule'
import './SideBar.css'

function SideBar() {
  return (
    <div className='sidebar--container'>
      <SideSchedule />
      <OngoingTasks />
    </div>
  )
}

export default SideBar