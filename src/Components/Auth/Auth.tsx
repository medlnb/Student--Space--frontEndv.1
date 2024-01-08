import { Navigate } from "react-router-dom"

const Auth = ({ children }:any) => {
  if (false)
    return children

  return <Navigate to="/" />
}
export default Auth