import { useContext, useState } from "react";
import "./UserBar.css";
import { AuthContext } from "../../Contexts/UserContext";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { DarkModeContext } from "../../Contexts/Theme";

function UserBar() {
  const { DarkMode } = useContext(DarkModeContext);
  const { user, handleUserChange } = useContext(AuthContext);
  const specs = ("" + localStorage.getItem("speciality")).split("####");
  const [showUserInfo, setShowUserInfo] = useState(false);

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
