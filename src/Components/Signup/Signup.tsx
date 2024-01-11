import { ChangeEvent, useEffect, useState } from "react";
import "../../Pages/WelcomePage/WelcomePage.css";
import ClipLoader from "react-spinners/ClipLoader";
import "../Login/Login.css";
import { Server } from "../../Data/API";
import Select from "react-select";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const isValidEmail = (inputEmail: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(inputEmail);
  return isValid;
};

function Signup({ isTeacher }: { isTeacher: boolean }) {
  const [Options, setOptions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(`${Server}/api/user/specs`);
      const json = await response.json();
      const options = json.map((spec: any) => ({
        value: `${spec.spec} ~ ${spec.Year}`,
        label: `${spec.spec} ~ ${spec.Year}`,
      }));

      setOptions(options);
    };
    fetchOptions();
  }, []);
  const [inputs, setInputs] = useState({
    matricule: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loading: false,
    Speciality: { name: "", Year: "" },
    msg: { err: "", msg: "" },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(inputs.email))
      return setInputs((prev) => ({
        ...prev,
        msg: { ...prev.msg, err: "Please Entre Valid Email" },
      }));

    setInputs((prev) => ({ ...prev, loading: true }));

    if (!isTeacher) {
      const response = await fetch(`${Server}/api/request`, {
        method: "POST",
        body: JSON.stringify({
          matricule: inputs.matricule,
          mail: inputs.email,
          firstname: inputs.firstName,
          lastname: inputs.lastName,
          password: inputs.password,
          Speciality: inputs.Speciality,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const json = await response.json();
      setInputs((prev) => ({ ...prev, loading: false, msg: json }));
    } else {
      const response = await fetch(`${Server}/api/user/teacher`, {
        method: "POST",
        body: JSON.stringify({
          email: inputs.email,
          username: inputs.lastName + " " + inputs.firstName,
          password: inputs.password,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      const json = await response.json();
      setInputs((prev) => ({ ...prev, loading: false, msg: json }));
    }
  };

  return (
    <>
      <form className="form_conatiner" onSubmit={handleSubmit}>
        <IoChevronBackSharp
          style={{ fontSize: "1.5rem", position: "relative", left: "-0.4rem" ,cursor:"pointer"}}
          onClick={() => navigate("/welcome")}
        />
        <h2>Sign up</h2>
        <h3>Please enter your details</h3>
        {!isTeacher && (
          <input
            placeholder="Matricule..."
            className="task--title--input"
            value={inputs.matricule}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (/^\d+$/.test(e.target.value) || e.target.value === "")
                setInputs((prev) => ({ ...prev, matricule: e.target.value }));
            }}
          />
        )}
        <input
          placeholder="First Name..."
          className="task--title--input"
          value={inputs.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({ ...prev, firstName: e.target.value }));
          }}
        />
        <input
          placeholder="Last Name..."
          className="task--title--input"
          value={inputs.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({ ...prev, lastName: e.target.value }));
          }}
        />

        <input
          placeholder="Email..."
          className="task--title--input"
          value={inputs.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          placeholder="Password..."
          className="task--title--input"
          type="password"
          value={inputs.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        {!isTeacher && (
          <Select
            defaultValue={{ value: "Speciality", label: "Speciality" }}
            options={Options}
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
              if (value) {
                setInputs((prev) => ({
                  ...prev,
                  Speciality: {
                    name: value.value.split(" ~ ")[0],
                    Year: value.value.split(" ~ ")[1],
                  },
                }));
              }
            }}
          />
        )}
        <p
          style={inputs.msg.err ? { color: "#FF5733" } : { color: "white" }}
          className="error--msg"
        >
          {inputs.msg.err && inputs.msg.err}
          {inputs.msg.msg && `${inputs.msg.msg}`}
        </p>
        <button
          type="submit"
          disabled={inputs.loading}
          className={inputs.loading ? "login isSubmitting" : "login"}
        >
          <p>Sign up</p>
          <ClipLoader
            color={"white"}
            loading={inputs.loading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </button>
      </form>
    </>
  );
}

export default Signup;
