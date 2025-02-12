import React from "react";
import { Modal, Table, Button, Avatar } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import "./index.css";

interface Transaction {
  id: number;
  name: string;
  category: string;
  balance: number;
  date: string;
  status: "income" | "expense";
}

interface ExpenseCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  categoryData: {
    id: number;
    name: string;
    cover: string;
    totalBalance: number;
    currentBalance: number;
    transactions: Transaction[];
  } | null;
}

const ExpenseCategoryModal: React.FC<ExpenseCategoryModalProps> = ({ visible, onClose, categoryData }) => {
  if (!categoryData) return null;

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Tên giao dịch", dataIndex: "name", key: "name" },
    { title: "Loại category", dataIndex: "category", key: "category" },
    { title: "Số dư", dataIndex: "balance", key: "balance" },
    { title: "Thời gian", dataIndex: "date", key: "date" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span style={{ color: status === "income" ? "green" : "red" }}>
          {status === "income" ? "Thu" : "Chi"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: () => (
        <>
          <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} danger />
        </>
      ),
    },
  ];

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} title={categoryData.name} >
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <Avatar size={64} src={categoryData.cover} />
        <div>
          <p>Tổng thu chi: {categoryData.totalBalance} VND</p>
          <p>Số dư hiện tại: {categoryData.currentBalance} VND</p>
        </div>
      </div>
      <Button type="primary" style={{ marginBottom: 16 }}>Thêm giao dịch mới</Button>
      <Table dataSource={categoryData.transactions} columns={columns} rowKey="id" />
    </Modal>
  );
};

export default ExpenseCategoryModal;
