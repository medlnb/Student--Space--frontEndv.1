import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Server } from "../Data/API";
import { AuthContext } from "./UserContext";
interface scheduleDayType {
  dayID: number;
  Classname: string;
  Classroom: string;
  Type: string;
}
export const ScheduleContext = createContext<{
  ScheduleData: scheduleDayType[];
  dispatch: any;
}>({
  ScheduleData: [],
  dispatch: () => {},
});

export const ScheduleReducer = (state: scheduleDayType[], action: any) => {
  switch (action.type) {
    case "SETSCHEDULE":
      return action.payload;

    case "PATCHSCHEDULE":
      return [
        ...state.slice(0, action.payload.dayID),
        {
          ...state[action.payload.dayID],
          [action.payload.targeted]: action.payload.value,
        },
        ...state.slice(action.payload.dayID + 1),
      ];

    default:
      return state;
  }
};

export const ScheduleContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ScheduleData, dispatch] = useReducer<
    React.Reducer<scheduleDayType[], any>
  >(ScheduleReducer, []);
  const { user } = useContext(AuthContext);

  const fetchingSchedule = async () => {
    const response = await fetch(
      `${Server}/api/Schedule/${user.specIndex}${user.Group}`,
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    dispatch({
      type: "SETSCHEDULE",
      payload: json.Days,
    });
  };
  useEffect(() => {
    // dispatch({
    //   type: "SETSCHEDULE",
    //   payload: null,
    // });
    fetchingSchedule();
  }, [user.Group, user.specIndex, user.token]);
  return (
    <ScheduleContext.Provider value={{ ScheduleData, dispatch }}>
      {children}
    </ScheduleContext.Provider>
  );
};
