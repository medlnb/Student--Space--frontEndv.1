import { useContext, useEffect, useState } from "react";
import "./SideSchedule.css";
import { ScheduleContext } from "../../Contexts/ScheduleContext";

const getShortCut = (str: string) => {
  const words = str.split(" ");
  if (words.length == 1) return str;

  const firstLetters = words.map((word) => {
    if (!isNaN(parseFloat(word))) return word;
    return word[0];
  });
  return firstLetters.join("");
};

function SideSchedule() {
  const [ToggleSchedule, setToggleSchedule] = useState(true);
  useEffect(() => {
    if (window.innerWidth <= 700) return setToggleSchedule(false);
  }, []);

  const hours = ["8.00", "9.40", "11.20", "13.10", "14.50", "16.30"];
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];

  const { ScheduleData } = useContext(ScheduleContext);

  const data = ScheduleData.map((day) => {
    return (
      <div
        className="schedule--day"
        key={day.dayID}
        style={
          !((day.dayID + 1) % 6)
            ? { borderRadius: "0 .5rem .5rem 0 " }
            : (day.dayID + 1) % 6 == 1
            ? { borderRadius: ".5rem 0 0 .5rem" }
            : {}
        }
      >
        {day.Classname !== " " ? (
          <>
            <p>{getShortCut(day.Classname)}</p>
            <p>{day.Type}</p>
            <p>{getShortCut(day.Classroom)}</p>
          </>
        ) : (
          <div style={{ visibility: "hidden" }}>
            <p>b</p>
            <p>b</p>
            <p>b</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className="sideschedule--container--big"
      onClick={() => {
        if (window.innerWidth <= 700) setToggleSchedule((prev) => !prev);
      }}
    >
      <h3 className="sideschedule--title">Schedule</h3>
      {ToggleSchedule && ScheduleData.length !== 0 && (
        <div className="big--days">
          <div className="leftSide--days">
            {days.map((day, index) => (
              <p key={index}>{day}</p>
            ))}
          </div>
          <div className="rightSide--days">
            <div className="hours">
              {hours.map((hour, index) => (
                <p key={index}>{hour}</p>
              ))}
            </div>
            <div className="days--grid">{data}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideSchedule;
