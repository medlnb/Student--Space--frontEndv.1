import { NavLink } from "react-router-dom";
import "./EditNavBar.css";

interface props {
  NavOptions: string[];
}

function EditNavBar({ NavOptions }: props) {

  const NavEelemnts = NavOptions.map((element, index) => (
    <NavLink
      className="EditNavBarEelemnt"
      key={index}
      to={element }
    >
      <h3>{element}</h3>
    </NavLink>
  ));
  return <div className="editnavbar--container">{NavEelemnts}</div>;
}

export default EditNavBar;
