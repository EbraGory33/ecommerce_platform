import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { AuthInfo } = useSelector((state) => state.auth);

  return AuthInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
