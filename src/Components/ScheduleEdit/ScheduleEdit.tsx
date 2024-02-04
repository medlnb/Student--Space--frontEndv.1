import { useContext, useEffect, useState } from "react";
import "./ScheduleEdit.css";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { Server } from "../../Data/API";
import { notify } from "../../Pages/HomePage/HomePage";
import { FaSave } from "react-icons/fa";
import ScheduleElement from "../ScheduleElement/ScheduleElement";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Contexts/UserContext";
import { MembersContext } from "../../Contexts/MembersContext";

function ScheduleEdit() {
  const [loading, setloading] = useState(false);
  const { ScheduleData } = useContext(ScheduleContext);
  const { user } = useContext(AuthContext);
  const { state } = useContext(MembersContext);
  const classes = ["8.00", "9.40", "11.20", "13.10", "14.50", "16.30"];

  const [params, setParams] = useState({
    ClassTypes: [],
    ClassRooms: [],
  });

  useEffect(() => {
    const getparames = async () => {
      const response = await fetch(
        `${Server}/api/Schedule/GetParams/${user.specIndex}${user.Group}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const { ClassTypes, ClassRooms } = await response.json();
      setParams({ ClassTypes, ClassRooms });
    };
    getparames();
  }, [user.specIndex]);

  const modules: string[] = [" "];

  state?.map((teacher) => {
    teacher.speciality.map((spec) => {
      if (
        spec.name === user.speciality[user.specIndex].name &&
        spec.Year === user.speciality[user.specIndex].Year &&
        spec.Module
      )
        modules.push(spec.Module);
    });
  });

  const handleSave = async () => {
    setloading(true);
    const response = await fetch(
      `${Server}/api/Schedule/${user.specIndex}${user.Group}`,
      {
        method: "PATCH",
        body: JSON.stringify({ Days: ScheduleData }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setloading(false);
    if (!response.ok) return notify("error", "Error saving schedule");
    else notify("success", "Schedule saved");
  };

  return (
    <>
      <div className="hours">
        {classes.map((hour, index) => (
          <p key={index}>{hour}</p>
        ))}
      </div>
      <div className="scheduleedit--container">
        {ScheduleData.map((day, index) => (
          <ScheduleElement
            key={index}
            scheduleDay={day}
            modules={modules}
            ClassTypes={params.ClassTypes}
            ClassRooms={params.ClassRooms}
          />
        ))}
      </div>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
