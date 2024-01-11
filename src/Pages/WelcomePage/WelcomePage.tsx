import "./WelcomePage.css";
import logo from "../../assets/Logo.png";
import { Outlet } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcomePage--container">
      <div className="welcomePage--left">
        <img src={logo} className="welcomePage--logo" />
        <p>
          Student's space is a platform designed for teachers to easily manage
          their classrooms, as well as handle student attendance and
          participation.
          <br />
          <br />
          The website also assists students in staying organized, motivated, and
          engaged in their coursework, providing a safe and supportive learning
          environment.
        </p>
      </div>
      <div className="welcomePage--right">
        <Outlet />
      </div>
    </div>
  );
}

export default WelcomePage;
