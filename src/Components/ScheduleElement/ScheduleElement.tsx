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

function ScheduleElement ({ scheduleDay }: { scheduleDay: scheduleDayType }) {
  const { dispatch } = useContext(ScheduleContext);
  const typeList = ["Lecture", "TP", "TD", "EL"," "];
  const Modules = [
    "Image Numérique",
    "Statistics for Data Science",
    "Programming for Data Science",
    "Data exploration and visualization",
    "Mathematics for Machine Learning 1",
    "English",
    " "
  ];
  const ClassroomList = ["Classroom 24", "Classroom 22", "Labo 7"," "];

  const Classroomoptions = ClassroomList.map((element) => (
    <option key={nanoid()} value={element}>
      {getShortCut(element)}
    </option>
  ));

  const Modluesoptions = Modules.map((element) => {
    if (element !== scheduleDay.Classname)
      return (
        <option key={nanoid()} value={element}>
          {getShortCut(element)}
        </option>
      );
  });

  const Typeoptions = typeList.map((element) => (
    <option key={nanoid()} value={element}>
      {element}
    </option>
  ));

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
          </>
        </select>
      </p>
    </div>
  );
}

export default ScheduleElement;
