import "./HomePage.css";
import "./Main.css";
import { ScheduleContextProvider } from "../../Contexts/ScheduleContext";
import { TasksContextProvider } from "../../Contexts/TaskContext";
import { ClassesContextProvider } from "../../Contexts/Class";
import { useContext } from "react";
import { AnnouncementsContextProvider } from "../../Contexts/AnnouncementContext";
import { DarkModeContext } from "../../Contexts/Theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserBar from "../../Components/UserBar/UserBar";
import NavBar from "../../Components/NavBar/NavBar";
import { toast } from "sonner";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";

export const notify = (
  toastType: "success" | "info" | "warning" | "error",
  toastMsg: string
) =>
  toast[toastType](`${toastMsg}`, {
    position: "top-right",
  });

function HomePage() {
  const { DarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`homepage--container ${
        !DarkMode && "dark--homepage--container"
      }`}
    >
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
                {/* <SideBar /> */}
              </LocalizationProvider>
            </AnnouncementsContextProvider>
          </ScheduleContextProvider>
        </TasksContextProvider>
      </ClassesContextProvider>
    </div>
  );
}

export default HomePage;
