import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { useScrollToTop } from "@/hooks";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const RoutesComponent = () => {
    useScrollToTop();
    
    return useRoutes([
        MainRoutes,
        UserRoutes,
        AdminRoutes, 
    ]);
}

export default RoutesComponent;