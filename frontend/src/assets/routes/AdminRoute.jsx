import {Navigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function AdminRoute({children}) {
  const {isAuthenticated, user} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.rol !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;
