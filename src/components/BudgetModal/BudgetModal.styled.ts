import { theme } from "@/themes";
import { Modal, Upload } from "antd";
import styled from "styled-components";

export const CustomModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-modal-content {
    border-radius: 12px;
    padding: 10px;
    width: 450px;
    margin: auto; 
  }

  .ant-modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
`;

export const ModalContainer = styled.div`
  //  padding: 16px;
   width: 400px;
`;

export const Section = styled.div`
  h4 {
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 12px;
  }
  p {
    color: gray;
    margin-top: -7px;
  }
`;

export const ThemeContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ThemeOption = styled.div<{ selected?: boolean }>`
    width: 120px;
    height: 80px;
    border-radius: 15px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${({ selected }) => (selected ? "2px solid #18453e" : "2px solid #ddd")};
    position: relative;
    cursor: pointer;
    overflow: hidden;
`;

export const ThemeImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const UploadContainer = styled(Upload)`
    width: 120px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ddd;
    border-radius: 15px !important;
    cursor: pointer;
`;

export const AccentColorContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: auto;
`;

export const AccentColorSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ColorCircle = styled.div<{ color: string; selected: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.selected ? "2px solid black" : "none")};
  cursor: pointer;
`;

export const SetDefaultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SetDefaultSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const ColSection = styled.div`
    display: flex;
    flex-direction: column;
`;
export const RowSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; 
    gap: 16px; 
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #ddd;
`;

export const CurrencyGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`
export const CurrencyButton = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.color.white};
  color: ${theme.color.primary};
  border: 1px solid ${theme.color.primary};
  padding: 10px;
  border-radius: 5px;
  font-weight: 600;
  font-size: 15px;

  &:hover {
  background-color: #7EC3B5;
  }
`