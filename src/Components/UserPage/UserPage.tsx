import { useEffect, useState } from "react";
import "./UserPage.css";
import { Server } from "../../Data/API";
import CreateSpec from "./CreateSpec";

function UserPage() {
  // const [specs, setSpecs] = useState([]);
  // useEffect(() => {
  //   fetch(`${Server}/api/user/specs`)
  //     .then((res) => res.json())
  //     .then((data: any) => {
  //       console.log(data);
  //       setSpecs(data);
  //     });
  // }, []);
  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">User</h1>
      <CreateSpec />
    </div>
  );
}

export default UserPage;
