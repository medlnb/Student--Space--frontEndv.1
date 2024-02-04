import { useContext, useEffect, useState } from "react";
import "./ScheduleManager.css";
import { FaSave } from "react-icons/fa";
import { Server } from "../../Data/API";
import { AuthContext } from "../../Contexts/UserContext";
import { notify } from "../../Pages/HomePage/HomePage";

function ScheduleManager() {
  const { user } = useContext(AuthContext);
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
  }, []);

  const [inputs, setInputs] = useState({
    ClassTypes: "",
    ClassRooms: "",
  });

  const HandleAdd = async () => {
    if (inputs.ClassTypes === "" && inputs.ClassRooms === "")
      return notify("error", "at least one of the inputs is empty");

    const response = await fetch(
      `${Server}/api/Schedule/scheduleparams/${user.specIndex}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...inputs }),
      }
    );
    if (response.ok) {
      notify("success", "Added Successfully");
      location.reload();
    } else notify("error", "Failed to add");
  };

  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Types & ClassRooms</h3>
      </div>
      <div className="taskedit--body ">
        <div style={{ display: "flex", gap: ".3rem" }}>
          Class Types:
          {params.ClassTypes.map((type, index) => {
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
          {params.ClassRooms.map((classroom, index) => {
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
            onChange={(e) =>
              setInputs({ ...inputs, ClassTypes: e.target.value })
            }
          />
          <FaSave onClick={HandleAdd} />
          <input
            className="task--title--input"
            style={{ width: "10rem" }}
            placeholder="New ClassRoom..."
            onChange={(e) =>
              setInputs({ ...inputs, ClassRooms: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleManager;
