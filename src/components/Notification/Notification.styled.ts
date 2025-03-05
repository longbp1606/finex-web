import styled from "styled-components";
import { Modal } from "antd";
import { Button } from "antd";

export const StyledNotificationButton = styled(Button)`
    width: 40px; 
    height: 35px;
    font-size: 24px; 
    box-shadow: none !important; 
    border: none; 
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

`;

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 16px;
  }

  .ant-modal-header {
    border-bottom: none;
    padding-bottom: 0;
  }

  .ant-modal-title {
    font-size: 16px;
    font-weight: 600;
  }

  .ant-modal-body {
    padding-top: 10px;
  }
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .icon {
    font-size: 18px;
    margin-right: 10px;
  }

  .content {
    flex: 1;

    h4 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
    }

    p {
      margin: 2px 0 0;
      font-size: 12px;
      color: #666;
    }
  }

  .time {
    font-size: 12px;
    color: #aaa;
  }
`;
