import "./TelegramBots.css";
import { FaRegCopy } from "react-icons/fa";
import { notify } from "../../Pages/HomePage/HomePage";
import { FaSave } from "react-icons/fa";
import { useState } from "react";

function TelegramBots() {
  const [serialCode, setSerialCode] = useState(
    localStorage.getItem("serialcode") ?? ""
  );
  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Telegram Bots</h3>
      </div>
      <div className="taskedit--body">
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
          code after # ( example: https://web.telegram.org/a/#-4097415151, the
          serial code : -4097415151 ) then paste it in the input below
        </p>
        <p>3. Just save</p>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <input
            className="task--title--input"
            placeholder="Serial code..."
            value={serialCode}
            onChange={(e) => {
              setSerialCode(e.target.value);
            }}
          />
          <FaSave
            onClick={() => {
              localStorage.setItem("serialcode", serialCode);
              notify("success", "Saved");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TelegramBots;
