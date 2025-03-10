// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { PlusOutlined } from "@ant-design/icons";
// import { AddCategoryCard, Card, CardFooter, CardHeader, CardMeta, CardTitle, CreateDate, DetailButton, Grid, MetaTag, PlusIcon, SearchContainer, SearchInput, SortSelect } from "./Budget.styled";
// import "./index.css";
// import { useState } from "react";
// import { message } from "antd";
// import BudgetModal from "@/components/BudgetModal/BudgetModal";
// import ConfirmDeleteModal from "@/components/DeleteModal/ConfirmDeleteModal";
// import { budgets } from "./data";

// const Budget = ({ onSelectBudget }: { onSelectBudget: (id: string) => void }) => {
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [budgetsList, setBudgetsList] = useState(budgets);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [sortOption, setSortOption] = useState<string>("");
//   const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

//   // Danh sách màu nền theo chu kỳ
//   const backgroundColors = ["#ffe1cc", "#d5f6ed", "#e2dbfa", "#dff3fe", "#fbe2f5", "#eceff4"];

//   // Xóa Budget
//   const handleDeleteBudget = () => {
//     if (selectedBudgetId) {
//       setBudgetsList((prev: any) => prev.filter((budget: any) => budget.id !== selectedBudgetId));
//       message.success("Budget deleted successfully!");
//     }
//     setIsModalVisible(false);
//     setSelectedBudgetId(null);
//   };

//   // Hủy bỏ xóa
//   const handleCancelDelete = () => {
//     setIsModalVisible(false);
//     setSelectedBudgetId(null);
//   };

//   // Lọc categories theo search term
//   const filteredCategories = budgetsList.filter((budget: any) =>
//     budget.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Sắp xếp categories
//   switch (sortOption) {
//     case "name-asc":
//       filteredCategories.sort((a: any, b: any) => a.title.localeCompare(b.title));
//       break;
//     case "name-desc":
//       filteredCategories.sort((a: any, b: any) => b.title.localeCompare(a.title));
//       break;
//     case "target-desc":
//       filteredCategories.sort((a: any, b: any) => b.target - a.target);
//       break;
//     case "target-asc":
//       filteredCategories.sort((a: any, b: any) => a.target - b.target);
//       break;
//     case "balance-desc":
//       filteredCategories.sort((a: any, b: any) => b.balance - a.balance);
//       break;
//     case "balance-asc":
//       filteredCategories.sort((a: any, b: any) => a.balance - b.balance);
//       break;
//     default:
//       break;
//   }

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <SearchContainer>
//         <SearchInput
//           placeholder="Search budget..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <SortSelect
//           placeholder="Sort budgets"
//           value={sortOption || undefined}
//           onChange={(value: any) => setSortOption(value as string)}
//           allowClear
//           options={[
//             { label: "Name (A - Z)", value: "name-asc" },
//             { label: "Name (Z - A)", value: "name-desc" },
//             { label: "Target (High - Low)", value: "target-desc" },
//             { label: "Target (Low - High)", value: "target-asc" },
//             { label: "Balance (High - Low)", value: "balance-desc" },
//             { label: "Balance (Low - High)", value: "balance-asc" },
//           ]}
//         />
//       </SearchContainer>
//       <Grid>
//         {/* Card đặc biệt luôn đứng đầu */}
//         <AddCategoryCard onClick={() => setAddModalVisible(true)}>
//           <PlusIcon>
//             <PlusOutlined />
//           </PlusIcon>
//         </AddCategoryCard>

//         {/* Các card hiển thị bình thường */}
//         {filteredCategories.map((category: any, index: number) => (
//           <Card key={category.id} hoverable             
//           style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
//           onClick={() => onSelectBudget(category.id)} // Gọi hàm cập nhật selectedBudgetId
//             >
//             <CardHeader>
//               <CreateDate>{category.date}</CreateDate>
//               <span>📌</span>
//             </CardHeader>
//             <CardTitle>{category.title}</CardTitle>
//             <CardMeta>
//               {category.tags.map((tag: any) => (
//                 <MetaTag key={tag}>
//                   {tag}
//                 </MetaTag>
//               ))}
//             </CardMeta>
//             <CardFooter>
//               {/* <span>${category.target}</span> */}
//               <DetailButton onClick={(e) => {
//               e.stopPropagation(); // Ngăn chặn onClick của Card
//               onSelectBudget(category.id);
//             }}>
//               Details
//             </DetailButton>
//             </CardFooter>
//           </Card>
//         ))}
//       </Grid>
//       {/* Modal xác nhận xóa */}
//       <ConfirmDeleteModal
//         visible={isModalVisible}
//         onConfirm={handleDeleteBudget}
//         onCancel={handleCancelDelete}
//       />
//       <BudgetModal
//         visible={addModalVisible} onClose={() => setAddModalVisible(false)}
//       >
//       </BudgetModal>
//     </div>
//   );
// };

// export default Budget;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseOutlined, Loading3QuartersOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import BudgetModal from "@/components/BudgetModal/BudgetModal";
import ConfirmDeleteModal from "@/components/DeleteModal/ConfirmDeleteModal";
import {
  AddCategoryCard,
  Card,
  CardFooter,
  CardMeta,
  CardTitle,
  DetailButton,
  Grid,
  MetaTag,
  SearchContainer,
  SearchInput,
  SortSelect,
  PlusIcon,
  CardHeader,
  CreateDate,
  DeleteButton,
} from "./Budget.styled";
import "./index.css";
import { deleteBoard, dtoGetBoard, getBoard, getBoardDetail } from "@/services/boardAPI";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Flex } from "antd";

const Budget = ({ onSelectBudget }: { onSelectBudget: (id: string) => void }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [budgetsList, setBudgetsList] = useState<dtoGetBoard[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  // Danh sách màu nền theo chu kỳ
  const backgroundColors = ["#ffe1cc", "#d5f6ed", "#e2dbfa", "#dff3fe", "#fbe2f5", "#eceff4"];

  // Lọc categories theo search term
  const filteredCategories = budgetsList.filter((budget: any) =>
    budget.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp categories
  switch (sortOption) {
    case "name-asc":
      filteredCategories.sort((a: any, b: any) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      filteredCategories.sort((a: any, b: any) => b.title.localeCompare(a.title));
      break;
    case "target-desc":
      filteredCategories.sort((a: any, b: any) => b.target - a.target);
      break;
    case "target-asc":
      filteredCategories.sort((a: any, b: any) => a.target - b.target);
      break;
    case "balance-desc":
      filteredCategories.sort((a: any, b: any) => b.balance - a.balance);
      break;
    case "balance-asc":
      filteredCategories.sort((a: any, b: any) => a.balance - b.balance);
      break;
    default:
      break;
  }

  const fetchBudgets = async () => {
    setLoading(true);
    try {
      const res = await getBoard();
      setBudgetsList(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch budgets");
    }
    setLoading(false);
  };

  const handleFetchBoardDetail = async (budgetId: string) => {
    try {
      const res = await getBoardDetail(budgetId);
      console.log("Board Details:", res.data);
      onSelectBudget(budgetId);
      fetchBudgets();
    } catch (error: any) {
      toast.error("Failed to fetch budget details", error.response?.data.message);
    }
  };

  const handleDeleteBudget = async () => {
    if (!selectedBudgetId) return;

    try {
      await deleteBoard(selectedBudgetId);
      toast.success("Budget deleted successfully!");
      fetchBudgets(); // Refresh danh sách sau khi xóa
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete budget.");
    } finally {
      setIsModalVisible(false);
      setSelectedBudgetId(null);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SearchContainer>
        <SearchInput
          placeholder="Search budget..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SortSelect
          placeholder="Sort budgets"
          value={sortOption || undefined}
          onChange={(value: any) => setSortOption(value as string)}
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
        <AddCategoryCard onClick={() => setAddModalVisible(true)}>
          <PlusIcon>
            <PlusOutlined />
          </PlusIcon>
        </AddCategoryCard>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: "100%" }}>
            <Loading3QuartersOutlined spin />
          </Flex>
        ) : (
          <>
            {filteredCategories.map((budget: any, index: number) => (
              <>
                {/* {budgetsList.map((budget) => ( */}
                <Card
                  key={budget.id}
                  hoverable
                  // onClick={() => handleFetchBoardDetail(budget.id)}
                  style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
                >

                  <CardHeader>
                    <CardTitle>{budget.title}</CardTitle>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <DeleteButton
                        onClick={() => {
                          if (budget?.id) {
                            setSelectedBudgetId(budget.id);
                            setIsModalVisible(true);
                          }
                        }}
                      >
                        <CloseOutlined />
                      </DeleteButton>
                    </div>
                  </CardHeader>
                  <CardMeta>
                    <MetaTag>{budget.currencyUnit}</MetaTag>
                  </CardMeta>
                  <CardFooter>
                    <CreateDate>{dayjs(budget.createdAt).format("D MMMM YYYY")}</CreateDate>

                    <DetailButton onClick={(e) => {
                      e.stopPropagation();
                      handleFetchBoardDetail(budget.id);
                    }}>
                      Details
                    </DetailButton>
                    <DetailButton onClick={() => { setAddModalVisible(true); setSelectedBudgetId(budget.id); }}>
                      Edit
                    </DetailButton>

                  </CardFooter>
                </Card>
                {/* ))}; */}
              </>
            ))};
          </>
        )}
      </Grid>
      <ConfirmDeleteModal visible={isModalVisible} onConfirm={handleDeleteBudget} onCancel={() => setIsModalVisible(false)} />
      <BudgetModal id={selectedBudgetId || ''} visible={addModalVisible} onClose={() => { setAddModalVisible(false); fetchBudgets(); }} fetchBudgets={fetchBudgets} />
    </div>
  );
};

export default Budget;
