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
import { createBudgetWithAI } from "@/services/boardAPI";
import { deleteBoard, dtoGetBoard, getBoard, getBoardDetail } from "@/services/boardAPI";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Flex, Modal, Input, Button } from "antd";
import { IoSparklesSharp } from "react-icons/io5";

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
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [creatingBudget, setCreatingBudget] = useState(false);

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

  const handleCreateBudgetWithAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a prompt for the AI");
      return;
    }

    setCreatingBudget(true);
    try {
      const result = await createBudgetWithAI(aiPrompt);
      toast.success("Budget created successfully with AI!");
      fetchBudgets(); // Refresh the budget list after creation
      setAiModalVisible(false);
      setAiPrompt(""); // Reset the prompt input
    } catch (error) {
      toast.error("Failed to create budget with AI.");
    } finally {
      setCreatingBudget(false);
    }
  };

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
        {/* AI Budget Creation Button */}
        <AddCategoryCard onClick={() => setAiModalVisible(true)}>
          <Flex align="center" gap={12} className="text-xl">
            <IoSparklesSharp /> Generate budget with AI
          </Flex>
        </AddCategoryCard>
        {loading ? (
          <Flex justify="center" align="center" style={{ height: "100%" }}>
            <Loading3QuartersOutlined spin />
          </Flex>
        ) : (
          <>
            {filteredCategories.map((budget: any, index: number) => (
              <Card
                key={budget.id}
                hoverable
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
            ))}
          </>
        )}
      </Grid>
      <ConfirmDeleteModal visible={isModalVisible} onConfirm={handleDeleteBudget} onCancel={() => setIsModalVisible(false)} />
      <BudgetModal id={selectedBudgetId || ''} visible={addModalVisible} onClose={() => { setAddModalVisible(false); fetchBudgets(); }} fetchBudgets={fetchBudgets} />

      {/* AI Budget Creation Modal */}
      <Modal
        title="Create Budget with AI"
        open={aiModalVisible}
        onCancel={() => {
          if (!creatingBudget) {
            setAiModalVisible(false);
            setAiPrompt("");
          }
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              if (!creatingBudget) {
                setAiModalVisible(false);
                setAiPrompt("");
              }
            }}
            disabled={creatingBudget}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCreateBudgetWithAI}
            loading={creatingBudget}
            disabled={creatingBudget}
          >
            Create
          </Button>
        ]}
        closable={!creatingBudget}
        maskClosable={!creatingBudget}
      >
        <p>Describe the budget you want to create:</p>
        <Input.TextArea
          placeholder="E.g., I want to track my monthly household expenses in Vietnam"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          rows={4}
          disabled={creatingBudget}
        />
        {creatingBudget && (
          <Flex justify="center" align="center" style={{ marginTop: 16 }}>
            <Loading3QuartersOutlined spin style={{ fontSize: 24 }} />
            <span style={{ marginLeft: 8 }}>Creating your budget with AI...</span>
          </Flex>
        )}
      </Modal>
    </div>
  );
};

export default Budget;
