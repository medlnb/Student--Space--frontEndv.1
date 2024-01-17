import { useContext, useState } from "react";
// import SideScheduleElement from "../ScheduleElement/ScheduleElement";
import "./ScheduleEdit.css";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { Server } from "../../Data/API";
import { notify } from "../../Pages/HomePage/HomePage";
import { FaSave } from "react-icons/fa";
import ScheduleElement from "../ScheduleElement/ScheduleElement";
import ClipLoader from "react-spinners/ClipLoader";

function ScheduleEdit() {
  const [loading, setloading] = useState(false);
  const classes = ["8.00", "9.40", "11.20", "13.10", "14.50", "16.30"];
  const { ScheduleData } = useContext(ScheduleContext);

  const handleSave = async () => {
    setloading(true);
    const response = await fetch(
      `${Server}/api/Schedule/${localStorage.getItem("specIndex")}main`,
      {
        method: "PATCH",
        body: JSON.stringify({ Days: ScheduleData }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setloading(false);
    if (!response.ok) return notify("error", "Error saving schedule");
    else notify("success", "Schedule saved");
  };

  // const startTime = performance.now();

  const Schedule = ScheduleData.map((day, index) => (
    <ScheduleElement key={index} scheduleDay={day} />
  ));
  // const endTime = performance.now();
  // const elapsedTime = endTime - startTime;
  // console.log("Elapsed time:", elapsedTime, "milliseconds");
  return (
    <>
      <div className="hours">
        {classes.map((hour, index) => (
          <p key={index}>{hour}</p>
        ))}
      </div>
      <div className="scheduleedit--container">{Schedule}</div>
      <div style={{ textAlign: "center" }}>
        {loading ? (
          <ClipLoader color="green" size={15} />
        ) : (
          <FaSave onClick={handleSave} />
        )}
      </div>
    </>
  );
}

export default ScheduleEdit;
