import config from "@/config";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

const AuthRouter = () => {
    return <AuthLayout />
};

const authRoutes = {
    children: [
        { path: config.routes.public.login, element: <Login /> },
        { path: config.routes.public.register, element: <Register /> },
    ],
};

const AuthRoutes = {
    element: <AuthRouter />,
    children: [authRoutes],
};

export default AuthRoutes;