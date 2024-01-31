import "./UserPage.css";
import CreateSpec from "./CreateSpec";
import GroupManagement from "./GroupManagement";
import SpecsManagement from "./SpecsManagement";
import SpecsRequest from "./SpecsRequest";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/UserContext";

function UserPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">User</h1>
      <div className="edit--container">
        <div className="edit--page">
          {user.speciality.length !== 0 && (
            <>
              <GroupManagement />
              <SpecsManagement />
            </>
          )}
          <SpecsRequest />
          <CreateSpec />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
