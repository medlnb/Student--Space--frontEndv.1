import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import { useContext } from "react";
import Classes from "./Components/Classes/Classes";
import Announcement from "./Components/Announcement/Announcement";
import TaskPage from "./Components/TaskPage/TaskPage";
import Edit from "./Components/Edit/Edit";
import Admin from "./Components/Admin/Admin";
import Module from "./Components/Module/Module";
import { AuthContext } from "./Contexts/UserContext";
import EditClass from "./Components/EditClass/EditClass";
import TaskEdit from "./Components/TaskEdit/TaskEdit";
import AnnouncementEdit from "./Components/AnnouncementEdit/AnnouncementEdit";
import ScheduleEdit from "./Components/ScheduleEdit/ScheduleEdit";
import Members from "./Components/Members/Members";
import TeachersManager from "./Components/TeachersManager/TeachersManager";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import { MembersContextProvider } from "./Contexts/MembersContext";
import Promo from "./Components/Promo/Promo";
import UserPage from "./Components/UserPage/UserPage";

const AuthenticatedRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user.username) return <Navigate to="/welcome" replace />;
  return <Outlet />;
};

const AdminRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user.speciality[user.specIndex].Admin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <div className="everything--black">
      <BrowserRouter>
        <Routes>
          <Route path="welcome" element={<WelcomePage />}>
            <Route path="" element={<Signup />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="promotionrequest" element={<PromotionRequest />} /> */}
          </Route>
          {/* Wrap routes that require authentication */}
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Navigate to="/User" />} />
              <Route path="User" element={<UserPage />} />
              <Route path="My classes" element={<Classes />} />
              <Route path="Announcement" element={<Announcement />} />
              <Route path="Task" element={<TaskPage />} />
              {/* Prof specific routes */}
              <Route path="Edit/" element={<Edit />}>
                <Route index element={<Navigate to="/Edit/Classes" />} />
                <Route path="Classes" element={<EditClass />} />
                <Route path="Tasks" element={<TaskEdit />} />
                <Route path="Annou" element={<AnnouncementEdit />} />
              </Route>
              {/* Admin specific routes */}
              <Route element={<AdminRoute />}>
                <Route
                  path="Admin/"
                  element={
                    <MembersContextProvider>
                      <Admin />
                    </MembersContextProvider>
                  }
                >
                  <Route index element={<Navigate to="/Admin/Schedule" />} />
                  <Route path="Schedule" element={<ScheduleEdit />} />
                  <Route path="Members" element={<Members />} />
                  <Route path="Promo" element={<Promo />} />
                  <Route path="Teachers" element={<TeachersManager />} />
                </Route>
              </Route>
              <Route path="Module/:selected" element={<Module />} />
              <Route
                path="*"
                element={
                  <div className="sub--main--container ">
                    <div className="center--it">
                      <div>
                        <h1>Page not found</h1>
                        <p>this is the world's edge</p>
                        <a style={{ fontSize: ".8rem" }}>go back man</a>
                      </div>
                    </div>
                  </div>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
