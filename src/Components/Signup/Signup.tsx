import { ChangeEvent, useState } from "react";
import "../../Pages/WelcomePage/WelcomePage.css";
import ClipLoader from "react-spinners/ClipLoader";
import "../Login/Login.css";
import { Server } from "../../Data/API";

import { useNavigate } from "react-router-dom";
import { notify } from "../../Pages/HomePage/HomePage";

const isValidEmail = (inputEmail: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(inputEmail);
  return isValid;
};

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
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
    if (
      !inputs.firstName ||
      !inputs.lastName ||
      !inputs.email ||
      !inputs.password
    )
      return notify("error", "Please fill all the fields");

    if (!isValidEmail(inputs.email))
      return notify("error", "Please enter a valid email");

    setInputs((prev) => ({ ...prev, loading: true }));

    const response = await fetch(`${Server}/api/user/create`, {
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
    if (!response.ok) {
      const json = await response.json();
      notify("error", json.err);
      setInputs((prev) => ({ ...prev, loading: false }));
      return;
    }

    setInputs((prev) => ({ ...prev, loading: false }));
    notify("success", "Account created successfully");
    navigate("/welcome/login");
  };

  return (
    <form className="form_conatiner" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <h3>Please enter your details</h3>
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
      <p
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => navigate("/welcome/login")}
      >
        Go to Login
      </p>
    </form>
  );
}

export default Signup;
