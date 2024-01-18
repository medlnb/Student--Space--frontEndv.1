import { useContext } from "react";
import "./ScheduleElement.css";
import { nanoid } from "nanoid";
import { ScheduleContext } from "../../Contexts/ScheduleContext";

interface scheduleDayType {
  dayID: number;
  Classname: string;
  Classroom: string;
  Type: string;
}

const getShortCut = (str: string) => {
  const words = str.split(" ");
  if (words.length == 1) return str;

  const firstLetters = words.map((word) => {
    if (!isNaN(parseFloat(word))) return word;
    return word[0];
  });
  return firstLetters.join("");
};

function ScheduleElement({
  scheduleDay,
  modules,
}: {
  scheduleDay: scheduleDayType;
  modules: string[];
}) {
  const { dispatch } = useContext(ScheduleContext);
  const typeList: string[] = ("" + localStorage.getItem("Types"))
    .split("$")
    .filter(Boolean);
  const ClassroomList: string[] = ("" + localStorage.getItem("ClassRooms"))
    .split("$")
    .filter(Boolean);

  const Classroomoptions = ClassroomList.map((element) => {
    if (getShortCut(element) !== scheduleDay.Classroom)
      return (
        <option key={nanoid()} value={element}>
          {getShortCut(element)}
        </option>
      );
  });

  const Modluesoptions = modules.map((element) => {
    if (element !== scheduleDay.Classname)
      return (
        <option key={nanoid()} value={element}>
          {getShortCut(element)}
        </option>
      );
  });

  const Typeoptions = typeList.map((element) => {
    if (element !== scheduleDay.Type)
      return (
        <option key={nanoid()} value={element}>
          {element}
        </option>
      );
  });

  return (
    <div className="EditSchedule--class">
      <p className="class--type">
        <select
          className={
            scheduleDay.Classname == " "
              ? `dehighlighted select--class`
              : "select--class"
          }
          onChange={(e) => {
            dispatch({
              type: "PATCHSCHEDULE",
              payload: {
                dayID: scheduleDay.dayID,
                targeted: "Classname",
                value: e.target.value,
              },
            });
          }}
        >
          <>
            <option key={nanoid()} value={scheduleDay.Classname}>
              {getShortCut(scheduleDay.Classname)}
            </option>
            {Modluesoptions}
          </>
        </select>
      </p>
      <p>
        <select
          className={
            scheduleDay.Classname == " "
              ? `hidden select--class`
              : "select--class"
          }
          onChange={(e) => {
            dispatch({
              type: "PATCHSCHEDULE",
              payload: {
                dayID: scheduleDay.dayID,
                targeted: "Type",
                value: e.target.value,
              },
            });
          }}
        >
          <>
            <option key={nanoid()} value={scheduleDay.Type}>
              {scheduleDay.Type}
            </option>
            {Typeoptions}
            {scheduleDay.Type !== " " && (
              <option key={nanoid()} value={" "}>
                {" "}
              </option>
            )}
          </>
        </select>
      </p>
      <p className="class--type">
        <select
          className={
            scheduleDay.Classname == " "
              ? `hidden select--class`
              : "select--class"
          }
          onChange={(e) => {
            dispatch({
              type: "PATCHSCHEDULE",
              payload: {
                dayID: scheduleDay.dayID,
                targeted: "Classroom",
                value: e.target.value,
              },
            });
          }}
        >
          <>
            <option key={nanoid()} value={scheduleDay.Classroom}>
              {getShortCut(scheduleDay.Classroom)}
            </option>
            {Classroomoptions}
            {scheduleDay.Classroom !== " " && (
              <option key={nanoid()} value={" "}>
                {" "}
              </option>
            )}
          </>
        </select>
      </p>
    </div>
  );
}

export default ScheduleElement;
