import * as Styled from './Login.styled';
import AuthForm from "@/components/AuthForm/AuthForm"
import { loginFields } from "@/components/AuthForm/AuthForm.fields"
import config from '@/config';
import { useDocumentTitle } from '@/hooks';
import { Link } from 'react-router-dom';

const redirect = {
    description: `Don't have account?`,
    title: 'Register now',
    url: config.routes.public.register,
};

const description = (
    <Styled.LoginDesc>
        <Link to={config.routes.public.home}>
            Finex - 
        </Link>
        Financal management system for everyone 🚀
    </Styled.LoginDesc>
);

const Login = () => {
    useDocumentTitle('Login | Finex');
    
    return (
        <AuthForm
            formTitle="Welcome back"
            buttonTitle="Login"
            fields={loginFields}
            description={description}
            redirect={redirect}
        />
    )
}

export default Login