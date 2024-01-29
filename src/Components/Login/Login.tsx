import { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css";
import { AuthContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Server } from "../../Data/API";
import { notify } from "../../Pages/HomePage/HomePage";

function Login() {
  const { dispatchUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.mail || !inputs.password)
      return notify("error", "Please fill all the fields");
    setInputs((prev) => ({ ...prev, loading: true }));

    const response = await fetch(`${Server}/api/user/login`, {
      method: "POST",
      body: JSON.stringify({ email: inputs.mail, password: inputs.password }),
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      notify("error", json.err);
      setInputs((prev) => ({ ...prev, loading: false }));
      return;
    }
    dispatchUser({
      type: "SETUSER",
      payload: {
        username: json.username,
        email: json.email,
        speciality: json.speciality,
        token: json.token,
        specIndex: 0,
      },
    });
    setInputs((prev) => ({ ...prev, loading: false }));
    navigate("/My classes");
  };

  return (
    <form className="form_conatiner" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <h3>Please enter your details</h3>
      <div className="inputs_container">
        <input
          placeholder="Email..."
          className="task--title--input"
          value={inputs.mail}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, mail: e.target.value }))
          }
        />
      </div>
      <div className="inputs_container">
        <input
          placeholder="Password..."
          className="task--title--input"
          type="password"
          value={inputs.password}
          onChange={(e) => {
            setInputs((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
      </div>
      <button
        type="submit"
        disabled={inputs.loading}
        className={inputs.loading ? "login isSubmitting" : "login"}
      >
        <p>Log in</p>
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
        onClick={() => navigate("/welcome")}
      >
        Go to Sign up
      </p>
    </form>
  );
}

export default Login;
