import { FC, useState, useEffect } from "react";
import { Button, Table, Modal, message, DatePicker, Space, Input } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { TransactionHeader, TransactionHeader_Title, CustomSearch } from "./Budget.styled";
import { getReport, createReport, removeReport, updateReport } from "../../../services/reportAPI";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ConfirmDeleteModal from "@/components/DeleteModal/ConfirmDeleteModal";
import { theme } from "@/themes";

const AddTransaction: FC<{ id: string; onBack: () => void }> = ({ id, onBack }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [searchText, setSearchText] = useState("");
  const [newTransaction, setNewTransaction] = useState("");
  const [createdAt, setCreatedAt] = useState<Dayjs>(dayjs());
  const [editingTransaction, setEditingTransaction] = useState<{ id: string; content: string; createdAt: Dayjs } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const fetchTransactions = async (date: Dayjs) => {
    try {
      const formattedDate = date.format("YYYY-MM-DD");
      const response = await getReport(id, formattedDate);
      const transactionsData = response.data?.data || [];
      setTransactions(transactionsData);
      setFilteredTransactions(transactionsData);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch transactions");
      setError("Failed to fetch transactions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(selectedDate);
  }, [id, selectedDate]);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) setSelectedDate(date);
  };

  const handleSearch = (value: string) => {
    console.log(searchText);
    setSearchText(value);
    setFilteredTransactions(
      value
        ? transactions.filter((t) =>
          t.content.toLowerCase().includes(value.toLowerCase())
        )
        : transactions
    );
  };

  const handleSaveTransaction = async () => {
    if (!newTransaction.trim()) {
      message.warning("Please enter transaction content");
      return;
    }

    try {
      if (editingTransaction) {
        await updateReport(id, editingTransaction.id, newTransaction, createdAt.format("YYYY-MM-DD HH:mm:ss"));
        message.success("Transaction updated successfully");
      } else {
        await createReport(id, newTransaction, createdAt.format("YYYY-MM-DD HH:mm:ss"));
        message.success("Transaction added successfully");
      }

      setIsModalOpen(false);
      setNewTransaction("");
      setCreatedAt(dayjs());
      setEditingTransaction(null);

      setSelectedDate(createdAt);

      fetchTransactions(createdAt);
    } catch (error) {
      console.error("Error saving transaction:", error);
      message.error("Failed to save transaction");
    }
  };


  const handleEdit = (record: any) => {
    setEditingTransaction({
      id: record.id,
      content: record.content,
      createdAt: dayjs(record.createdAt),
    });
    setNewTransaction(record.content);
    setCreatedAt(dayjs(record.createdAt));
    setIsModalOpen(true);
  };

  const handleDelete = (record: any) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecord) return;

    try {
      await removeReport(id, selectedRecord.id);
      message.success("Transaction deleted successfully");
      fetchTransactions(selectedDate);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      message.error("Failed to delete transaction");
    }

    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="transaction-detail">
      <TransactionHeader_Title>Transaction List</TransactionHeader_Title>
      <TransactionHeader>
        <Button type="primary" onClick={onBack}>Back</Button>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>Add new transaction</Button>
      </TransactionHeader>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <CustomSearch
          placeholder="Search"
          allowClear
          onSearch={handleSearch}
          style={{ width: 400 }}
        />
        <DatePicker value={selectedDate} onChange={handleDateChange} />
      </div>

      <Table
        rowKey="id"
        dataSource={filteredTransactions}
        columns={[
          {
            title: "No.",
            key: "index",
            render: (_, __, index) => index + 1,
            width: 60,
          },
          {
            title: "Content",
            dataIndex: "content",
            key: "content",
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => new Date(text).toLocaleString(),
          },
          {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
              <Space style={{ gap: "20px" }}>
                <EditOutlined
                  style={{ color: `${theme.color.primary}`, cursor: "pointer" }}
                  onClick={() => handleEdit(record)}
                />
                <DeleteOutlined
                  style={{ color: "#e63946", cursor: "pointer" }}
                  onClick={() => handleDelete(record)}
                />
              </Space>
            ),
            width: 100,
          },
        ]}
      />

      <Modal
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSaveTransaction}>
            {editingTransaction ? "Save Changes" : "Submit"}
          </Button>,
        ]}
      >
        <Input
          placeholder="Enter transaction content"
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
        />
        <DatePicker
          showTime
          value={createdAt}
          onChange={(date) => date && setCreatedAt(date)}
          style={{ width: "100%", marginTop: 10 }}
        />
      </Modal>

      <ConfirmDeleteModal
        visible={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div >
  );
};

export default AddTransaction;
