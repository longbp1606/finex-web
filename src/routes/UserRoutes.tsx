import config from "@/config";
import UserLayout from "@/layouts/UserLayout"
import Analysis from "@/pages/User/Analysis";
import Board from "@/pages/User/Board";
import Category from "@/pages/User/Category";
import Dashboard from "@/pages/User/Dashboard";
import Record from "@/pages/User/Record";

const UserRouter = () => {
    return <UserLayout />
};

const userRoutes = {
    children: [
        { path: config.routes.user.dashboard, element: <Dashboard /> },
        { path: config.routes.user.analysis, element: <Analysis /> },
        { path: config.routes.user.board, element: <Board /> },
        { path: config.routes.user.category, element: <Category /> },
        { path: config.routes.user.record, element: <Record /> },
    ]
};

const UserRoutes = {
    path: '/user',
    element: <UserRouter />,
    children: [userRoutes],
};

export default UserRoutes;