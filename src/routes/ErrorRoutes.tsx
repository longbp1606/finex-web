import config from "@/config";
import NotFound from "@/pages/404";
import ForbiddenPage from "@/pages/Error/403";
import { Outlet } from "react-router-dom"

const ErrorRouter = () => {
    return <Outlet />;
}

const errorRoutes = {
    children: [
        { path: config.routes.error[403], element: <ForbiddenPage /> },
        { path: config.routes.error[404], element: <NotFound /> },
    ],
};

const ErrorRoutes = {
    path: '/error',
    element: <ErrorRouter />,
    children: [errorRoutes],
};

export default ErrorRoutes;