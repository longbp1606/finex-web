import config from '@/config';
import useAuth from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import { Navigate } from 'react-router-dom';

const MainRouter = () => {
    const { profile } = useAuth();

    if (profile?.role === 1) {
        return <Navigate to={config.routes.admin.dashboard} />;
    }
    if (profile?.role === 0) {
        return <Navigate to={config.routes.user.dashboard} />;
    }
    
    return <MainLayout />;
};

const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home />}
    ]
};

const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes],
};

export default MainRoutes;