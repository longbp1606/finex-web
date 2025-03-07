import config from "@/config";
import UserLayout from "@/layouts/UserLayout"
import Transaction from "@/pages/User/Transaction";
import Category from "@/pages/User/Category";
// import Dashboard from "@/pages/User/Dashboard";
// import Alert from "@/pages/User/Alert";
// import AddTransaction from "@/pages/User/Transaction/AddTransaction";
import Chat from "@/pages/User/Chat";
import Analysis from "@/pages/User/Analysis/Analysis";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const UserRouter = () => {
    const { AccountID } = useAuth();
    return AccountID ? <UserLayout /> : <Navigate to={config.routes.public.login} />;
};

// const userBudgetRoute = {
//     path: config.routes.user.budget,
//     element: <Transaction />,
//     children: [
//         { path: ":id", element: <AddTransaction /> }, // Đường dẫn con
//     ],
// };

const userRoutes = {
    children: [
        // userBudgetRoute,
        { path: config.routes.user.budget, element: <Transaction />},
        { path: config.routes.user.category, element: <Category /> },
        { path: config.routes.user.analysis, element: <Analysis /> },
        // { path: config.routes.user.report, element: <Dashboard /> },
        // { path: config.routes.user.alert, element: <Alert /> },
        { path: config.routes.user.chat, element: <Chat />},
    ]
};

const UserRoutes = {
    path: '/user',
    element: <UserRouter />,
    children: [userRoutes],
};

export default UserRoutes;