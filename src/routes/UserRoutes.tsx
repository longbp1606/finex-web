import config from "@/config";
import UserLayout from "@/layouts/UserLayout"
import Transaction from "@/pages/User/Transaction";
import Category from "@/pages/User/Category";
import Dashboard from "@/pages/User/Dashboard";
import Alert from "@/pages/User/Alert";
import Report from "@/pages/User/Report";
import AddTransaction from "@/pages/User/Transaction/AddTransaction";

const UserRouter = () => {
    return <UserLayout />
};

const userBudgetRoute = {
    path: config.routes.user.budget,
    element: <Transaction />,
    children: [
        { path: ":id", element: <AddTransaction /> }, // Đường dẫn con
    ],
};

const userRoutes = {
    children: [
        userBudgetRoute,
        { path: config.routes.user.category, element: <Category /> },
        { path: config.routes.user.transaction, element: <Report /> },
        { path: config.routes.user.report, element: <Dashboard /> },
        { path: config.routes.user.alert, element: <Alert /> },
    ]
};

const UserRoutes = {
    path: '/user',
    element: <UserRouter />,
    children: [userRoutes],
};

export default UserRoutes;