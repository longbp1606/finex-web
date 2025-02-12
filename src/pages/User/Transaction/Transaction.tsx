/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, TableColumnsType, TableProps } from "antd";
import "./index.css";
import { useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";



// const { Meta } = Card;

interface TransactionList {
    id: number;
    name: string;
    category: string;
    balance: number;
    date: string;
    status: string;
}
type OnChange = NonNullable<TableProps<TransactionList>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const Transaction = () => {
    const revenueTotal = 5000000;
    const expensesTotal = 3570080;
    const remainingBalance = revenueTotal - expensesTotal;
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };


    const columnDef: TableColumnsType<TransactionList> = [
        { title: "STT", dataIndex: "id", key: "id" },
        { title: "Tên giao dịch", dataIndex: "name", key: "name" },
        {
            title: "Loại category", dataIndex: "category", key: "category",
            filters: [
                { text: 'Food', value: 'Food' },
                { text: 'Travel', value: 'Travel' },
                { text: 'Entertainment', value: 'Entertainment' },
                { text: 'Salary', value: 'Salary' },
            ],
            filteredValue: filteredInfo.category || null,
            onFilter: (value, record) => record.category.includes(value as string),
            sorter: (a, b) => a.category.length - b.category.length,
            sortOrder: sortedInfo.columnKey === 'category' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Số dư", dataIndex: "balance", key: "balance",
        },
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
            filters: [
                { text: 'Thu', value: 'Thu' },
                { text: 'Chi', value: 'Chi' },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value as string),
            sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
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

    const rowData = [
        { id: 1, name: "Beef Noodle Soup", category: "Food & Drink", balance: -50000, date: "2024-02-09", status: "expense" },
        { id: 2, name: "Grab Ride", category: "Transportation", balance: -60000, date: "2024-02-06", status: "expense" },
        { id: 3, name: "Movie Ticket", category: "Entertainment", balance: -120000, date: "2024-02-04", status: "expense" },
        { id: 4, name: "Salary", category: "Salary", balance: 3000000, date: "2024-02-07", status: "income" },
        { id: 5, name: "Coffee", category: "Food & Drink", balance: -30000, date: "2024-02-08", status: "expense" },
        { id: 6, name: "Steam Game", category: "Entertainment", balance: -300000, date: "2024-02-03", status: "expense" },
    ];




    return (
        <div className="transaction_area">
            <div className="revenueExpensesTotal">
                <div className="moneyDetail">
                    <Button className="summary-btn revenue-btn">
                        <span>Revenue: {revenueTotal}</span>
                        <PlusOutlined className="plus-icon" />
                    </Button>

                    <Button className="summary-btn expenses-btn">
                        <span>Expenses: {expensesTotal}</span>
                    </Button>

                    <Button className="summary-btn remaining-btn">
                        <span>Remaining Balance: {remainingBalance}</span>
                    </Button>
                </div>
                <Button type="primary" style={{ width: "200px" }}>Thêm giao dịch mới</Button>
            </div>
            <div className="categoryList">
                <Table<TransactionList> columns={columnDef} dataSource={rowData} onChange={handleChange} />
            </div>
        </div>
    )
}

export default Transaction