import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Server } from "../Data/API";
import { notify } from "../Pages/HomePage/HomePage";
import { AuthContext } from "./UserContext";

interface ClassType {
  Module: string;
  Teacher: string;
  description?: string;
  Chapter?: string;
}

export const ClassesContext = createContext<{
  state: ClassType[] | null;
  dispatch: any;
}>({
  state: null,
  dispatch: null,
});

// const GroupingData = (Data: any) => {
//   const groupedData: any = [];
//   const moduleIndexes = new Map();
//   Data.forEach((item: any) => {
//     const { Module } = item;
//     if (!moduleIndexes.has(Module)) {
//       moduleIndexes.set(Module, groupedData.length);
//       groupedData.push([]);
//     }
//     const index = moduleIndexes.get(Module);
//     groupedData[index].push(item);
//   });
//   return groupedData;
// };

export const ClassReducer = (
  state: ClassType[] | null,
  action: { type: "SETCLASSES" | "ADDCLASSES"; payload: ClassType[] | null }
) => {
  switch (action.type) {
    case "SETCLASSES":
      return action.payload;

    case "ADDCLASSES":
      if (!action.payload) return state;
      return state ? [...state, ...action.payload] : action.payload;

    default:
      return state;
  }
};
export const ClassesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<React.Reducer<ClassType[] | null, any>>(
    ClassReducer,
    null
  );
  const fetchNotes = async () => {
    let index = 0;
    while (1) {
      const response = await fetch(
        `${Server}/api/file/${index}${user.specIndex}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        notify("error", "Something went during getting the Classes");
        break;
      }

      const json = await response.json();

      if (!json.length) {
        if (index === 0)
          dispatch({
            type: "SETCLASSES",
            payload: [
              {
                Module: "end",
                Teacher: "",
              },
            ],
          });
        else
          dispatch({
            type: "ADDCLASSES",
            payload: [
              {
                Module: "end",
                Teacher: "",
              },
            ],
          });
        break;
      }
      dispatch({
        type: `${index === 0 ? "SETCLASSES" : "ADDCLASSES"}`,
        payload: json,
      });
      index++;
    }
  };
  useEffect(() => {
    dispatch({
      type: "SETCLASSES",
      payload: null,
    });
    fetchNotes();
  }, [user.specIndex, user.token]);
  return (
    <ClassesContext.Provider value={{ state, dispatch }}>
      {children}
    </ClassesContext.Provider>
  );
};
