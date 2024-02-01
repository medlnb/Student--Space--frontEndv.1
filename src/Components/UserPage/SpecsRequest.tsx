import { useContext, useEffect, useState } from "react";
import "./UserPage.css";
import Select from "react-select";
import { Server } from "../../Data/API";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../Contexts/UserContext";
import { notify } from "../../Pages/HomePage/HomePage";
import { DarkModeContext } from "../../Contexts/Theme";

function SpecsRequest() {
  const { DarkMode } = useContext(DarkModeContext);
  const [Options, setOptions] = useState([]);
  const { user } = useContext(AuthContext);
  const [Inputs, setInputs] = useState({
    name: "",
    Year: "",
    isloading: false,
  });

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await fetch(`${Server}/api/user/specs`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      const userSpecsSet: Set<string> = new Set(
        user.speciality.map(
          (Userspec: any) => `${Userspec.name} ~ ${Userspec.Year}`
        )
      );

      const options = json
        .filter(
          (spec: { spec: String; Year: string }) =>
            !userSpecsSet.has(`${spec.spec} ~ ${spec.Year}`)
        )
        .map((spec: { spec: String; Year: string }) => ({
          value: `${spec.spec} ~ ${spec.Year}`,
          label: `${spec.spec} ~ ${spec.Year}`,
        }));

      setOptions(options);
    };
    fetchOptions();
  }, []);

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setInputs((prev) => ({ ...prev, isloading: true }));

    const response = await fetch(`${Server}/api/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        Speciality: Inputs.name,
        Year: Inputs.Year,
      }),
    });

    const json = await response.json();
    if (!response.ok) notify("error", json.err);
    else notify("success", json.msg);

    setInputs((prev) => ({ ...prev, isloading: false }));
  };

  return (
    <div className="taskedit--create">
      <div className="taskedit--title">
        <h3>Speciality join request</h3>
      </div>
      <form className="taskedit--body editclass--body" onSubmit={HandleSubmit}>
        <Select
          defaultValue={{ value: "Speciality", label: "Speciality" }}
          options={Options}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              background: `${DarkMode ? "#19161f" : "#eaf1f7"}`,
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "white",
              neutral0: `${DarkMode ? "#25212e" : "#f4f5f9"}`,
            },
          })}
          onChange={(value) => {
            if (value) {
              setInputs((prev) => ({
                ...prev,
                name: value.value.split(" ~ ")[0],
                Year: value.value.split(" ~ ")[1],
              }));
            }
          }}
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
              Inputs.isloading
                ? "taskedit--body--submit isSubmitting"
                : "taskedit--body--submit"
            }
          >
            Send Request
            <ClipLoader
              color="green"
              loading={Inputs.isloading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecsRequest;
