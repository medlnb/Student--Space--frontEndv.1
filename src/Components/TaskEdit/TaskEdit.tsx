import { useContext, useState } from "react";
import "./TaskEdit.css";
import { DateTimePicker, pickersLayoutClasses } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AuthContext } from "../../Contexts/UserContext";
import { TasksContext } from "../../Contexts/TaskContext";
import { BiTrash } from "react-icons/bi";
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from "../../Pages/HomePage/HomePage";
import { Server } from "../../Data/API";
import PropagateLoader from "react-spinners/PropagateLoader";

function TaskEdit() {
  const { user } = useContext(AuthContext);
  const { state, dispatch } = useContext(TasksContext);

  const [isloadingDel, setIsloadingDel] = useState(-1);
  const newstate = state?.filter((task) => task.className === user.username);

  const HandleDelete = async (id: string | undefined, index: number) => {
    setIsloadingDel(index);
    const response = await fetch(`${Server}/api/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    setIsloadingDel(-1);
    if (response.ok)
      dispatch({
        type: "REMOVETASK",
        payload: id,
      });
  };

  const today = new Date();
  const [inputs, setInputs] = useState<{
    taskTitle: string;
    Description: string;
    deadline: Dayjs | null;
    Link: string;
    LinkTitle: string;
    loading: boolean;
  }>({
    taskTitle: "",
    Description: "",
    Link: "",
    LinkTitle: "",
    deadline: dayjs(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T00:00`
    ),
    loading: false,
  });

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    if (!inputs.deadline) return;

    if (inputs.taskTitle == "")
      return notify("error", "Task must have a title");

    setInputs((prev) => ({
      ...prev,
      loading: true,
    }));

    const task = {
      taskTitle: inputs.taskTitle,
      Description: inputs.Description,
      Link: inputs.LinkTitle + "###bakhso###" + inputs.Link,
      deadLine: {
        day: parseInt(inputs.deadline.format("DD")),
        month: parseInt(inputs.deadline.format("MM")),
        year: parseInt(inputs.deadline.format("YYYY")),
        time: inputs.deadline.format("HH:mm"),
      },
    };

    const response = await fetch(
      `${Server}/api/task/create/${user.specIndex}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(task),
      }
    );
    const json = await response.json();
    setInputs((prev) => ({
      ...prev,
      loading: false,
      taskTitle: "",
      Description: "",
    }));
    if (response.ok)
      dispatch({
        type: "ADDTASK",
        payload: json,
      });
  };

  return (
    <div className="editclass--container">
      <form className="taskedit--create" onSubmit={HandleSubmit}>
        <div className="taskedit--title">
          <h3>New Task</h3>
        </div>
        <div className="taskedit--body ">
          <input
            placeholder="Task title..."
            value={inputs.taskTitle}
            className="task--title--input"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, taskTitle: e.target.value }))
            }
          />
          <textarea
            placeholder="Description..."
            value={inputs.Description}
            className="task--title--input"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, Description: e.target.value }))
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: ".5rem",
            }}
          >
            <input
              placeholder="Relatived Link Title..."
              value={inputs.LinkTitle}
              className="task--title--input"
              style={{ width: "30%" }}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, LinkTitle: e.target.value }))
              }
            />
            <input
              placeholder="Link..."
              value={inputs.Link}
              style={{ flex: 1 }}
              className="task--title--input"
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, Link: e.target.value }))
              }
            />
          </div>
          <DateTimePicker
            className="DateTimePicker"
            slotProps={{
              layout: {
                sx: {
                  [`.${pickersLayoutClasses.contentWrapper}`]: {
                    background: "#19161f",
                  },

                  [`.${pickersLayoutClasses.actionBar}`]: {
                    background: "#19161f",
                  },
                },
              },
            }}
            value={inputs.deadline}
            onChange={(newValue) =>
              setInputs((prev) => ({ ...prev, deadline: newValue }))
            }
            label="DeadLine:"
          />
          <button
            className={
              inputs.loading
                ? "taskedit--body--submit isSubmitting"
                : "taskedit--body--submit"
            }
          >
            Add
            <ClipLoader
              color="#9ec3db"
              loading={inputs.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </div>
      </form>

      {!newstate ? (
        <div style={{ position: "relative", height: "2rem" }}>
          <div className="loader">
            <PropagateLoader
              color="#9ec3db"
              size={20}
            />
          </div>
        </div>
      ) : (
        newstate.length !== 0 && (
          <div className="taskedit--create">
            <div className="taskedit--title">
              <h3>Delete Tasks</h3>
            </div>
            <div className="taskedit--body">
              {newstate?.map((task, index) => (
                <div
                  className="tasktodelete"
                  key={index}
                  onClick={() => HandleDelete(task._id, index)}
                >
                  <h4>{task.taskTitle}</h4>
                  {isloadingDel === index ? (
                    <ClipLoader
                    color="#9ec3db"
                      size={15}
                    />
                  ) : (
                    <BiTrash />
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default TaskEdit;
