import { useState } from "react";
import "./ScheduleManager.css";
import { FaSave } from "react-icons/fa";

function ScheduleManager() {
  const Types: string[] = ("" + localStorage.getItem("Types")).split("$");
  const ClassRooms: string[] = ("" + localStorage.getItem("ClassRooms")).split(
    "$"
  );

  const [inputs, setInputs] = useState({
    type: "",
    classroom: "",
  });

  const HandleAdd = () => {
    if (inputs.type !== "" || inputs.classroom !== "") {
      Types.push(inputs.type);
      ClassRooms.push(inputs.classroom);
      localStorage.setItem("Types", Types.join("$"));
      localStorage.setItem("ClassRooms", ClassRooms.join("$"));
      setInputs({ type: "", classroom: "" });
    }
  };

  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Types & ClassRooms</h3>
      </div>
      <div className="taskedit--body ">
        <div style={{ display: "flex", gap: ".3rem" }}>
          Class Types:
          {Types.map((type, index) => {
            if (type !== "null" && type !== "")
              return (
                <p
                  style={{ display: "inline-block", marginLeft: ".5rem" }}
                  key={index}
                >
                  {type}
                </p>
              );
          })}
        </div>
        <div>
          ClassRooms:
          {ClassRooms.map((classroom, index) => {
            if (classroom !== "null" && classroom !== "")
              return (
                <p
                  style={{ display: "inline-block", marginLeft: ".5rem" }}
                  key={index}
                >
                  {classroom}
                </p>
              );
          })}
        </div>
        <div className="types--classrooms--container">
          <input
            className="task--title--input"
            style={{ width: "10rem" }}
            placeholder="New ClassType..."
            onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
          />
          <FaSave onClick={HandleAdd} />
          <input
            className="task--title--input"
            style={{ width: "10rem" }}
            placeholder="New ClassRoom..."
            onChange={(e) =>
              setInputs({ ...inputs, classroom: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
