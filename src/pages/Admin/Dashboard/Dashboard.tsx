import { Flex, Select, SelectProps } from "antd"
import { ReactNode, useState } from "react"
import WauChart from "./charts/WauChart";
import CacChart from "./charts/CacChart";
import CltvChart from "./charts/CltvChart";
import FreeToPremiumChart from "./charts/FreeToPremiumChart";
import RetentionRateChart from "./charts/RetentionRateChart";
import MonthlyRecurringRevenueChart from "./charts/MonthlyRecurringRevenueChart";
import ChurnRateChart from "./charts/ChurnRateChart";

const chartSelectItem: SelectProps['options'] = [
    {
        value: "wau",
        label: "Weekly Active Users (WAU)"
    },
    {
        value: "cac",
        label: "Customer Acquisition Cost (CAC)"
    },
    {
        value: "cltv",
        label: "Customer Lifetime Value (CLTV)"
    },
    {
        value: "freeToPremium",
        label: "Free → Premium"
    },
    {
        value: "retentionRate",
        label: "Retention Rate (30-day)"
    },
    {
        value: "mrr",
        label: "Monthly Recurring Revenue (MRR)"
    },
    {
        value: "churnRate",
        label: "Churn Rate"
    }
]

const chartMap: Record<string, ReactNode> = {
    wau: <WauChart />,
    cac: <CacChart />,
    cltv: <CltvChart />,
    freeToPremium: <FreeToPremiumChart />,
    retentionRate: <RetentionRateChart />,
    mrr: <MonthlyRecurringRevenueChart />,
    churnRate: <ChurnRateChart />
};

const Dashboard = () => {
    const [currentChart, setCurrentChart] = useState<string>();

    return (
        <Flex vertical gap={12}>
            <Select
                options={chartSelectItem}
                placeholder="Select chart"
                className="max-w-[320px]"
                onChange={(v) => setCurrentChart(v)}
            />

            {currentChart && chartMap[currentChart]}
        </Flex>
    )
}

export default Dashboard