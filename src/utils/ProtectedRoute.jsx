import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
//     const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("isAuth"))
//   );
 const { user } = useAuth();
    debugger
    // const navigate = useNavigate();
    // const useAuth = () => {
    //     const user = JSON.parse(localStorage.getItem("isAuth")) // Example: check for a token
    //     return user; // Converts to boolean
    // }
    // const isUserAuthenticated = useAuth();

    if (!!user) {
        return children;
    }
    return <Navigate to="/login" replace />;
}
export default ProtectedRoute
