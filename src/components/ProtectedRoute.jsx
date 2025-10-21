import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, admin }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // user | admin

  if (!token || (admin && role !== "admin")) {
    return <Navigate to="/login" />;
  }

  return children;
}
