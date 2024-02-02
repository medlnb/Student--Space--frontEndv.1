import { useContext, useEffect, useState } from "react";
import { Server } from "../../Data/API";
import "./Members.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import { DarkModeContext } from "../../Contexts/Theme";
import Students from "../Students/Students";
import { AuthContext } from "../../Contexts/UserContext";
import { notify } from "../../Pages/HomePage/HomePage";

interface RequestType {
  _id: string;
  email: string;
  username: string;
}
function Members() {
  const { user } = useContext(AuthContext);
  const { DarkMode } = useContext(DarkModeContext);

  const [loadingAccept, setLoadingAccept] = useState<string | null>(null);
  const [loadingDecline, setLoadingDecline] = useState<string | null>(null);

  const [Requests, setRequests] = useState<RequestType[]>([
    {
      _id: "Default_Value",
      email: "string",
      username: "string",
    },
  ]);

  useEffect(() => {
    fetch(`${Server}/api/request/${user.specIndex}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error while fetching");
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandleAccepte = async (_id: string) => {
    if (!loadingAccept) return;
    setLoadingAccept(_id);
    const response = await fetch(`${Server}/api/request/${_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setLoadingAccept(null);
    const json = await response.json();
    if (response.ok) {
      setRequests((prev) => prev.filter((request) => request._id !== _id));
      notify("success", json.msg);
      return;
    } else {
      notify("error", json.err);
    }
  };

  const HandleDecline = async (_id: string) => {
    setLoadingDecline(_id);
    const response = await fetch(`${Server}/api/request/reject/${_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setLoadingDecline(null);
    const json = await response.json();
    if (response.ok) {
      setRequests((prev) => prev.filter((request) => request._id !== _id));
      notify("success", json.msg);
      return;
    } else {
      notify("error", json.err);
    }
  };

  return (
    <>
      <div className="editclass--container">
        <div className="taskedit--create">
          <div className="taskedit--title">
            <h3>Manage Requests</h3>
          </div>
          <div className="members--body">
            {Requests.length === 0 && "No New Requests"}
            {Requests.length === 1 && Requests[0]._id === "Default_Value" ? (
              <div className="loader">
                <PropagateLoader
                  color={`${DarkMode ? "white" : "black"}`}
                  loading={true}
                  size={20}
                />
              </div>
            ) : (
              Requests.map((request, index) => (
                <div
                  key={index}
                  className={`members--request ${
                    index !== 0 && "istop--members--request"
                  }`}
                >
                  <div className="members--request--info">
                    <h4>{request.username}</h4>
                    <p>{request.email}</p>
                  </div>
                  <div className="members--request--buttons">
                    <button
                      onClick={() => HandleAccepte(request._id)}
                      className={
                        loadingAccept === request._id
                          ? "request--loading"
                          : "members--request--button"
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => HandleDecline(request._id)}
                      className={
                        loadingDecline === request._id
                          ? "request--loading"
                          : "members--request--button"
                      }
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Students />
    </>
  );
}

export default Members;
