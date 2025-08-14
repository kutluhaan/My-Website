import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("jwtToken"); // or sessionStorage
  if (!token) {
    // If no token, redirect to home
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;