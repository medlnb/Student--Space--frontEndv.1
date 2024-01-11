import "./WelcomeNav.css";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaBookReader } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WelcomeNav() {
  return (
    <div className="WelcomeNav--container">
      <div>
        <div className="WelcomeNav--signup--container">
          <User title="Student" icon={<PiStudentBold />} path="signup/stu" />
          <User
            title="Professor"
            icon={<FaChalkboardTeacher />}
            path="signup/prof"
          />
          <User
            title="Manager"
            icon={<FaBookReader />}
            path="promotionrequest"
          />
        </div>
        <h2 style={{ textAlign: "center", margin: "1.5rem 0 " }}>
          Sign up your role
        </h2>
      </div>
      <div className="line" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="WelcomeNav--signup--container">
          <User title="User" icon={<FaRegUser />} path="login" />
        </div>
        <h2 style={{ textAlign: "center", margin: "1.5rem 0" }}>Log in</h2>
      </div>
    </div>
  );
}
export default WelcomeNav;

function User({
  title,
  icon,
  path,
}: {
  title: string;
  icon: JSX.Element;
  path: string;
}) {
  const navigate = useNavigate();
  return (
    <div
      className="User--container"
      onClick={() => navigate("/welcome/" + path)}
    >
      <div className="icons">{icon}</div>
      <div className="">{title}</div>
    </div>
  );
}
