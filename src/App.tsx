import "./App.css";
import HomePage, { notify } from "./Pages/HomePage/HomePage";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import PromotionRequest from "./Components/PromotionRequest/PromotionRequest";
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
import WelcomeNav from "./Components/WelcomeNav/WelcomeNav";

const AuthenticatedRoute: React.FC = () => {
  const { user } = useContext(AuthContext);
  if (!user.username) {
    return <Navigate to="/welcome" replace />;
  }
  if (user.speciality.length === 0) {
    notify(
      "error",
      " Hi {user.username}, \n it seems like you are not included in any promotion, \n so there is no specialty assigned to you yet. \n Please provide your email to your school's administrator to Add you in."
    );
    return <Navigate to="/welcome" replace />;
  }
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
            <Route path="" element={<WelcomeNav />} />
            <Route path="signup/prof" element={<Signup isTeacher={true}/>} />
            <Route path="signup/stu" element={<Signup isTeacher={false}/>} />
            <Route path="login" element={<Login />} />
            <Route path="promotionrequest" element={<PromotionRequest />} />
          </Route>
          {/* Wrap routes that require authentication */}
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Navigate to="/My classes" replace />} />
              <Route path="My classes" element={<Classes />} />
              <Route path="Announcement" element={<Announcement />} />
              <Route path="Task" element={<TaskPage />} />
              {/* Prof specific routes */}
              {
                <Route path="Edit/" element={<Edit />}>
                  <Route path="" element={<EditClass />} />
                  <Route path="Tasks" element={<TaskEdit />} />
                  <Route path="Annou" element={<AnnouncementEdit />} />
                </Route>
              }
              {/* Admin specific routes */}
              <Route element={<AdminRoute />}>
                <Route path="Admin/" element={<Admin />}>
                  <Route path="" element={<ScheduleEdit />} />
                  <Route path="Members" element={<Members />} />
                  <Route path="Teachers" element={<TeachersManager />} />
                  <Route
                    path="Promo"
                    element={
                      <p style={{ padding: "2.5rem 1rem" }}>Working on it.</p>
                    }
                  />
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
