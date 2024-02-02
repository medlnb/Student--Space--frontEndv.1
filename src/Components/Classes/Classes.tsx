import { useContext } from "react";
import { TbMoodEmpty } from "react-icons/tb";
import "./Classes.css";
import { ClassesContext } from "../../Contexts/Class";
import Class from "../Class/Class";
import PropagateLoader from "react-spinners/PropagateLoader";

interface ClassType {
  Module: string;
  Teacher: string;
  description?: string;
  Chapter?: string;
}
function Classes() {
  const { state } = useContext(ClassesContext);

  if (!state)
    return (
      <div className="sub--main--container">
        <h1 className="sub--main--title">Classes</h1>
        <div className="loader">
          <PropagateLoader
            color="#9ec3db"
            size={20}
          />
        </div>
      </div>
    );

  if (!state.length) {
    return (
      <div className="sub--main--container">
        <h1 className="sub--main--title">Classes</h1>
        <div className="emptyPage">
          <div className="in--emptyPage">
            <TbMoodEmpty />
            <p>There is no Classes included yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const FetchingEnded = state[state.length - 1].Module === "end";

  const Modules: string[] = [];
  state.map((Class: ClassType) => {
    if (
      !Modules.includes(Class.Module + "$$" + Class.Teacher) &&
      Class.Module !== "end"
    )
      return Modules.push(Class.Module + "$$" + Class.Teacher);
  });

  if (state[0].Module === "end") {
    return (
      <div className="sub--main--container">
        <h1 className="sub--main--title">Classes</h1>
        <div className="emptyPage">
          <div className="in--emptyPage">
            <TbMoodEmpty />
            <p>There is no Classes included yet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">Classes</h1>
      <div className="classes--container">
        {Modules.map((element, index) => (
          <Class
            key={index}
            Module={element.split("$$")[0]}
            Teacher={element.split("$$")[1]}
          />
        ))}
        {!FetchingEnded && (
          <div className="class--container" style={{ padding: "0" }}>
            <div className="animated-background"></div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Classes;
