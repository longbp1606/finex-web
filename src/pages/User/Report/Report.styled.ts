import { theme } from "@/themes";
import { Card, Table, Typography } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr 3fr;
  gap: 16px;
`;

export const Section = styled(Card) <{ negative?: boolean }>`
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background: ${theme.color.quinary};
  width: 100%; 
  align-self: flex-start; 
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const Amount = styled.h1`
    font-size: 2rem; 
    color: ${theme.color.primary}; 
    margin: 0;
    font-weight: 500;
`;

export const Label = styled.p`
    font-size: 0.9rem; 
    color: #666; 
    margin: 0;
`;


export const VerticalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const DetailButton = styled.span`
    color: ${theme.color.primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        text-decoration: underline;
        color: ${theme.color.secondary};
    }
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #ECF4E9 !important;
  }
`;

export const CategoryItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledText = styled(Typography.Text)`
  font-size: 14px;
  line-height: 1.2; 
  margin-bottom: -2px;
`;