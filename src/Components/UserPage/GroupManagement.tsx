import { useContext, useEffect, useState } from "react";
import "./UserPage.css";
import { Server } from "../../Data/API";
import { AuthContext } from "../../Contexts/UserContext";

function GroupManagement() {
  const [groupData, setGroupData] = useState(["main"]);
  const { user, dispatchUser } = useContext(AuthContext);
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
      setGroupData(json);
    };
    fetchingGroups();
  }, []);
  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Groups</h3>
      </div>
      <div className="taskedit--body editclass--body">
        <div className="groups--card--container">
          {groupData.map((group: string) => {
            return (
              <div
                className={`groups--card ${
                  group === user.Group && "groups--card--selected"
                }`}
                key={group}
                onClick={() => {
                  if (group !== user.Group)
                    dispatchUser({ type: "CHANGEGROUP", payload: group });
                }}
              >
                {group}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GroupManagement;
