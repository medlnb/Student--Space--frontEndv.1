import "./UserPage.css";
import CreateSpec from "./CreateSpec";
import GroupManagement from "./GroupManagement";
import SpecsManagement from "./SpecsManagement";

function UserPage() {
  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">User</h1>
      <GroupManagement />
      <SpecsManagement />
      <CreateSpec />
    </div>
  );
}

export default UserPage;
