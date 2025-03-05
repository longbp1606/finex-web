import AuthForm from "@/components/AuthForm/AuthForm";
import { registerFields } from "@/components/AuthForm/AuthForm.fields";
import config from "@/config";
import { useDocumentTitle } from "@/hooks";
import { register, RegisterSchemeType } from "@/services/authAPI";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    useDocumentTitle('Register | Finex');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            setIsSubmitting(true);
            console.log(values);

            const registerInfo: RegisterSchemeType = {
                email: values.email,
                password: values.password,
                fname: values.fname,
                lname: values.lname,
                phone: values.phone,
            }

            const response = await register(registerInfo);

            if (!response.data) throw response.data;
            else {
                await messageApi.success(response.data.message);
                navigate(config.routes.public.login);
            }
        } catch (error: any) {
            if (error.response) {
                messageApi.error(error.response.data.message);
            } else {
                messageApi.error(error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const redirect = {
        description: 'You have account?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    return (
        <>
            {contextHolder}
            <AuthForm
                formTitle="Register"
                buttonTitle="Register"
                fields={registerFields}
                redirect={redirect}
                reverse
                onFinish={onFinish}
                isSubmitting={isSubmitting}
            />
        </>
    )
}

export default Register;