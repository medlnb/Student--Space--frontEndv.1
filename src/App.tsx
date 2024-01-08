import './App.css'
import HomePage from './Pages/HomePage/HomePage'
import { BrowserRouter,  Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import PromotionRequest from './Components/PromotionRequest/PromotionRequest';
import { useContext, useEffect } from 'react';
import Classes from './Components/Classes/Classes';
import Announcement from './Components/Announcement/Announcement';
import TaskPage from './Components/TaskPage/TaskPage';
import Edit from './Components/Edit/Edit';
import Admin from './Components/Admin/Admin';
import Module from './Components/Module/Module';
import { AuthContext } from './Contexts/UserContext';
import EditClass from './Components/EditClass/EditClass';
import TaskEdit from './Components/TaskEdit/TaskEdit';
import AnnouncementEdit from './Components/AnnouncementEdit/AnnouncementEdit';
import ScheduleEdit from './Components/ScheduleEdit/ScheduleEdit';
import Members from './Components/Members/Members';
import TeachersManager from './Components/TeachersManager/TeachersManager';

function Redirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("My classes")
  }, [])
  return (
    <>
    </>
  )
}
function App() {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/promotionrequest' element={<PromotionRequest />} />
          {user.username &&
            <Route path='/' element={<HomePage />} >
              <Route index element={<Redirect />} />
              <Route path="My classes" element={<Classes />} />
              <Route path="Announcement" element={<Announcement />} />
              <Route path="Task" element={<TaskPage />} />
              {user.speciality[0].Module &&
                <Route path="Edit/" element={<Edit />} >
                  <Route path="" element={<EditClass />} />
                  <Route path="Tasks" element={<TaskEdit />} />
                  <Route path="Annou" element={<AnnouncementEdit />} />
                </Route>
              }
              {/* checking if the user is admin */}
              {user.speciality[0].Admin &&
                <Route path="Admin/" element={<Admin />} >
                  <Route path="" element={<ScheduleEdit />} />
                  <Route path="Members" element={<Members />} />
                  <Route path="Teachers" element={<TeachersManager />} />
                  <Route path="Promo" element={<p style={{ padding: "2.5rem 1rem" }}>Working on it.</p>} />
                </Route>
              }
              <Route path=":selected" element={<Module />} />
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
