import styled from "styled-components";
import { Card as AntCard } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { theme } from "@/themes";

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

export const SubHeader = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 12px;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); 
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr); 
  }
`;

export const Card = styled(AntCard)`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden; 

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: -5px;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 1px 4px 3px #ff4d4f; 
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

export const DeleteIcon = styled(CloseOutlined)`
  position: absolute;
  top: 7px;
  right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  font-size: 20px;
  color: #ff4d4f;
  cursor: pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`;

export const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 43px;
  height: 43px;
  border: solid 1px ${theme.color.primary};
  border-radius: 10px;
  background-color: #fff;
  color: ${theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.color.primary};
    color: #fff;
  }

  svg {
    font-size: 20px;
  }
`;

export const CardContent = styled.div`
  padding: 15px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

export const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

export const Target = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 5px 0;
  color: ${theme.color.primary};

  span {
    font-weight: 400;
  }
`;

export const BalanceContainer = styled.div`
  display: flex;
  margin-top: 5px;

  span {
   font-weight: bold;
  }
`;

export const EyeIcon = styled.div`
  cursor: pointer;
  margin-right: 8px;
  margin-left: 8px;
`;

export const BalanceAmount = styled.span`
  font-size: 14px;
  font-weight: 200;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SearchInput = styled(Input)`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;

  &:focus {
    border-color: ${theme.color.primary};
    box-shadow: 0 0 5px rgba(24, 144, 255, 0.3);
  }
`;

export const SortSelect = styled(Select)`
  width: 200px;
  height: 45px;
  font-size: 14px;

  .ant-select-selector {
    padding: 8px;
    border-radius: 5px;
    border: none;

    &:hover {
      border-color: ${theme.color.primary};
    }
  }
`;

//Add 
export const AddCategoryCard = styled(AntCard)`
  width: 100%;
  height: 378px;
  background: white;
  border: 2px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f5f5f5;
    border-color: ${theme.color.primary};
  }
`;

export const PlusIcon = styled.div`
  font-size: 40px;
  color: ${theme.color.primary};
`;


