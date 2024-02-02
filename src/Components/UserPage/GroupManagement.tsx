import { useContext, useEffect, useState } from "react";
import "./UserPage.css";
import { Server } from "../../Data/API";
import { AuthContext } from "../../Contexts/UserContext";
import PropagateLoader from "react-spinners/PropagateLoader";

function GroupManagement() {
  const [groupData, setGroupData] = useState<String[] | null>(null);
  const { user, dispatchUser } = useContext(AuthContext);

  useEffect(() => {
    setGroupData(null);
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
      const json: String[] = await response.json();
      dispatchUser({ type: "CHANGEGROUP", payload: "main" });
      setGroupData(json);
    };
    fetchingGroups();
  }, [user.specIndex]);
  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Groups</h3>
      </div>
      <div className="taskedit--body editclass--body">
        <div className="groups--card--container">
          {!groupData ? (
            <div style={{ position: "relative", height: "2rem" }}>
              <div className="loader">
                <PropagateLoader color="#9ec3db" size={15} />
              </div>
            </div>
          ) : (
            groupData.map((group) => {
              return (
                <div
                  className={`groups--card ${
                    group === user.Group && "groups--card--selected"
                  }`}
                  key={"" + group}
                  onClick={() => {
                    if (group !== user.Group)
                      dispatchUser({ type: "CHANGEGROUP", payload: group });
                  }}
                >
                  {group}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupManagement;
