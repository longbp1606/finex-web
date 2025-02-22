/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { FC, useState } from "react";
import { budgets } from "./data"; // Import danh sách ngân sách
import { Button, Input, Table, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TransactionHeader, TransactionHeader_Title } from "./Budget.styled";

const AddTransaction: FC = () => {
  const { id } = useParams<{ id: string }>();
  const budget = budgets.find((b) => b.id === id);

  const [transactions, setTransactions] = useState(budget?.transaction || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    date: "",
    amount: "",
  });

  // Cấu hình cột của bảng
  const columns: ColumnsType<any> = [
    {
      title: "Transaction Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`, // Hiển thị tiền với 2 chữ số thập phân
    },
  ];

  const handleAddTransaction = () => {
    if (!newTransaction.name || !newTransaction.date || !newTransaction.amount) {
      alert("Please fill all fields!");
      return;
    }

    const newTrans = {
      id: `t${transactions.length + 1}`,
      name: newTransaction.name,
      date: newTransaction.date,
      amount: parseFloat(newTransaction.amount),
    };

    setTransactions([...transactions, newTrans]);
    setNewTransaction({ name: "", date: "", amount: "" });
    setIsModalOpen(false);
  };

  if (!budget) return <h2>Budget not found!</h2>;

  return (
    <div className="transaction-detail">
      {/* Header với nút Add */}
      <TransactionHeader className="transaction-header">
        <TransactionHeader_Title>Transaction List</TransactionHeader_Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add new transaction
        </Button>
      </TransactionHeader>

      {/* Bảng danh sách giao dịch */}
      <Table dataSource={transactions} columns={columns} rowKey="id" pagination={false} />

      {/* Modal Thêm giao dịch */}
      <Modal
        title="Add Transaction"
        open={isModalOpen}
        onOk={handleAddTransaction}
        onCancel={() => setIsModalOpen(false)}
        okText="Add new transaction"
        cancelText="Cancel"
      >
        <Input
          placeholder="Transaction Name"
          value={newTransaction.name}
          onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Date (YYYY-MM-DD)"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Amount"
          type="number"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        />
      </Modal>
    </div>
  );
};

export default AddTransaction;
