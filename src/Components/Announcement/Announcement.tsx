import { useContext } from "react";
import "./Announcement.css";
import AnnouncementElement from "../AnnouncementElement/AnnouncementElement";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AnnouncementsContext } from "../../Contexts/AnnouncementContext";
import { DarkModeContext } from "../../Contexts/Theme";
import { TbMoodEmpty } from "react-icons/tb";

function Announcement() {
  const { DarkMode } = useContext(DarkModeContext);
  const { state } = useContext(AnnouncementsContext);
  const Announcements = state.map((element, index) => (
    <AnnouncementElement
      key={index}
      Publisher={element.Publisher}
      Content={element.Content}
      date={element.Date}
    />
  ));
  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">Announcement</h1>
      {state.length === 0 ? (
        <div className="emptyPage">
          <div className="in--emptyPage">
            <TbMoodEmpty />
            <p>There is no Announcements included yet.</p>
          </div>
        </div>
      ) : state[0].Publisher === "####" ? (
        <div className="loader">
          <PropagateLoader
            color={`${DarkMode ? "white" : "black"}`}
            size={20}
          />
        </div>
      ) : (
        Announcements
      )}
    </div>
  );
}

export default Announcement;
