import "./TelegramBots.css";
import { FaRegCopy } from "react-icons/fa";
import { notify } from "../../Pages/HomePage/HomePage";
import { FaSave } from "react-icons/fa";
import { useContext, useState } from "react";
import { Server } from "../../Data/API";
import { AuthContext } from "../../Contexts/UserContext";
import ClipLoader from "react-spinners/ClipLoader";

function TelegramBots() {
  const [Channel, setChannel] = useState({
    Channel: "",
    loading: false,
  });
  const { user } = useContext(AuthContext);
  const HanldeSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Channel.Channel) return notify("error", "Channel is empty");
    setChannel({ ...Channel, loading: true });
    const response = await fetch(
      `${Server}/api/user/channel/${user.specIndex}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ Channel: Channel.Channel }),
      }
    );
    const json = await response.json();
    setChannel({ ...Channel, loading: false });
    if (response.ok) notify("success", json.msg);
    else notify("error", json.err);
  };
  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Telegram Bots</h3>
      </div>
      <form className="taskedit--body">
        <p>
          1. Add{" "}
          <b>
            @StudentsSpacebot{" "}
            <FaRegCopy
              onClick={() => {
                navigator.clipboard.writeText("@StudentsSpacebot");
                notify("success", "Copied to clipboard");
              }}
            />
          </b>{" "}
          on ur Telegram group Chat
        </p>
        <p>
          2. Open Your Telegram group Chat in the browser, than copie the serial
          code after # in the url ( example:
          https://web.telegram.org/a/#-4097415151, the serial code : -4097415151
          ) then paste it in the input below
        </p>
        <p>3. Just save</p>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input
            className="task--title--input"
            placeholder="Channel..."
            value={Channel.Channel}
            onChange={(e) => {
              setChannel({ Channel: e.target.value, loading: false });
            }}
          />
          {Channel.loading ? (
            <ClipLoader color="yellow" size={15} />
          ) : (
            <FaSave onClick={HanldeSave} />
          )}
        </div>
      </form>
    </div>
  );
}

export default TelegramBots;
