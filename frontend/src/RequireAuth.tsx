import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import Context from "./Context";

const RequireAuth = ({children}: any) => {
  const {
    linkSuccess,
    isItemAccess
  } = useContext(Context);

  return (linkSuccess === true && isItemAccess === true) ? children : <Navigate to="/" replace />;
}

export default RequireAuth;