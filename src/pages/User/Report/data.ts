import { theme } from "@/themes";

export const moneyData = [
    { amount: "$8,903", label: "This month's spending" },
    { amount: "$456", label: "Today's spending" },
    { amount: "-$265", label: "Yesterday spending" },
];

export const weekOptions: ApexCharts.ApexOptions = {
    chart: { type: "line" },
    xaxis: { categories: ["Mon", "Tus", "Wed", "Thur", "Fri", "Sat", "Sun"] },
    stroke: { curve: "smooth" },
    colors: ["#2A776A", `${theme.color.secondary}`],
};

export const weekSeries: ApexAxisChartSeries = [
    { name: "Income", data: [300, 400, 350, 500, 800, 600, 700] },
    { name: "Outcome", data: [250, 380, 400, 450, 780, 590, 680] },
];

export const reportColumns = [
    { title: "Name", dataIndex: "name" },
    { title: "Time", dataIndex: "time" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Balance", dataIndex: "balance" },
    { title: "Category", dataIndex: "category" },
];

export const reportData = [
    { key: "1", name: "Bought a jacket", time: "2024-02-01", amount: 800, balance: 2200, category: "Clothing" },
    { key: "2", name: "Dinner at restaurant", time: "2024-02-02", amount: 500, balance: 1700, category: "Food" },
    { key: "3", name: "Grocery shopping", time: "2024-02-03", amount: 300, balance: 1400, category: "Groceries" },
    { key: "4", name: "Taxi ride", time: "2024-02-04", amount: 150, balance: 1250, category: "Transport" },
    { key: "5", name: "Gym membership", time: "2024-02-05", amount: 700, balance: 550, category: "Health" },
    { key: "6", name: "Bought a book", time: "2024-02-06", amount: 200, balance: 350, category: "Education" },
    { key: "7", name: "Coffee with friends", time: "2024-02-07", amount: 100, balance: 250, category: "Entertainment" },
    { key: "8", name: "Paid electricity bill", time: "2024-02-08", amount: 600, balance: -350, category: "Utilities" },
    { key: "9", name: "Movie tickets", time: "2024-02-09", amount: 250, balance: -600, category: "Entertainment" },
    { key: "10", name: "Lunch at cafe", time: "2024-02-10", amount: 300, balance: -900, category: "Food" },
];
