import { useContext, useEffect, useState } from "react";
import "./Promo.css";
import { Server } from "../../Data/API";
import { ScheduleContext } from "../../Contexts/ScheduleContext";
import { notify } from "../../Pages/HomePage/HomePage";
import ScheduleManager from "../ScheduleManager/ScheduleManager";
import { FaSave } from "react-icons/fa";
import { AuthContext } from "../../Contexts/UserContext";
import TelegramBots from "../TelegramBots/TelegramBots";
import PropagateLoader from "react-spinners/PropagateLoader";
import ClipLoader from "react-spinners/ClipLoader";

function Promo() {
  const { ScheduleData } = useContext(ScheduleContext);
  const [groups, setGroups] = useState<String[] | null>(null);
  const [input, setInput] = useState("");
  const [isloading, setIsLoading] = useState(false);
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
      const json: [string] = await response.json();
      setGroups(json);
    };
    fetchingGroups();
  }, []);

  const HandleADD = async () => {
    if (input === "") return notify("error", "Group name is empty");
    if (isloading) return notify("error", "Please wait");
    if (groups?.includes(input)) return notify("error", "Group already exists");

    setIsLoading(true);
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
    setIsLoading(false);
    if (response.ok) {
      notify("success", "Group added");
      setGroups([...groups!, input]);
      setInput("");
    } else notify("error", "Something went wrong");
  };

  return (
    <>
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Groups</h3>
        </div>
        <div className="taskedit--body">
          {!groups ? (
            <div style={{ position: "relative", height: "2rem" }}>
              <div className="loader">
                <PropagateLoader color="#9ec3db" size={20} />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: ".3rem" }}>
              {groups.map((group) => (
                <p key={group + ""}>{group}</p>
              ))}
            </div>
          )}
          <div style={{ display: "flex", placeItems: "center", gap: ".5rem" }}>
            <input
              placeholder="New Group..."
              className="task--title--input"
              style={{ width: "10rem" }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {isloading ? (
              <ClipLoader color="yellow" size={15} />
            ) : (
              <FaSave onClick={HandleADD} />
            )}
          </div>
        </div>
      </div>
      <ScheduleManager />
      <TelegramBots />
    </>
  );
}

export default Promo;
