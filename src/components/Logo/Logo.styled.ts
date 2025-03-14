import { theme } from "@/themes";
import styled from "styled-components";

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Audiowide", sans-serif;

    & .ant-typography {
        font-size: 2.4rem;
        font-weight: 700;
    }

    & .ant-typography:first-child {
        color: ${theme.color.primary};
    }

    & .ant-typography:last-child {
        color: ${theme.color.secondary};
    }
`;