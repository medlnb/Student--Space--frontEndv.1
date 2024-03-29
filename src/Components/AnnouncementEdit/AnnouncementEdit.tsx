import { useContext, useState } from "react";
import "./AnnouncementEdit.css";
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from "../../Pages/HomePage/HomePage";
import { AuthContext } from "../../Contexts/UserContext";
import { BiTrash } from "react-icons/bi";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Server } from "../../Data/API";
import { AnnouncementsContext } from "../../Contexts/AnnouncementContext";

interface AnnouncementType {
  _id: string;
  Publisher: string;
  Content: string;
  Date: Date;
}

function AnnouncementEdit() {
  const { user } = useContext(AuthContext);
  const { state, dispatch } = useContext(AnnouncementsContext);

  const filtredState = state?.filter(
    (annou) => annou.Publisher === user.username
  );

  const [isloading, setLoading] = useState(false);
  const [isloadingDel, setIsloadingDel] = useState(-1);
  const [Content, setContent] = useState("");

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    if (Content === "") {
      notify("error", "Content must be filled");
      return;
    }
    setLoading(true);
    const response = await fetch(
      `${Server}/api/Announcement/create/${user.specIndex}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          Content,
        }),
      }
    );
    const json = await response.json();
    setLoading(false);
    dispatch({
      type: "ADDANNOUNCEMENTS",
      payload: json,
    });
  };

  const HandleDelete = async (id: string, index: number) => {
    setIsloadingDel(index);
    const response = await fetch(`${Server}/api/announcement/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    setIsloadingDel(-1);
    if (response.ok)
      dispatch({
        type: "REMOVEANNOUNCEMENT",
        payload: id,
      });
  };

  return (
    <div className="editclass--container">
      <div className="taskedit--create">
        <div className="taskedit--title">
          <h3>Add Anoucement</h3>
        </div>
        <form
          className="taskedit--body editclass--body"
          onSubmit={HandleSubmit}
        >
          <input
            placeholder="Content..."
            className="task--title--input"
            value={Content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className={
              isloading
                ? "taskedit--body--submit isSubmitting"
                : "taskedit--body--submit"
            }
          >
            Add
            <ClipLoader
              color="#9ec3db"
              loading={isloading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </form>
      </div>
      {!filtredState ? (
        <div style={{ position: "relative", height: "2rem" }}>
          <div className="loader">
            <PropagateLoader color="#9ec3db" size={20} />
          </div>
        </div>
      ) : (
        filtredState.length !== 0 && (
          <div className="taskedit--create">
            <div className="taskedit--title">
              <h3>Delete Anouccements</h3>
            </div>
            <div className="taskedit--body">
              {filtredState.map((element: AnnouncementType, index: number) => (
                <div
                  className="tasktodelete"
                  key={index}
                  onClick={() => HandleDelete(element._id, index)}
                >
                  <h4>{element.Content}</h4>
                  {isloadingDel === index ? (
                    <ClipLoader color="#9ec3db" size={15} />
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

export default AnnouncementEdit;
