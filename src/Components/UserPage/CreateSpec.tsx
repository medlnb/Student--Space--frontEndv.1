import { useContext, useState } from "react";
import "./UserPage.css";
import ClipLoader from "react-spinners/ClipLoader";
import { notify } from "../../Pages/HomePage/HomePage";
import { AuthContext } from "../../Contexts/UserContext";
import { Server } from "../../Data/API";

function CreateSpec() {
  const { user } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    speciality: "",
    Year: "",
    isloading: false,
  });

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.speciality === "" || inputs.Year === "")
      return notify("error", "Please fill all the fields");

    setInputs({ ...inputs, isloading: true });

    const response = await fetch(`${Server}/api/user/admin`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        speciality: inputs.speciality,
        Year: inputs.Year,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      setInputs({ ...inputs, isloading: false });
      notify("error", json.err);
      return;
    }

    setInputs({ speciality: "", Year: "", isloading: false });

    notify(
      "success",
      "Speciality added successfully"
    );
    location.reload();
  };

  return (
    <form className="taskedit--create" onSubmit={HandleSubmit}>
      <div className="taskedit--title">
        <h3>Create Promotion (For managers)</h3>
      </div>
      <div className="taskedit--body editclass--body">
        <input
          className="task--title--input"
          placeholder="Speciality name..."
          value={inputs.speciality}
          onChange={(e) => setInputs({ ...inputs, speciality: e.target.value })}
        />
        <input
          className="task--title--input"
          placeholder="Education's level (Master 1, ...)"
          value={inputs.Year}
          onChange={(e) => setInputs({ ...inputs, Year: e.target.value })}
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
              inputs.isloading
                ? "taskedit--body--submit isSubmitting"
                : "taskedit--body--submit"
            }
          >
            Add
            <ClipLoader
              color="green"
              loading={inputs.isloading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateSpec;
