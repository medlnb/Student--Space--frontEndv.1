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
    <>
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Types</h3>
        </div>
        <div className="taskedit--body ">
          <div style={{ display: "flex", gap: ".3rem" }}>
            {Types.map((type, index) => {
              if (type !== "null")
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
          <div style={{ display: "flex", placeItems: "center", gap: ".5rem" }}>
            <input
              className="task--title--input"
              style={{ width: "10rem" }}
              placeholder="New Type..."
              onChange={(e) => setInputs({ ...inputs, type: e.target.value })}
            />
            <FaSave onClick={HandleAdd} />
          </div>
        </div>
      </div>
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>ClassRooms</h3>
        </div>
        <div className="taskedit--body">
          <div>
            {ClassRooms.map((classroom, index) => {
              if (classroom !== "null")
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
          <div style={{ display: "flex", placeItems: "center", gap: ".5rem" }}>
            <input
              className="task--title--input"
              style={{ width: "10rem" }}
              placeholder="New ClassRoom..."
              onChange={(e) =>
                setInputs({ ...inputs, classroom: e.target.value })
              }
            />
            <FaSave onClick={HandleAdd} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleManager;
