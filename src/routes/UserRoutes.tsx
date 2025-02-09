import config from "@/config";
import UserLayout from "@/layouts/UserLayout"
import Transaction from "@/pages/User/Transaction";
import Category from "@/pages/User/Category";
import Dashboard from "@/pages/User/Dashboard";
import Alert from "@/pages/User/Alert";
import Report from "@/pages/User/Report";

const UserRouter = () => {
    return <UserLayout />
};

const userRoutes = {
    children: [
        { path: config.routes.user.dashboard, element: <Dashboard /> },
        { path: config.routes.user.transaction, element: <Transaction /> },
        { path: config.routes.user.category, element: <Category /> },
        { path: config.routes.user.report, element: <Report /> },
        { path: config.routes.user.alert, element: <Alert /> },
    ]
};

const UserRoutes = {
    path: '/user',
    element: <UserRouter />,
    children: [userRoutes],
};

export default UserRoutes;