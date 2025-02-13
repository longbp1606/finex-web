import React, { useState } from "react";
import { message } from "antd";
import { EditOutlined, EyeOutlined, EyeInvisibleOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { categories as initialCategories } from "./data";

import {
  Container,
  Header,
  SubHeader,
  Grid,
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  DeleteIcon,
  EditButton,
  Target,
  BalanceContainer,
  BalanceAmount,
  EyeIcon,
  SearchContainer,
  SearchInput,
  SortSelect,
  AddCategoryCard,
  PlusIcon,
} from "./Category.styled";
import ConfirmDeleteModal from "@/components/DeleteModal/ConfirmDeleteModal";
import CategoryModal from "@/components/CategoryModal/CategoryModal";

const Category: React.FC = () => {
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const [visibleBalances, setVisibleBalances] = useState<boolean[]>(Array(initialCategories.length).fill(false));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [addModalVisible, setAddModalVisible] = useState(false);


  // Hiển thị modal confirm
  const showDeleteConfirm = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalVisible(true);
  };

  // Xóa category
  const handleDeleteCategory = () => {
    if (selectedCategoryId) {
      setCategoriesList((prev) => prev.filter((category) => category.id !== selectedCategoryId));
      message.success("Category deleted successfully!");
    }
    setIsModalVisible(false);
    setSelectedCategoryId(null);
  };

  // Hủy bỏ xóa
  const handleCancelDelete = () => {
    setIsModalVisible(false);
    setSelectedCategoryId(null);
  };

  // Lọc categories theo search term
  let filteredCategories = categoriesList.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp categories
  switch (sortOption) {
    case "name-asc":
      filteredCategories.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      filteredCategories.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "target-desc":
      filteredCategories.sort((a, b) => b.target - a.target);
      break;
    case "target-asc":
      filteredCategories.sort((a, b) => a.target - b.target);
      break;
    case "balance-desc":
      filteredCategories.sort((a, b) => b.balance - a.balance);
      break;
    case "balance-asc":
      filteredCategories.sort((a, b) => a.balance - b.balance);
      break;
    default:
      break;
  }

  return (
    <Container>
      <Header>Category</Header>
      <SubHeader>
        Organizing and classifying expenses in a logical and efficient manner to ensure better financial management.
      </SubHeader>
      <SearchContainer>
        <SearchInput
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SortSelect
          placeholder="Sort categories"
          value={sortOption || undefined}
          onChange={(value) => setSortOption(value as string)}
          allowClear
          options={[
            { label: "Name (A - Z)", value: "name-asc" },
            { label: "Name (Z - A)", value: "name-desc" },
            { label: "Target (High - Low)", value: "target-desc" },
            { label: "Target (Low - High)", value: "target-asc" },
            { label: "Balance (High - Low)", value: "balance-desc" },
            { label: "Balance (Low - High)", value: "balance-asc" },
          ]}
        />
      </SearchContainer>
      <Grid>
        {/* Card đặc biệt luôn đứng đầu */}
        <AddCategoryCard onClick={() => setAddModalVisible(true)}>
          <PlusIcon>
            <PlusOutlined />
          </PlusIcon>
        </AddCategoryCard>

        {/* Các card hiển thị bình thường */}
        {filteredCategories.map((category, index) => (
          <Card key={category.id} hoverable>
            <DeleteIcon onClick={() => showDeleteConfirm(category.id)}>
              <DeleteOutlined />
            </DeleteIcon>
            <img src={category.image} alt={category.title} />
            <CardContent>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
              <Target>
                Target: <span>${category.target.toFixed(2)}</span>
              </Target>
              <BalanceContainer>
                <span>Balance:</span>
                <EyeIcon onClick={() => setVisibleBalances((prev) => prev.map((v, i) => (i === index ? !v : v)))}>
                  {visibleBalances[index] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </EyeIcon>
                <BalanceAmount>
                  {visibleBalances[index]
                    ? `$${category.balance.toFixed(2)}`
                    : "*".repeat(category.balance.toFixed(0).length)}
                </BalanceAmount>
              </BalanceContainer>
            </CardContent>
            <EditButton>
              <EditOutlined />
            </EditButton>
          </Card>
        ))}
      </Grid>

      {/* Modal xác nhận xóa */}
      <ConfirmDeleteModal
        visible={isModalVisible}
        onConfirm={handleDeleteCategory}
        onCancel={handleCancelDelete}
      />
      <CategoryModal
        visible={addModalVisible} onClose={() => setAddModalVisible(false)}
      >
      </CategoryModal>
    </Container>
  );
};

export default Category;
