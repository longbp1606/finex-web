import styled from 'styled-components';
import { Card, Button, Table } from 'antd';

export const AccountContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

export const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const AccountCard = styled(Card)`
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-head {
    background-color: #f8f9fa;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const AccountSummaryCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  
  .ant-card-head {
    background-color: #f8f9fa;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  
  &.primary {
    border-top: 4px solid #18453E;
  }
  
  &.secondary {
    border-top: 4px solid #4caf50;
  }
  
  &.warning {
    border-top: 4px solid #ff9800;
  }
`;

export const AccountDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  .label {
    color: #6c757d;
  }
  
  .value {
    font-weight: 500;
  }
`;

export const AccountActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const ActionButton = styled(Button)`
  border-radius: 6px;
`;

export const StyledTable = styled(Table)`
  .ant-table {
    border-radius: 10px;
    overflow: hidden;
  }
  
  .ant-table-thead > tr > th {
    background-color: #f8f9fa;
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  
  p {
    color: #6c757d;
    margin-bottom: 20px;
  }
`;