import { useContext } from "react";
import Task from "../Task/Task";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./OngoingTasks.css";
import { TasksContext } from "../../Contexts/TaskContext";

interface date {
  day: number;
  month: number;
  year: number;
  time: string;
}
interface TaskType {
  _id?: string;
  className: string;
  taskTitle: string;
  deadLine: date | null;
}

function OngoingTasks() {
  const { state } = useContext(TasksContext);

  if (!state)
    return (
      <div style={{ position: "relative", height: "2rem" }}>
        <div className="loader">
          <PropagateLoader color="#9ec3db" size={20} />
        </div>
      </div>
    );

  if (state.length == 0)
    return (
      <div className="ongointasks--container">
        <div className="top--task--container">
          <h3>Module (Task)</h3>
          <h3>Time left</h3>
        </div>
        <h4>U have no tasks relax.</h4>
      </div>
    );

  return (
    <div className="ongointasks--container">
      <div className="top--task--container">
        <h3>Module (Task)</h3>
        <h3>Time left</h3>
      </div>
      {state.map((task: TaskType, index: number) => (
        <Task
          key={index}
          className={task.className}
          deadLine={task.deadLine}
          taskTitle={task.taskTitle}
        />
      ))}
    </div>
  );
}

export default OngoingTasks;
