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
import NavBar from "../../Components/NavBar/NavBar";
import { toast } from "sonner";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";
import SideBar from "../../Components/SideBar/SideBar";
import { Server } from "../../Data/API";

export const notify = (
  toastType: "success" | "info" | "warning" | "error",
  toastMsg: string
) =>
  toast[toastType](`${toastMsg}`, {
    position: "top-right",
  });

function HomePage() {
  const { user, dispatchUser } = useContext(AuthContext);
  const { DarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    // Web App version check
    if (localStorage.getItem("V") !== "1.0.0") {
      localStorage.clear();
      location.reload();
      return 
    }
    // User version check
    const fetchUserVersion = async () => {
      const response = await fetch(`${Server}/api/user/version`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        if ("" + json.__v !== localStorage.getItem("__v")) {
          dispatchUser({
            type: "SETUSER",
            payload: {
              username: json.username,
              email: json.email,
              speciality: json.speciality,
              token: json.token,
              specIndex: 0,
              __v: json.__v,
            },
          });
          notify("info", "Ur acc is updated");
          return;
        }
      }
    };
    fetchUserVersion();
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
                  {user.speciality[user.specIndex].Module && <SideBar />}
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
