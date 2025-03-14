import { theme } from "@/themes";
import { Button, Card, Col, List } from "antd";
import styled from "styled-components";

const { Meta } = Card;

export const IntroductionSection = styled.section`
    margin-top: 24px;

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

    & h1.ant-typography {
        color: white;
        font-size: 3.5rem;
        margin-bottom: 0;
    }

    & .ant-typography.stats-description {
        color: white;
        font-size: 1.25rem;
        font-weight: 300;
    }
`;

export const SupportSection = styled.section`
    background: #f7f7f7;
    margin-top: 64px;
`;

export const FeatureSection = styled.section`
    margin-top: 24px;
`;

export const FeatureCardMeta = styled(Meta)`
    & .ant-card-meta-title {
        font-size: 1.5rem;
        font-weight: 500;
    }

    & .ant-card-meta-description {
        font-size: 1rem;
        font-weight: 400;
    }
`;

export const FeedbackSection = styled.section`
    margin-top: 64px;

    & h1.ant-typography {
        font-size: 2.5rem;
        font-weight: 500;
        color: ${theme.color.secondary};
        margin-bottom: 0;
    }

    & h4.ant-typography {
        font-size: 1.25rem;
        font-weight: 400;
        color: ${theme.color.quaternary};
    }

`;

export const ContactSection = styled.section`
    margin-top: 64px;
`;

export const FooterSection = styled.footer`
    padding: 24px 0;
    text-align: center;
    margin-top: 64px;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 16px;
    background: linear-gradient(133deg, rgba(136,236,188,1) 0%, rgba(33,87,89,1) 100%);
    padding: 8px;
    border-radius: 20px;
`;