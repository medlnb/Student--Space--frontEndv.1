import { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./PromotionRequest.css";
import { Server } from "../../Data/API";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../../Contexts/UserContext";
import { IoChevronBackSharp } from "react-icons/io5";

function PromotionRequest() {
  const { handleUserChange } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    speciality: "",
    password: "",
    Year: "",
    email: "",
    username: "",
    Module: "",
    loading: false,
    err: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputs((prev) => ({ ...prev, loading: true }));

    const response = await fetch(`${Server}/api/user/admin`, {
      method: "POST",
      body: JSON.stringify({
        speciality: inputs.speciality,
        Year: inputs.Year,
        email: inputs.email,
        password: inputs.password,
        username: inputs.username,
        Module: inputs.Module,
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setInputs((prev) => ({ ...prev, loading: false }));
      return;
    }
    handleUserChange({
      username: json.username,
      email: json.email,
      speciality: json.speciality,
      token: json.token,
      specIndex: 0,
    });
    setInputs((prev) => ({ ...prev, loading: false }));
    navigate("/My classes");
  };

  const options = [
    { value: "Master 1", label: "Master 1" },
    { value: "Master 2", label: "Master 2" },
    { value: "Licence 1", label: "Licence 1" },
    { value: "Licence 2", label: "Licence 2" },
    { value: "Licence 3", label: "Licence 3" },
  ];
  return (
      <form className="form_conatiner" onSubmit={handleSubmit}>
        <IoChevronBackSharp
          style={{ fontSize: "1.5rem", position: "relative", left: "-0.4rem" ,cursor:"pointer"}}
          onClick={() => navigate("/welcome")}
        />
        <h2>Promotion Request</h2>
        <h3>Please enter your details</h3>
        <input
          style={{ color: "white" }}
          className="task--title--input"
          placeholder="Prof username..."
          value={inputs.username}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          style={{ color: "white" }}
          placeholder="Email..."
          className="task--title--input"
          value={inputs.email}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          style={{ color: "white" }}
          className="task--title--input"
          placeholder="Password..."
          type="password"
          value={inputs.password}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <input
          style={{ color: "white" }}
          className="task--title--input"
          placeholder="Speciality..."
          value={inputs.speciality}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, speciality: e.target.value }))
          }
        />
        <input
          style={{ color: "white" }}
          className="task--title--input"
          placeholder="Module..."
          value={inputs.Module}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, Module: e.target.value }))
          }
        />
        <Select
          defaultValue={{ value: "Year", label: "Year" }}
          options={options}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              background: "#19161f",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "white",
              primary25: "#383246",
              neutral0: "#25212e",
            },
          })}
          onChange={(value) => {
            if (value) setInputs((prev) => ({ ...prev, Year: value?.value }));
          }}
        />
        <button
          type="submit"
          disabled={inputs.loading}
          className={inputs.loading ? "login isSubmitting" : "login"}
        >
          <p>Send Request</p>
          <ClipLoader
            color={"white"}
            loading={inputs.loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </button>
      </form>
  );
}

export default PromotionRequest;
