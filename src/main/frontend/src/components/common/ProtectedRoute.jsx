import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!userRole || !allowedRoles.includes(userRole)) {

            if (window.history.length > 2) {
                navigate(-1);
            } else {
                navigate("/login", { replace: true });
            }
        }
    }, [allowedRoles, userRole, navigate]);

    if (!userRole || !allowedRoles.includes(userRole)) {
        return null;
    }

    return children;
};

export default ProtectedRoute;
