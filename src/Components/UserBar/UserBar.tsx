import { useContext, useEffect, useState } from "react";
import "./UserBar.css";
import { AuthContext } from "../../Contexts/UserContext";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { DarkModeContext } from "../../Contexts/Theme";
import { Server } from "../../Data/API";

function UserBar() {
  const { DarkMode } = useContext(DarkModeContext);
  const [groups, setGroups] = useState(["main"]);
  const { user, handleUserChange } = useContext(AuthContext);
  const specs = ("" + localStorage.getItem("speciality")).split("####");
  const [showUserInfo, setShowUserInfo] = useState(false);

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
  const HandleChange = (e: any) => {
    const specIndex = e.target.value;
    handleUserChange({
      username: user.username,
      email: user.email,
      speciality: user.speciality,
      token: user.token,
      specIndex: specIndex,
    });
    location.reload();
  };

  return (
    <div className="userbar--container">
      <div className="logout--icon">
        <FaUserGraduate onClick={() => setShowUserInfo((prev) => !prev)} />
        {showUserInfo && (
          <div className="logout">
            <div className="up--arrow" />
            <div
              onClick={() =>
                handleUserChange({
                  username: null,
                  email: null,
                })
              }
              className="logout--sign"
            >
              <AiOutlineLogout fill={DarkMode ? "Black" : "white"} />
              Logout
            </div>
          </div>
        )}
      </div>
      {`Hi, ${user.username}`}
      <p style={{ fontSize: ".8rem" }}>Group:</p>
      <select
        style={{ background: "none", border: "none", outline: "none" }}
        onChange={(e) => {
          handleUserChange({
            Group: e.target.value,
          });
        }}
      >
        <option value={user.Group}>{user.Group}</option>
        {groups.map((group) => {
          if (group !== user.Group)
            return (
              <option key={group} value={group}>
                {group}
              </option>
            );
        })}
      </select>

      {specs.length !== 2 && (
        <select
          onChange={HandleChange}
          style={{ background: "none", border: "none", outline: "none" }}
        >
          <option className="inside--option" value={user.specIndex}>
            {`${specs[user.specIndex].split("$$")[0]} ~ ${
              specs[user.specIndex].split("$$")[2]
            } ~ ${specs[user.specIndex].split("$$")[3]}`}
          </option>
          {specs.map((mdl, index) => {
            if (mdl !== "" && mdl != specs[user.specIndex]) {
              return (
                <option className="inside--option" key={mdl} value={index}>
                  {`${mdl.split("$$")[0]} ~ ${mdl.split("$$")[2]} ~ ${
                    mdl.split("$$")[3]
                  }`}
                </option>
              );
            }
          })}
        </select>
      )}
    </div>
  );
}
export default UserBar;
