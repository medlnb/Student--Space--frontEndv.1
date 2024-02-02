import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";

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
  Link: string;
  Description: string;
  deadLine: date | null;
  speciality: string;
}

export const TasksContext = createContext<{
  state: TaskType[] | null;
  dispatch: any | null;
}>({
  state: null,
  dispatch: null,
});
export const TaskReducer = (
  state: TaskType[] | null,
  action: {
    type: "SETTASKS" | "ADDTASK" | "REMOVETASK";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETTASKS":
      return action.payload;

    case "ADDTASK":
      return state ? [...state, action.payload] : [action.payload];

    case "REMOVETASK":
      if (!state) return;
      return state.filter((task) => task._id !== action.payload);

    default:
      return state;
  }
};
export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<React.Reducer<TaskType[] | null, any>>(
    TaskReducer,
    null
  );
  const fetchTasks = async () => {
    const response = await fetch(`${Server}/api/task/${user.specIndex}`, {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json: TaskType[] = await response.json();
    dispatch({
      type: "SETTASKS",
      payload: json,
    });
  };

  useEffect(() => {
    dispatch({
      type: "SETTASKS",
      payload: null,
    });
    fetchTasks();
  }, [user.specIndex, user.token]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
