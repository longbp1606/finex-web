import { Card, Table, Typography } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 3fr;
  gap: 16px;
`;

export const Section = styled(Card) <{ negative?: boolean }>`
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  background: #f9f9fc;
  width: 100%; 
  align-self: flex-start; 
  
  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
`;


export const VerticalSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledSection = styled.div`
    background: #f9f9fc;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: 16px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const DetailButton = styled.span`
    color: #1890ff;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        text-decoration: underline;
        color: #0056b3;
    }
`;

export const StyledTable = styled(Table)`
    .ant-table-thead > tr > th {
        background: #ecf4e9 !important; 
        font-weight: bold;
        text-align: center;
    }
`;

export const CategoryItem = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledText = styled(Typography.Text)`
  font-size: 14px;
  line-height: 1.2; /* Giảm chiều cao dòng */
  margin-bottom: -2px; /* Đẩy text lên gần progress */
`;