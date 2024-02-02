import { useContext } from "react";
import "./Students.css";
import { MembersContext } from "../../Contexts/MembersContext";
import { AuthContext } from "../../Contexts/UserContext";

function Students() {
  const { state } = useContext(MembersContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Students</h3>
      </div>
      <div className="taskedit--body">
        <div className="taskedit--body--container">
          {state?.map((member, index) => {
            if (member.email === user.email) return null;
            const specs = member.speciality.filter(
              (spec) =>
                spec.name === user.speciality[0].name &&
                spec.Year === user.speciality[0].Year &&
                !spec.Module
            );
            if (specs.length === 0) return null;
            return (
              <div key={index} className="members--request">
                <p>{member.username}</p>
                <p>{member.email}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Students;
