/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, TableColumnsType, Input, Modal, Form, message, DatePicker, Select } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import CTabs from "@/components/Tab/CTab";
import CTable from "@/components/Table/CTable";
import "./index.css";
import dayjs from "dayjs";

interface TransactionList {
    id: number;
    name: string;
    category: string;
    amount: number;
    balance: number;
    date: string;
    status: string;
}

// type OnChange = NonNullable<TableProps<TransactionList>['onChange']>;
// type GetSingle<T> = T extends (infer U)[] ? U : never;

const Transaction = () => {
    const revenueTotal = 5000000;
    const expensesTotal = 3570080;
    const remainingBalance = revenueTotal - expensesTotal;

    const [searchText, setSearchText] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<TransactionList | null>(null);
    const [form] = Form.useForm();

    const [rowData, setRowData] = useState<TransactionList[]>([
        { id: 1, name: "Beef Noodle Soup", category: "Food & Drink", amount: 200000, balance: -50000, date: "2024-02-09", status: "expense" },
        { id: 2, name: "Grab Ride", category: "Transportation", amount: 200000, balance: -60000, date: "2024-02-06", status: "expense" },
        { id: 3, name: "Movie Ticket", category: "Entertainment", amount: 200000, balance: -120000, date: "2024-02-04", status: "expense" },
        { id: 4, name: "Salary", category: "Salary", amount: 200000, balance: 3000000, date: "2024-02-07", status: "income" },
        { id: 5, name: "Coffee", category: "Food & Drink", amount: 200000, balance: -30000, date: "2024-02-08", status: "expense" },
        { id: 6, name: "Steam Game", category: "Entertainment", amount: 200000, balance: -300000, date: "2024-02-03", status: "expense" },
    ]);

    // Mở Modal
    const showModal = (record?: TransactionList) => {
        setIsModalOpen(true);
        if (record) {
            setEditingTransaction(record);
            form.setFieldsValue({
                ...record,
                date: dayjs(record.date), // Chuyển đổi date string thành dayjs object
            });
        } else {
            setEditingTransaction(null);
            form.resetFields();
        }
    };

    // Lưu dữ liệu sau khi thêm/sửa
    const handleSave = (values: any) => {
        const newData = {
            ...values,
            date: values.date.format("YYYY-MM-DD"), // Chuyển dayjs object thành string
        };

        if (editingTransaction) {
            setRowData(prev =>
                prev.map(item => (item.id === editingTransaction.id ? { ...item, ...newData } : item))
            );
            message.success("Đã cập nhật giao dịch!");
        } else {
            setRowData(prev => [...prev, { ...newData, id: prev.length + 1 }]);
            message.success("Đã thêm giao dịch mới!");
        }
        setIsModalOpen(false);
    };


    // Xóa giao dịch
    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn xóa giao dịch này?",
            onOk: () => {
                setRowData(prev => prev.filter(item => item.id !== id));
                message.success("Đã xóa giao dịch!");
            }
        });
    };

    // Bộ lọc tìm kiếm & ngày tháng
    const filteredData = rowData.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
        // (!dateFilter || (item.date >= dateFilter[0] && item.date <= dateFilter[1]))
    );

    const columnDef: TableColumnsType<TransactionList> = [
        { title: "No.", dataIndex: "id", key: "id" },
        { title: "Transaction Name", dataIndex: "name", key: "name" },
        {
            title: "Category Type",
            dataIndex: "category",
            key: "category",
            filters: [
                { text: "Food & Drink", value: "Food & Drink" },
                { text: "Transportation", value: "Transportation" },
                { text: "Entertainment", value: "Entertainment" },
                { text: "Salary", value: "Salary" },
            ],
            onFilter: (value, record) => record.category === value,
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            sorter: (a, b) => a.balance - b.balance,
            render: (_, record) => (
                <span style={{ color: record.balance >= 0 ? "green" : "red" }}>
                    {record.balance.toLocaleString()} VND
                </span>
            ),
        },
        { title: "Date", dataIndex: "date", key: "date" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span style={{ color: status === "income" ? "green" : "red" }}>
                    {status === "income" ? "Income" : "Expense"}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => record && showModal(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => record && handleDelete(record.id)} />
                </>
            ),

        },
    ];

    const items = [
        { key: "1", label: "All", children: <CTable columns={columnDef} dataSource={filteredData} pageSize={5} /> },
        { key: "2", label: "Income", children: <CTable columns={columnDef} dataSource={filteredData.filter(item => item.status === "income")} pageSize={5} /> },
        { key: "3", label: "Expenses", children: <CTable columns={columnDef} dataSource={filteredData.filter(item => item.status === "expense")} pageSize={5} /> },
    ];

    return (
        <div className="transaction_area">
            <div className="revenueExpensesTotal">
                <div className="moneyDetail">
                    <div className="summary-btn">
                        <h3 className="totalTitle">Current Balance</h3>
                        <span className="totalAmount">{remainingBalance}</span>
                    </div>
                    <div className="summary-btn">
                        <h3 className="totalTitle">Revenue</h3>
                        <span className="totalAmount revenue-btn">+ {revenueTotal}</span>
                    </div>
                    <div className="summary-btn">
                        <h3 className="totalTitle">Expenses</h3>
                        <span className="totalAmount expenses-btn">- {expensesTotal}</span>
                    </div>
                </div>
            </div>
            <div className="search-filter">
                <Input prefix={<SearchOutlined />} placeholder="Tìm giao dịch..." onChange={(e) => setSearchText(e.target.value)} style={{ width: "300px" }} />
                {/* <RangePicker onChange={(dates) => setDateFilter(dates ? [dayjs(dates[0]).format("YYYY-MM-DD"), dayjs(dates[1]).format("YYYY-MM-DD")] : null)} /> */}
                <Button type="primary" onClick={() => showModal()} icon={<PlusOutlined />}>Thêm giao dịch mới</Button>

            </div>
            <CTabs defaultActiveKey="1" items={items} activeColor="#047B62" />

            <Modal
                title="Add new"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleSave} layout="vertical" >
                    <Form.Item
                        name="name"
                        label="Transaction Name"
                        rules={[{ required: true, message: "Please enter transaction name!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: "Please select a category!" }]}
                    >
                        <Select placeholder="Select category">
                            <Select.Option value="Food & Drink">Food & Drink</Select.Option>
                            <Select.Option value="Transportation">Transportation</Select.Option>
                            <Select.Option value="Entertainment">Entertainment</Select.Option>
                            <Select.Option value="Salary">Salary</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: "Please enter amount!" }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        name="date"
                        label="Transaction Date"
                        rules={[{ required: true, message: "Please select a date!" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Please select a status!" }]}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default Transaction;
