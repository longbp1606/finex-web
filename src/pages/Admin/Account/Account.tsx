/* eslint-disable @typescript-eslint/no-explicit-any */

import CTable from "@/components/Table/CTable";
import { LockOutlined } from "@ant-design/icons";
import { Button, TableColumnsType } from "antd";
import { useState } from "react";

interface Account {
    id: number;
    name: string;
    transactions: { category: string; amount: number }[];
    isLocked: boolean;
}

const Account = () => {
    const [accountData, setAccountData] = useState<Account[]>([
        {
            id: 1,
            name: "John Doe",
            transactions: [
                { category: "Food & Drink", amount: 200000 },
                { category: "Transportation", amount: 150000 },
                { category: "Entertainment", amount: 100000 },
            ],
            isLocked: false,
        },
        {
            id: 2,
            name: "Jane Smith",
            transactions: [
                { category: "Salary", amount: 5000000 },
                { category: "Food & Drink", amount: 250000 },
            ],
            isLocked: false,
        },
        {
            id: 3,
            name: "Michael Johnson",
            transactions: [{ category: "Entertainment", amount: 300000 }],
            isLocked: false,
        },
    ]);

    // Hàm khóa/mở khóa tài khoản
    const handleLockAccount = (id: number) => {
        setAccountData((prev) =>
            prev.map((acc) =>
                acc.id === id ? { ...acc, isLocked: !acc.isLocked } : acc
            )
        );
    };

    const columnDef: TableColumnsType<Account> = [
        { title: "No.", dataIndex: "id", key: "id" },
        { title: "User Name", dataIndex: "name", key: "name" },
        {
            title: "Transaction Total",
            dataIndex: "transactions",
            key: "transactionTotal",
            render: (transactions) =>
                transactions.reduce((sum: any, t: any) => sum + t.amount, 0).toLocaleString() + " VND",
        },
        {
            title: "Category Total",
            dataIndex: "transactions",
            key: "categoryTotal",
            render: (transactions) => new Set(transactions.map((t: any) => t.category)).size,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button
                    icon={<LockOutlined />}
                    type={record.isLocked ? "primary" : "default"}
                    danger={record.isLocked}
                    onClick={() => handleLockAccount(record.id)}
                >
                    {record.isLocked ? "Unlock" : "Lock"}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <CTable columns={columnDef} dataSource={accountData} pageSize={5} />
        </div>
    );
};

export default Account;
