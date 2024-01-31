import { useContext, useEffect, useState } from "react";
import "./Promo.css";
import { Server } from "../../Data/API";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { notify } from "../../Pages/HomePage/HomePage";
import ScheduleManager from "../ScheduleManager/ScheduleManager";
import { FaSave } from "react-icons/fa";
import { AuthContext } from "../../Contexts/UserContext";
import TelegramBots from "../TelegramBots/TelegramBots";

function Promo() {
  const { ScheduleData } = useContext(ScheduleContext);
  const [groups, setGroups] = useState(["main"]);
  const [input, setInput] = useState("");
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchingGroups = async () => {
      const response = await fetch(
        `${Server}/api/Schedule/groups/${user.specIndex}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      setGroups(json);
    };
    fetchingGroups();
  }, []);

  const HandleADD = async () => {
    const response = await fetch(
      `${Server}/api/Schedule/${user.specIndex}${input}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${user.token}`,
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
    <>
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Groups</h3>
        </div>
        <div className="taskedit--body">
          <div style={{ display: "flex", gap: ".3rem" }}>
            {groups.map((group: string) => (
              <p key={group}>{group}</p>
            ))}
          </div>
          <div style={{ display: "flex", placeItems: "center", gap: ".5rem" }}>
            <input
              placeholder="New Group..."
              className="task--title--input"
              style={{ width: "10rem" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <FaSave onClick={HandleADD} />
          </div>
        </div>
      </div>
      <ScheduleManager />
      <TelegramBots />
    </>
  );
}

export default Promo;
