import "./WelcomePage.css";
import logo from "../../assets/KasdiLogo.png";
import { Outlet } from "react-router-dom";

function WelcomePage() {
  return (
    <div className="welcomePage--container">
      <div className="welcomePage--left">
        <img src={logo} className="welcomePage--logo" />
      </div>
      <div className="welcomePage--right">
        <Outlet />
      </div>
    </div>
  );
}

export default WelcomePage;
