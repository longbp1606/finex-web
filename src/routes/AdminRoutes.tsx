import AdminLayout from "@/layouts/AdminLayout"

const AdminRouter = () => {
    return <AdminLayout />
};

const adminRoutes = {
    children: [
        {}
    ]
};

const AdminRoutes = {
    path: '/admin',
    element: <AdminRouter />,
    children: [adminRoutes],
};

export default AdminRoutes;