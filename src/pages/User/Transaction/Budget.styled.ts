import styled from "styled-components";
import { Card as AntCard, Input, Select } from "antd";
import { theme } from "@/themes";
const { Search } = Input;

export const CustomSearch = styled(Search)`
  .ant-input-search-button {
    background-color: ${theme.color.primary} !important;
    border-color: ${theme.color.primary} !important;
  }

  .ant-input-search-button .anticon {
    color: white !important;
  }
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

//Add
export const AddCategoryCard = styled(AntCard)`
  width: 100%;
  height: auto;
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

// Card
export const Card = styled(AntCard)`
  position: relative;
  background: white;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

export const CreateDate = styled.span`
  background-color: ${theme.color.white};
  padding: 5px 10px;
    border-radius: 20px;
    color: ${theme.color.black};
`;

export const CardTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 23px;
   color: ${theme.color.black};
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
`;

export const MetaTag = styled.span`
  background: rgba(0, 0, 0, 0.05);
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 16px;
  font-weight: bold;
`;

export const DetailButton = styled.button`
  background: ${theme.color.black};
  color: ${theme.color.secondary};
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${theme.color.white};
    color: ${theme.color.primary};
    border: 1px solid ${theme.color.primary};
  }
`;


// Transaction List

export const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  margin-top: 20px;
`;

export const TransactionHeader_Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;