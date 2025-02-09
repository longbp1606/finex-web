import { theme } from "@/themes";
import { Button, Col, List } from "antd";
import styled from "styled-components";

export const IntroductionSection = styled.section`
    margin-top: 48px;

    & .ant-typography.intro-title {
        font-size: 5rem;
        font-weight: 500;
        margin: 48px 0 16px 0; 

        & mark {
            font-size: 5rem;
            font-weight: 500;    
            color: ${theme.color.primary};
            background-color: ${theme.color.secondary}
        }
    }

    & .ant-typography.description {
        font-size: 1.25rem;
        font-weight: 400;
        color: ${theme.color.textSecondary}
    }
`;

export const Navbar = styled(List)`
    & .ant-list-items {
        display: flex;
        align-items: center;
        justify-content: center;

        column-gap: 40px;
    }
`;

export const CustomButton = styled(Button)`
    border-bottom: 2px solid ${theme.color.primary};
    border-radius: 0;
`;

export const CardContainer = styled(Col)`
    background: linear-gradient(133deg, rgba(136,236,188,1) 0%, rgba(33,87,89,1) 100%);
    border-radius: 12px;
`;

export const SupportSection = styled.section`
    background: #f7f7f7;
    margin-top: 24px;
`;

export const FeatureSection = styled.section`
    margin-top: 24px;
`;