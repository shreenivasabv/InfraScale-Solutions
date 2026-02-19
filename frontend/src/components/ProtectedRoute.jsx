import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token"); 
    
    if (!token) {
        // If not logged in, go to the member login by default
        return <Navigate to="/member-login" replace />;
    }
    return children;
};

export default ProtectedRoute;