import AdminLayout from "@/layouts/AdminLayout"
import config from "@/config";
import Dashboard from "@/pages/Admin/Dashboard";
import SystemCategory from "@/pages/Admin/SystemCategory";
import Account from "@/pages/Admin/Account";
import Subscription from "@/pages/Admin/Subscription";
import UserSubscription from "@/pages/Admin/UserSubscription";

const AdminRouter = () => {
    return <AdminLayout />
};

const adminRoutes = {
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.systemCategory, element: <SystemCategory /> },
        { path: config.routes.admin.account, element: <Account /> },
        { path: config.routes.admin.subscription, element: <Subscription /> },
        { path: config.routes.admin.userSubscription, element: <UserSubscription /> },
    ]
};

const AdminRoutes = {
    path: '/admin',
    element: <AdminRouter />,
    children: [adminRoutes],
};

export default AdminRoutes;