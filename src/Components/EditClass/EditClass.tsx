import { useContext, useState } from "react";
import "./EditClass.css";
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from "../../Pages/HomePage/HomePage";
import { AuthContext } from "../../Contexts/UserContext";
import { Server } from "../../Data/API";
import { FaGoogleDrive } from "react-icons/fa";
import { ClassesContext } from "../../Contexts/Class";
import { DarkModeContext } from "../../Contexts/Theme";

function EditClass() {
  const { DarkMode } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  const { state } = useContext(ClassesContext);
  
  const chapters: string[] = ["Chapters"];
  state?.map((modulee) => {
    modulee.map((file) => {
      if (
        file.Module === user.speciality[user.specIndex].Module &&
        file.Chapter &&
        !chapters.includes(file.Chapter)
      )
        chapters.push(file.Chapter);
    });
  });

  const [isloading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    Chapter: chapters[0],
    Link: "",
    DescriptionClass: "",
    title: "",
  });
  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputs.Chapter == "" || inputs.Link == "" || inputs.title == "") {
      notify("error", "Chapter, Link & title must be filled");
      return;
    }
    setLoading(true);
    await fetch(`${Server}/api/file/create`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...inputs, specIndex: user.specIndex }),
    });
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="editclass--container">
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Add File</h3>
        </div>
        <form
          className="taskedit--body editclass--body"
          onSubmit={HandleSubmit}
        >
          <input
            className="task--title--input"
            placeholder="Title..."
            value={inputs.title}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <input
              className="task--title--input"
              placeholder="Chapter..."
              value={inputs.Chapter}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, Chapter: e.target.value }))
              }
            />
            <select
              className="task--title--input"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                width: "5rem",
              }}
              value={inputs.Chapter}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, Chapter: e.target.value }))
              }
            >
              {chapters.map((chapter) => (
                <option
                  key={chapter}
                  value={chapter}
                  style={{ background: "#939395" }}
                >
                  {chapter}
                </option>
              ))}
            </select>
          </div>
          <input
            className="task--title--input"
            placeholder="Link..."
            value={inputs.Link}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, Link: e.target.value }))
            }
          />
          <input
            className="task--title--input"
            placeholder="File's Description..."
            value={inputs.DescriptionClass}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                DescriptionClass: e.target.value,
              }))
            }
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button
              className={
                isloading
                  ? "taskedit--body--submit isSubmitting"
                  : "taskedit--body--submit"
              }
            >
              Add
              <ClipLoader
                color={`${DarkMode ? "white" : "black"}`}
                loading={isloading}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
            <a href="https://drive.google.com/drive" target="_blank">
              <FaGoogleDrive />
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClass;
