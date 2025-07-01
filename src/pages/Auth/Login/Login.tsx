import * as Styled from './Login.styled';
import AuthForm from "@/components/AuthForm/AuthForm"
import { loginFields } from "@/components/AuthForm/AuthForm.fields"
import config from '@/config';
import { useDocumentTitle } from '@/hooks';
import { login, LoginSchemeType } from '@/services/authAPI';
import cookieUtils from '@/services/cookieUtils';
import { message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    useDocumentTitle('Login | Finex');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            console.log(values);

            const loginInfo: LoginSchemeType = {
                scheme: 'basic',
                code: btoa(`${values.email}:${values.password}`),
            }

            const response = await login(loginInfo);

            if (!response.data) throw response.data;
            else {
                await messageApi.success(response.data.message);
                cookieUtils.setItem(config.cookies.token, response.data.data.accessToken);
                navigate("/");
            }
        } catch (error: any) {
            if (error.response) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error(error.code === 404 ? "This account haven't created" : error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

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

    return (
        <>
            {contextHolder}
            <AuthForm
                formTitle="Welcome back"
                buttonTitle="Login"
                fields={loginFields}
                description={description}
                redirect={redirect}
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    )
}

export default Login