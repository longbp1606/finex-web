import { AnalysisResponse } from "@/services/analysisAPI";
import { TableProps } from "antd";

export interface AnalysisDataType extends AnalysisResponse {
    index: number;
    key: string;
}

export const ReportColumns: TableProps<AnalysisDataType>['columns'] = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'key',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (_, response) => response.amount.toLocaleString(),
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_, response) => new Date(response.createdAt).toLocaleString(),
    },
    {
        title: 'Categories',
        dataIndex: 'categories',
        key: 'categories',
        render: (_, response) => response.categories.map(item => item.name).join(', '),
    },
];