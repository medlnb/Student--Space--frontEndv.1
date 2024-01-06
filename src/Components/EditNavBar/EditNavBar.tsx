import { useNavigate } from 'react-router-dom'
import './EditNavBar.css'

interface props {
  PageSelected: string,
  NavOptions: string[],
  source: "Edit" | "Admin"
}

function EditNavBar({ PageSelected, NavOptions, source }: props) {
  const navigate = useNavigate()
  const NavEelemnts = NavOptions.map((element, index) => (
    <div
      className={PageSelected == element ? "EditNavBarEelemnt SelectedPage" : "EditNavBarEelemnt"}
      key={index}
      onClick={() => {
        if (element === "Classes" || element === "Schedule")
          return navigate(`/${source}`)
        navigate(`/${source}/${element}`)
      }}
    >
      <h3>{element}</h3>
    </div>
  ))
  return (
    <div className='editnavbar--container'>
      {NavEelemnts}
    </div>
  )
}

export default EditNavBar