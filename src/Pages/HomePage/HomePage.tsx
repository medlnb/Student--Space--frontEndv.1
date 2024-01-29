import "./HomePage.css";
import "./Main.css";
import { ScheduleContextProvider } from "../../Contexts/ScheduleContext";
import { TasksContextProvider } from "../../Contexts/TaskContext";
import { ClassesContextProvider } from "../../Contexts/Class";
import { useContext, useEffect } from "react";
import { AnnouncementsContextProvider } from "../../Contexts/AnnouncementContext";
import { DarkModeContext } from "../../Contexts/Theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserBar from "../../Components/UserBar/UserBar";
import SideBar from "../../Components/SideBar/SideBar";
import NavBar from "../../Components/NavBar/NavBar";
import { toast } from "sonner";
import { AuthContext } from "../../Contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

export const notify = (
  toastType: "success" | "info" | "warning" | "error",
  toastMsg: string
) =>
  toast[toastType](`${toastMsg}`, {
    position: "top-right",
  });

function HomePage() {
  const { DarkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.speciality.length === 0) {
      navigate("/User");
    }
  }, []);

  return (
    <div
      className={`homepage--container ${
        !DarkMode && "dark--homepage--container"
      }`}
    >
      {user.speciality.length > 0 ? (
        <ClassesContextProvider>
          <TasksContextProvider>
            <ScheduleContextProvider>
              <AnnouncementsContextProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <NavBar />
                  <div className="main--container">
                    <UserBar />
                    <Outlet />
                  </div>
                  {/* {!user.speciality[0].Module && <SideBar />} */}
                  {/* <SideBar /> */}
                </LocalizationProvider>
              </AnnouncementsContextProvider>
            </ScheduleContextProvider>
          </TasksContextProvider>
        </ClassesContextProvider>
      ) : (
        <>
          <NavBar />
          <div className="main--container">
            <UserBar />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
