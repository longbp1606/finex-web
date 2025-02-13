import styled from "styled-components";
import { Modal, Button } from "antd";


export const CustomModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    padding: 20px 24px 24px;
    text-align: center;
  }
  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const DeleteButton = styled(Button)`
  width: 100%;
  background: #e63946 !important;
  color: white !important;
  border: none;
  height: 45px;
  font-size: 14px;
  border-radius: 0;

  &:hover {
    background: #d62839 !important;
  }
`;

export const CancelButton = styled(Button)`
  width: 100%;
  background: white !important;
  color: #6c757d !important;
  border: 1px solid #ccc;
  height: 45px;
  font-size: 14px;
  border-radius: 0;

  &:hover {
    border-color: #bbb;
    color: #333 !important;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 20px 20px 20px; 
  position: relative;
`;

export const WarningIcon = styled.div`
  position: absolute;
  top: 15px; 
  left: 50%;
  transform: translateX(-50%);
  background: #fde2e2;
  padding: 6px 16px;
  border-radius: 35%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 30px;
  color: #e63946;
`;

export const ModalText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
