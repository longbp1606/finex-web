import AuthForm from "@/components/AuthForm/AuthForm";
import { registerFields } from "@/components/AuthForm/AuthForm.fields";
import config from "@/config";
import { useDocumentTitle } from "@/hooks";

const Register = () => {
    useDocumentTitle('Register | Finex');
    
    const redirect = {
        description: 'You have account?',
        title: 'Login now',
        url: config.routes.public.login,
    };

    return (
        <>
            <AuthForm
                formTitle="Register"
                buttonTitle="Register"
                fields={registerFields}
                redirect={redirect}
                reverse
            />
        </>
    )
}

export default Register;