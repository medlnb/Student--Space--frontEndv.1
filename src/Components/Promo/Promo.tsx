import { useContext, useEffect, useState } from "react";
import "./Promo.css";
import { Server } from "../../Data/API";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { notify } from "../../Pages/HomePage/HomePage";

function Promo() {
  const { ScheduleData } = useContext(ScheduleContext);
  const [groups, setGroups] = useState(["main"]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const fetchingGroups = async () => {
      const response = await fetch(`${Server}/api/Schedule/groups/0`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      setGroups(json);
    };
    fetchingGroups();
  }, []);
  const HandleADD = async () => {
    const response = await fetch(
      `${Server}/api/Schedule/${localStorage.getItem("specIndex")}${input}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          Days: ScheduleData,
        }),
      }
    );
    if (response.ok) {
      location.reload();
    } else notify("error", "Something went wrong");
  };
  return (
    // <div className="Promo">
    //   {groups.map((group: string) => (
    //     <p>{group}</p>
    //   ))}
    //   {/* <div></div> */}
    // </div>
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Groups</h3>
      </div>
      <div className="taskedit--body ">
        {groups.map((group: string) => (
          <p key={group}>{group}</p>
        ))}
        <div style={{ display: "flex", gap: ".5rem" }}>
          <input
            placeholder="New Group..."
            className="task--title--input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            style={{ background: "none", border: "none" }}
            onClick={HandleADD}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Promo;
