import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { useScrollToTop } from "@/hooks";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";
import ErrorRoutes from "./ErrorRoutes";

const RoutesComponent = () => {
    useScrollToTop();
    
    return useRoutes([
        MainRoutes,
        UserRoutes,
        AdminRoutes,
        AuthRoutes,
        ErrorRoutes, 
    ]);
}

export default RoutesComponent;