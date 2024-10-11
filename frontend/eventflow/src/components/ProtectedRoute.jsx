import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext"; 

const ProtectedRoute = ({ element, role }) => {
  const { userInfo } = useContext(LoginContext);

  if (!userInfo || !role.includes(userInfo.role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
