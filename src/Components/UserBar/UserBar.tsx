import { useContext, useState } from "react";
import "./UserBar.css";
import { AuthContext } from "../../Contexts/UserContext";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { DarkModeContext } from "../../Contexts/Theme";
function moveStringToFront(array: string[], targetString: string) {
  const index = array.indexOf(targetString);
  if (index !== -1) {
    array.splice(index, 1);
    array.unshift(targetString);
  }
  let newarray = "";
  array.map((mdl, index) => {
    if (index !== 0) newarray = newarray + "####" + mdl;
    else newarray = newarray + mdl;
  });
  return newarray;
}

function UserBar() {
  const { DarkMode } = useContext(DarkModeContext);
  const { user, handleUserChange } = useContext(AuthContext);
  const specs = ("" + localStorage.getItem("speciality")).split("####");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const HandleChange = (e: any) => {
    const speciality = e.target.value;
    const specialityArray = moveStringToFront(specs, speciality);
    localStorage.setItem("speciality", specialityArray);
    location.reload();
  };

  return (
    <div className="userbar--container">
      <div className="logout--icon">
        <FaUserGraduate onClick={() => setShowUserInfo((prev) => !prev)} />
        {showUserInfo && (
          <div className="logout">
            <div className="up--arrow"></div>
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
            {/* {Object.entries(user).map((element, index) => (
              <p key={index}>
                {`${element[0]} :
                ${
                  element[0] === "speciality"
                    ? element[1][0].name + " / " + element[1][0].Module
                    : element[1]
                }`}
              </p>
            ))} */}
          </div>
        )}
      </div>
      {`Hi, ${user.username}`}
      {specs.length !== 2 && (
        <select
          onChange={HandleChange}
          style={{ background: "none", border: "none", outline: "none" }}
        >
          {specs.map((mdl) => {
            if (mdl != "")
              return (
                <option className="inside--option" key={mdl} value={mdl}>
                  {`${mdl.split("$$")[0]} ~ ${mdl.split("$$")[2]} ~ ${
                    mdl.split("$$")[3]
                  }`}
                </option>
              );
          })}
        </select>
      )}
    </div>
  );
}
export default UserBar;
