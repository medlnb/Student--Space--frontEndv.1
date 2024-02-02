import { useContext } from "react";
import AddTeacher from "../AddTeacher/AddTeacher";
import "./TeachersManager.css";
import { AuthContext } from "../../Contexts/UserContext";
import PropagateLoader from "react-spinners/PropagateLoader";
import DropDown from "../DropDown/DropDown";
import { MembersContext } from "../../Contexts/MembersContext";

function TeachersManager() {
  const { user } = useContext(AuthContext);
  const { state } = useContext(MembersContext);
  return (
    <>
      <AddTeacher />
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Teachers </h3>
        </div>
        <div className="members--body">
          {!state ? (
            <div className="loader">
              <PropagateLoader
                color="#9ec3db"
                size={20}
              />
            </div>
          ) : (
            state.map((teacher, index: number) => {
              const specs = teacher.speciality.filter(
                (spec) =>
                  spec.name === user.speciality[0].name &&
                  spec.Year === user.speciality[0].Year &&
                  spec.Module
              );
              if (specs.length === 0) return null;
              const list: string[] = specs.map((spec) => spec.Module!) || [
                "No Module",
              ];
              return (
                <div
                  key={index}
                  className={`members--request ${
                    index !== 0 && "istop--members--request"
                  }`}
                >
                  <div className="members--body--member--name">
                    <h4>{teacher.username}</h4>
                  </div>
                  <div className="members--body--member--email">
                    <h4>{teacher.email}</h4>
                  </div>
                  <DropDown list={list} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
export default TeachersManager;
