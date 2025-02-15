import styled from "styled-components";
import { Card, Table } from "antd";
import { theme } from "@/themes";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
export const Section = styled(Card) <{ negative?: boolean }>`
  flex: 1;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background: ${theme.color.quinary};
  padding: 16px;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .ant-card-head-title {
    color: #666;
  }

  .title {
    font-size: 16px;
    color: #666;
    font-weight: 500;
  }

  .balance-container {
    display: flex;
    align-items: center;
    gap: 8px; 
  }

  .balance-value {
    font-size: 28px;
    font-weight: bold;
    color: ${theme.color.primary};
  }

  .percentage-change {
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${(props) => (props.negative ? "#f44336" : "#4caf50")};
  }

  .comparison {
    font-size: 14px;
    color: #9096b2;
  }
`;

export const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

export const ChartSection = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  gap: 20px;

  > div:first-child {
    flex: 2;
  }

  > div:last-child {
    flex: 1;
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
`;

export const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 14px;
  color: #a0a0a0;
  font-weight: 400;

  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const Divider = styled.div`
  width: 2px;
  height: 55px;
  background-color: #d0d0d0;
  margin: 0 12px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Cards = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const IconWrapper = styled.div`
  font-size: 36px;
`;

export const Content = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 15px;
  color: #666;
  font-weight: 500;
`;

export const Amount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.color.primary};
`;

export const ProgressBar = styled.div`
  margin: 8px 0;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
`;

export const Percentage = styled.div`
  font-size: 12px;
  color: #9096b2;
`;

export const New = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #4caf50;
`;

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #ECF4E9 !important;
  }
`;

