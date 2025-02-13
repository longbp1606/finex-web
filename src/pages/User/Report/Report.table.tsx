import { TableProps } from "antd";

export interface ReportDataType {
    index: number;
    key: string;
    description: string;
    time: string;
    amount: number;
    category: string;
    note: string;
}

export const ReportColumns: TableProps<ReportDataType>['columns'] = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'key',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
    },
];