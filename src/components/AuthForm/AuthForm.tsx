import * as FormStyled from './AuthForm.styled';
import { FieldType } from './AuthForm.fields';
import Container from '../Container';
import { Col, Flex } from 'antd';
import images from './AuthForm.images';
import { Link } from 'react-router-dom';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { useRef } from 'react';

type RedirectType = {
    description: string;
    title: string;
    url: string;
};

type AuthFormProps = {
    className?: string;
    page?: string;
    formTitle: string;
    buttonTitle: string;
    fields: FieldType[];
    description?: JSX.Element;
    redirect: RedirectType;
    reverse?: boolean;
    onFinish?: (values: unknown) => void;
    onFinishFailed?: (values: unknown) => void;
    isSubmitting?: boolean;
};

const AuthForm = ({
    className,
    formTitle,
    buttonTitle,
    fields,
    description,
    redirect,
    reverse = false,
    onFinish,
    onFinishFailed,
    isSubmitting = false,
}: AuthFormProps) => {
    const fieldComponents = useRef<JSX.Element[]>([]);
    
    return (
        <>
            <Container>
                <FormStyled.AuthForm className={className}>
                    <FormStyled.FormRow
                        align="middle"
                        style={{
                            flexDirection: reverse ? 'row-reverse' : 'row',
                        }}
                    >
                        <Col lg={{ span: 12 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                            <FormStyled.FormContainer>
                                <FormStyled.FormTitle level={1}>{formTitle}</FormStyled.FormTitle>

                                {description}

                                <FormStyled.FormWrapper
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    layout="vertical"
                                    requiredMark={false}
                                    autoComplete="off"
                                >
                                    {fields.map((field) => {
                                        if (fieldComponents.current.length === 2) {
                                            fieldComponents.current = [];
                                        }

                                        const component = (
                                            <FormStyled.FormItem
                                                key={field.key}
                                                label={field.label}
                                                name={field.name}
                                                rules={field.rules}
                                                validateFirst
                                                style={{
                                                    width: field.halfWidth ? '50%' : '100%',
                                                }}
                                            >
                                                {field.children}
                                            </FormStyled.FormItem>
                                        );

                                        if (field.halfWidth) {
                                            fieldComponents.current.push(component);

                                            if (fieldComponents.current.length !== 2) return;
                                        }

                                        return fieldComponents.current.length === 2 ? (
                                            <Flex gap={12} key={field.key}>
                                                {fieldComponents.current.map((component) => component)}
                                            </Flex>
                                        ) : (component);
                                    })}

                                    <FormStyled.FormItem>
                                        <FormStyled.FormButton
                                            block
                                            type="primary"
                                            htmlType="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? <Loading3QuartersOutlined spin /> : buttonTitle}
                                        </FormStyled.FormButton>
                                    </FormStyled.FormItem>
                                </FormStyled.FormWrapper>

                                {/* <FormStyled.FormGoogleButton to={'/'}>
                                    <FcGoogle />
                                    <Text>Login with Google</Text>
                                </FormStyled.FormGoogleButton> */}

                                <FormStyled.FormRedirect>
                                    {redirect.description}

                                    <Link to={redirect.url}>
                                        {redirect.title}
                                    </Link>
                                </FormStyled.FormRedirect>
                            </FormStyled.FormContainer>
                        </Col>

                        <Col lg={{ span: 12 }} sm={{ span: 0 }} xs={{ span: 0 }}>
                            <FormStyled.FormCarousel autoplay>
                                {images.map((image) => (
                                    <FormStyled.FormImageWrapper key={image.id}>
                                        <FormStyled.FormImageOverlay />

                                        <FormStyled.FormImage
                                            width="100%"
                                            height={652}
                                            src={image.src}
                                            alt="Form Carousel"
                                            preview={false}
                                        />
                                    </FormStyled.FormImageWrapper>
                                ))}
                            </FormStyled.FormCarousel>
                        </Col>
                    </FormStyled.FormRow>
                </FormStyled.AuthForm>
            </Container>
        </>
    )
}

export default AuthForm