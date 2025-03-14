import { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Statistic,
    Progress,
    Tag,
    Button,
    List,
    Segmented
} from 'antd';
import {
    ArrowUpOutlined,
    DollarOutlined,
    MoreOutlined,
    BankOutlined,
    ShoppingOutlined,
    CarOutlined,
    HomeOutlined,
    MedicineBoxOutlined
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/plots';

const { Title, Text } = Typography;

const Dashboard = () => {
    const [timeRange, setTimeRange] = useState('Monthly');

    // Mock data for recent transactions
    const recentTransactions = [
        {
            id: 1,
            name: 'Grocery Shopping',
            date: '2025-03-10',
            amount: -82.45,
            category: 'Shopping',
            icon: <ShoppingOutlined />,
            iconColor: 'bg-blue-500',
        },
        {
            id: 2,
            name: 'Salary Deposit',
            date: '2025-03-08',
            amount: 3200.00,
            category: 'Income',
            icon: <BankOutlined />,
            iconColor: 'bg-green-500',
        },
        {
            id: 3,
            name: 'Car Insurance',
            date: '2025-03-05',
            amount: -145.80,
            category: 'Transportation',
            icon: <CarOutlined />,
            iconColor: 'bg-orange-500',
        },
        {
            id: 4,
            name: 'Rent Payment',
            date: '2025-03-01',
            amount: -1200.00,
            category: 'Housing',
            icon: <HomeOutlined />,
            iconColor: 'bg-purple-500',
        },
        {
            id: 5,
            name: 'Medical Checkup',
            date: '2025-02-27',
            amount: -120.00,
            category: 'Healthcare',
            icon: <MedicineBoxOutlined />,
            iconColor: 'bg-red-500',
        },
    ];

    // Data for expense categories
    const expenseData = [
        { type: 'Housing', value: 1200 },
        { type: 'Food', value: 580 },
        { type: 'Transportation', value: 320 },
        { type: 'Entertainment', value: 240 },
        { type: 'Healthcare', value: 180 },
        { type: 'Others', value: 320 },
    ];

    // Data for spending trend
    const spendingTrendData = [
        { month: 'Jan', expense: 2800, income: 4200 },
        { month: 'Feb', expense: 3100, income: 4200 },
        { month: 'Mar', expense: 2840, income: 4500 },
        { month: 'Apr', expense: 3200, income: 4300 },
        { month: 'May', expense: 2950, income: 4400 },
        { month: 'Jun', expense: 3100, income: 4600 },
    ];

    // Config for expense chart
    const pieConfig = {
        appendPadding: 10,
        data: expenseData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name}: {percentage}',
        },
        interactions: [{ type: 'element-active' }],
    };

    // Config for spending trend chart
    const lineConfig = {
        data: spendingTrendData,
        xField: 'month',
        yField: 'expense',
        seriesField: 'category',
        yAxis: {
            label: {
                formatter: (v: any) => `$${v}`,
            },
        },
        legend: { position: 'top' },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 1000,
            },
        },
    };

    // Budget progress calculation
    const budgetTotal = 4000;
    const budgetUsed = 2840;
    const budgetPercent = Math.round((budgetUsed / budgetTotal) * 100);

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <Title level={2} className="m-0">Financial Dashboard</Title>
                <Segmented
                    options={['Weekly', 'Monthly', 'Yearly']}
                    value={timeRange}
                    onChange={(value) => setTimeRange(value.toString())}
                    className="bg-white shadow-sm"
                />
            </div>

            {/* Account Overview Cards */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} sm={12} lg={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Total Balance</Text>}
                            value={24562.80}
                            precision={2}
                            valueStyle={{ color: '#3f8600', fontSize: '2rem' }}
                            prefix={<DollarOutlined />}
                            suffix={<Tag color="success" className="ml-2">Active</Tag>}
                        />
                        <div className="flex justify-between items-center mt-4">
                            <Text className="text-slate-500">Last updated today</Text>
                            <Text strong className="text-green-600">+2.45%</Text>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Monthly Budget</Text>}
                            value={budgetUsed}
                            precision={2}
                            valueStyle={{ fontSize: '2rem' }}
                            prefix={<DollarOutlined />}
                            suffix={<Text type="secondary">/ ${budgetTotal}</Text>}
                        />
                        <Progress
                            percent={budgetPercent}
                            status={budgetPercent > 90 ? "exception" : "active"}
                            className="mt-2"
                        />
                        <Text className="text-slate-500">
                            {budgetPercent < 80
                                ? "You're on track with your budget"
                                : "You're approaching your budget limit"}
                        </Text>
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Net Income</Text>}
                            value={1660}
                            precision={2}
                            valueStyle={{ color: '#3f8600', fontSize: '2rem' }}
                            prefix={<DollarOutlined />}
                            suffix={
                                <div className="inline-flex items-center ml-2">
                                    <ArrowUpOutlined style={{ color: '#3f8600' }} />
                                    <span style={{ color: '#3f8600' }}>12%</span>
                                </div>
                            }
                        />
                        <Text className="text-slate-500">Compared to last month</Text>
                    </Card>
                </Col>
            </Row>

            {/* Charts */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} lg={16}>
                    <Card
                        title="Income vs. Expense"
                        className="shadow-sm h-full"
                        extra={
                            <Button type="text" icon={<MoreOutlined />} />
                        }
                    >
                        <div className="h-72">
                            <Line {...lineConfig} />
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card
                        title="Expense Breakdown"
                        className="shadow-sm h-full"
                        extra={
                            <Button type="text" icon={<MoreOutlined />} />
                        }
                    >
                        <div className="h-72">
                            <Pie {...pieConfig} />
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Recent Transactions */}
            <Row>
                <Col span={24}>
                    <Card
                        title="Recent Transactions"
                        className="shadow-sm"
                        extra={
                            <Button type="link">View All</Button>
                        }
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={recentTransactions}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <Button type="text" icon={<MoreOutlined />} key="more" />
                                    ]}
                                >
                                    <div className="flex items-center w-full">
                                        <div className={`${item.iconColor} p-2 rounded-full text-white mr-4`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between">
                                                <Text strong>{item.name}</Text>
                                                <Text
                                                    strong
                                                    className={item.amount > 0 ? 'text-green-600' : 'text-red-600'}
                                                >
                                                    {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                                                </Text>
                                            </div>
                                            <div className="flex justify-between">
                                                <Text type="secondary">{item.category}</Text>
                                                <Text type="secondary">{item.date}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Financial Goals Section */}
            <Row className="mt-6">
                <Col span={24}>
                    <Card title="Financial Goals" className="shadow-sm">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={8}>
                                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                                    <Title level={5}>Emergency Fund</Title>
                                    <Progress
                                        percent={75}
                                        strokeColor="#1677ff"
                                        trailColor="#e6f4ff"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <Text>$7,500</Text>
                                        <Text type="secondary">/ $10,000</Text>
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} md={8}>
                                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                                    <Title level={5}>Vacation</Title>
                                    <Progress
                                        percent={45}
                                        strokeColor="#52c41a"
                                        trailColor="#f6ffed"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <Text>$2,250</Text>
                                        <Text type="secondary">/ $5,000</Text>
                                    </div>
                                </Card>
                            </Col>

                            <Col xs={24} md={8}>
                                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                                    <Title level={5}>New Car</Title>
                                    <Progress
                                        percent={20}
                                        strokeColor="#722ed1"
                                        trailColor="#f9f0ff"
                                    />
                                    <div className="flex justify-between mt-2">
                                        <Text>$6,000</Text>
                                        <Text type="secondary">/ $30,000</Text>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;