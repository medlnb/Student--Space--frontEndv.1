import { useContext } from "react";
import { TasksContext } from "../../Contexts/TaskContext";
import "./TaskPage.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DarkModeContext } from "../../Contexts/Theme";
import { TbMoodEmpty } from "react-icons/tb";
function TaskPage() {
  const { DarkMode } = useContext(DarkModeContext);
  const { state } = useContext(TasksContext);
  if (!state) return;

  const Tasks = state.map((element, index) => (
    <div className="Task--container" key={index}>
      <h3 className="tasks--title">
        {element.className} ({element.taskTitle}){" "}
      </h3>
      {element.Description && (
        <>
          <p>Description:</p>
          <p className="Description--container">{element.Description}</p>
          <a href={element.Link.split("###bakhso###")[1]} target="_blank">
            {element.Link.split("###bakhso###")[0]}
          </a>
        </>
      )}
      <p className="task--deadline">
        DeadLine: {element.deadLine?.day}/{element.deadLine?.month}/
        {element.deadLine?.year} {element.deadLine?.time}
      </p>
    </div>
  ));
  return (
    <div className="sub--main--container ">
      <h1 className="sub--main--title">Tasks</h1>
      <div className="tasks--container">
        {state.length === 0 ? (
          <div className="emptyPage">
            <div className="in--emptyPage">
              <TbMoodEmpty />
              <p>There is no Tasks included yet.</p>
            </div>
          </div>
        ) : state[0]._id === "default_value" ? (
          <div className="loader--container">
            <PropagateLoader
              color={`${DarkMode ? "white" : "black"}`}
              loading={true}
              size={20}
            />
          </div>
        ) : (
          Tasks
        )}
      </div>
    </div>
  );
}

export default TaskPage;
