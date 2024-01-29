import { useContext, useState } from "react";
import "./UserBar.css";
import { AuthContext } from "../../Contexts/UserContext";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { DarkModeContext } from "../../Contexts/Theme";

function UserBar() {
  const { DarkMode } = useContext(DarkModeContext);
  const { user, dispatchUser } = useContext(AuthContext);
  const [showUserInfo, setShowUserInfo] = useState(false);

  return (
    <div className="userbar--container">
      <div className="logout--icon">
        <FaUserGraduate onClick={() => setShowUserInfo((prev) => !prev)} />
        {showUserInfo && (
          <div className="logout">
            <div className="up--arrow" />
            <div
              className="logout--sign"
              onClick={() =>
                dispatchUser({
                  type: "LOGOUT",
                })
              }
            >
              <AiOutlineLogout fill={DarkMode ? "Black" : "white"} />
              Logout
            </div>
          </div>
        )}
      </div>
      {`Hi, ${user.username}`}
    </div>
  );
}
export default UserBar;
