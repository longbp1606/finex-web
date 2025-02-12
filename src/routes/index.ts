import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { useScrollToTop } from "@/hooks";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";

const RoutesComponent = () => {
    useScrollToTop();
    
    return useRoutes([
        MainRoutes,
        UserRoutes,
        AdminRoutes,
        AuthRoutes, 
    ]);
}

export default RoutesComponent;