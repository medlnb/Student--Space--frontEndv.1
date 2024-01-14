import { useContext, useEffect, useState } from "react";
import { TbMoodEmpty } from "react-icons/tb";
import "./Classes.css";
import { ClassesContext } from "../../Contexts/Class";
import Class from "../Class/Class";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DarkModeContext } from "../../Contexts/Theme";

interface ClassType {
  Module: string;
  Teacher: string;
  description?: string;
  Chapter?: string;
}
function Classes() {
  const { DarkMode } = useContext(DarkModeContext);
  const [FetchingEnded, setFetchingEnded] = useState(false);
  const { state } = useContext(ClassesContext);
  let loading = false;
  if (!state) return;

  useEffect(() => {
    if (state[state.length - 1][0].Module === "end") setFetchingEnded(true);
  }, [state]);
  const newState = state.filter((Module) => Module[0].Module !== "end");

  if (!newState.length) {
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
  if (newState[0][0].Module === "default_value") loading = true;

  const classesData: ClassType[] = [];

  newState.map((element) => {
    classesData.push(element[0]);
  });

  const classes = classesData.map((element, index) => (
    <Class
      key={index}
      Module={element.Module}
      Teacher={element.Teacher}
      description={element.description}
    />
  ));
  return (
    <div className="sub--main--container">
      <h1 className="sub--main--title">Classes</h1>
      {loading ? (
        <div className="loader--container">
          <PropagateLoader
            color={`${DarkMode ? "white" : "black"}`}
            loading={true}
            size={20}
          />
        </div>
      ) : (
        <div className="classes--container">
          {classes}
          {!FetchingEnded && (
            <div className="class--container" style={{ padding: "0" }}>
              <div className="animated-background"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default Classes;
