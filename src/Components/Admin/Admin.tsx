import { Outlet } from "react-router-dom";
import "./Admin.css";
import EditNavBar from "../EditNavBar/EditNavBar";

function Admin() {
  const NavOptions = ["Schedule", "Members", "Promo", "Teachers"];

  return (
    <div className={`sub--main--container `}>
      <h1 className="sub--main--title">Admin</h1>
      <div className="edit--container">
        <div className="edit--page">
          <Outlet />
        </div>
        <EditNavBar NavOptions={NavOptions} />
      </div>
    </div>
  );
}

export default Admin;
