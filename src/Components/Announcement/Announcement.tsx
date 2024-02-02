import { useContext } from "react";
import "./Announcement.css";
import AnnouncementElement from "../AnnouncementElement/AnnouncementElement";
import PropagateLoader from "react-spinners/PropagateLoader";
import { AnnouncementsContext } from "../../Contexts/AnnouncementContext";
import { TbMoodEmpty } from "react-icons/tb";

function Announcement() {
  const { state } = useContext(AnnouncementsContext);

  if (!state)
    return (
      <div className="sub--main--container">
        <h1 className="sub--main--title">Announcement</h1>
        <div className="loader">
          <PropagateLoader color="#9ec3db" size={20} />
        </div>
      </div>
    );

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
      ) : (
        state.map((element, index) => (
          <AnnouncementElement
            key={index}
            Publisher={element.Publisher}
            Content={element.Content}
            date={element.Date}
          />
        ))
      )}
    </div>
  );
}

export default Announcement;
