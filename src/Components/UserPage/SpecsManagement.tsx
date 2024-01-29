import { useContext } from "react";
import "./UserPage.css";
import { AuthContext } from "../../Contexts/UserContext";

function SpecsManagement() {
  const { user, dispatchUser } = useContext(AuthContext);

  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Speciality</h3>
      </div>
      <div className="taskedit--body editclass--body">
        <div className="groups--card--container">
          {user.speciality.map((spec: any, index: number) => {
            return (
              <div
                className={`groups--card ${
                  index === user.specIndex && "groups--card--selected"
                }`}
                key={spec.name}
                onClick={() => {
                  if (index !== user.specIndex)
                    dispatchUser({ type: "CHANGEspecIndex", payload: index });
                }}
              >
                {spec.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SpecsManagement;
