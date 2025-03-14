import { Typography, Form, Button, Carousel, Image, Row } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '@/themes';

const { Title, Text } = Typography;

export const AuthForm = styled.div`
    display: flex;
    position: fixed;
    inset: 0;
    overflow-y: auto;
    background-color: ${theme.color.white};
`;

export const FormRow = styled(Row)`
    margin: auto;
    position: relative;
    width: 1066px;
    height: 700px;
    padding: 24px;
    border-radius: 30px;
    background: ${theme.color.white};
    box-shadow: 0 4px 24px 0 ${theme.color.shadowForm};

    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: auto;
        margin: auto;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
        border-radius: unset;
        box-shadow: unset;
    }

    ${({ theme }) => theme.breakpoints.down('xs')} {
        padding: 12px;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 370px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const FormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    row-gap: 44px;
`;

export const FormTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 24px;
        color: ${theme.color.primary};
        font-size: 2.4rem;
        font-weight: 700;
        text-align: center;
    }
`;

export const FormItem = styled(Form.Item)`
    &.ant-form-item {
        margin-bottom: 0;
    }

    &.ant-form-item:last-child {
        ${({ theme }) => theme.breakpoints.down('xs')} {
            margin-top: 28px;
        }
    }

    & .ant-form-item-row {
        position: relative;

        &:has(.ant-form-item-explain-error:not(:empty)) .ant-form-item-label label {
            color: ${theme.color.error};
        }

        &:has(input:-webkit-autofill),
        &:has(input:-webkit-autofill:hover),
        &:has(input:-webkit-autofill:focus),
        &:has(input:not(:placeholder-shown)),
        &:has(input:focus) {
            & .ant-form-item-label {
                top: -2px;
                left: 10px;
                padding: 0 10px;
                background-color: ${theme.color.white};
            }

            & label {
                color: ${theme.color.primary};
            }
        }
    }

    & .ant-form-item-label {
        position: absolute;
        z-index: 10;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        padding: 0;
        user-select: none;
        pointer-events: none;
        transition: ${theme.transition.primary};

        & label {
            color: ${theme.color.textSecondary};
            font-size: 1.2rem;
            font-weight: 400;

            &::after {
                display: none;
            }
        }
    }

    & .ant-form-item-control {
        position: relative;

        & .ant-form-item-control-input + div {
            position: absolute;
            top: 100%;
            left: 0;
        }
    }

    & .ant-input,
    & .ant-input-number-input,
    & .ant-input-password {
        padding: 12px 20px;
        font-size: 1.2rem;
        border-radius: 6px;
        border-color: ${theme.color.border};

        &:hover,
        &:focus {
            border-color: ${theme.color.primary};
        }
    }

    & .ant-form-item-explain-error {
        margin-top: 2px;
        color: ${theme.color.error};
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.6;
    }
`;

export const FormIcon = css`
    & svg {
        font-size: 1.5rem;
        transition: ${theme.transition.primary};
    }

    &:hover svg {
        color: ${theme.color.primary};
    }
`;

export const EyeOutlinedIcon = styled(EyeOutlined)`
    ${FormIcon}
`;

export const EyeInvisibleOutlinedIcon = styled(EyeInvisibleOutlined)`
    ${FormIcon}
`;

export const FormButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    border-radius: 6px;

    & span {
        color: ${theme.color.white};
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 0.18px;
    }

    & svg {
        font-size: 1.5rem;
    }

    &:disabled {
        background-color: ${theme.color.primary};
        opacity: 0.9;
    }
`;

export const FormGoogleButton = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;

    column-gap: 6px;
    margin-top: 24px;
    height: 40px;
    border: 1px solid ${theme.color.border};
    border-radius: 6px;
    transition: ${theme.transition.primary};

    & span {
        color: ${theme.color.textSecondary};
        font-size: 1.2rem;
        transition: ${theme.transition.primary};
    }

    & svg {
        font-size: 1.6rem;
    }

    &:hover {
        border-color: ${theme.color.primary};

        & span {
            color: ${theme.color.primary};
        }
    }
`;

export const FormRedirect = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;

    column-gap: 8px;
    margin-top: 36px;
    color: ${theme.color.textPrimary};
    font-size: 1.2rem;
`;

export const FormForgotPassword = styled(Link)`
    display: block;
    margin: 12px auto;
    font-size: 1.7rem;
    color: ${theme.color.textSecondary};

    &:hover {
        color: ${theme.color.textPrimary};
    }
`;

export const FormCarousel = styled(Carousel)`
    width: 100%;
    height: 652px;
    border-radius: 6px;
    overflow: hidden;
    user-select: none;
`;

export const FormImageWrapper = styled.div`
    position: relative;
`;

export const FormImageOverlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    height: 100%;
    background: ${theme.color.overlayImage};
`;

export const FormImage = styled(Image)`
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
`;