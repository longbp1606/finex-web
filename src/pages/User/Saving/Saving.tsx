import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Progress,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Statistic,
    Tabs,
    Divider,
    Empty,
    Tooltip,
    List,
    Tag
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    BankOutlined,
    CarOutlined,
    HomeOutlined,
    GlobalOutlined,
    GiftOutlined,
    HeartOutlined,
    BookOutlined,
    TrophyOutlined,
    InfoCircleOutlined,
    RocketOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Define TypeScript interfaces
interface Contribution {
    date: string;
    amount: number;
}

interface AutoContribution {
    amount: number;
    frequency: 'none' | 'weekly' | 'biweekly' | 'monthly';
}

interface SavingGoal {
    id: number;
    name: string;
    icon: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
    category: string;
    notes: string;
    contributions: Contribution[];
    autoContribution: AutoContribution;
    status: 'active' | 'completed';
}

interface ContributionWithGoalInfo extends Contribution {
    goalName: string;
    goalIcon: string;
}

interface FormValues {
    name: string;
    icon: string;
    targetAmount: number;
    currentAmount?: number;
    deadline: dayjs.Dayjs;
    category: string;
    notes?: string;
    autoContributionAmount?: number;
    autoContributionFrequency?: 'none' | 'weekly' | 'biweekly' | 'monthly';
}

const Saving = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm<FormValues>();
    const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>('active');

    // Sample savings goals
    const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([
        {
            id: 1,
            name: 'Vacation to Japan',
            icon: 'global',
            targetAmount: 5000,
            currentAmount: 2750,
            deadline: '2025-09-15',
            category: 'Travel',
            notes: 'Planning a 2-week trip to Tokyo and Kyoto',
            contributions: [
                { date: '2025-01-05', amount: 500 },
                { date: '2025-02-10', amount: 750 },
                { date: '2025-03-08', amount: 1000 },
                { date: '2025-03-15', amount: 500 },
            ],
            autoContribution: { amount: 250, frequency: 'monthly' },
            status: 'active',
        },
        {
            id: 2,
            name: 'New Car',
            icon: 'car',
            targetAmount: 20000,
            currentAmount: 5000,
            deadline: '2025-12-31',
            category: 'Vehicle',
            notes: 'Looking at electric vehicles',
            contributions: [
                { date: '2024-10-05', amount: 2000 },
                { date: '2024-12-10', amount: 1500 },
                { date: '2025-02-15', amount: 1500 },
            ],
            autoContribution: { amount: 500, frequency: 'monthly' },
            status: 'active',
        },
        {
            id: 3,
            name: 'Emergency Fund',
            icon: 'bank',
            targetAmount: 15000,
            currentAmount: 13500,
            deadline: '2025-06-30',
            category: 'Emergency',
            notes: '6 months of living expenses',
            contributions: [
                { date: '2024-08-05', amount: 5000 },
                { date: '2024-09-10', amount: 4000 },
                { date: '2024-11-15', amount: 3000 },
                { date: '2025-01-20', amount: 1500 },
            ],
            autoContribution: { amount: 500, frequency: 'monthly' },
            status: 'active',
        },
        {
            id: 4,
            name: 'Wedding Fund',
            icon: 'heart',
            targetAmount: 25000,
            currentAmount: 25000,
            deadline: '2024-06-15',
            category: 'Event',
            notes: 'Completed saving for wedding',
            contributions: [
                { date: '2023-06-05', amount: 10000 },
                { date: '2023-09-10', amount: 8000 },
                { date: '2023-12-15', amount: 7000 },
            ],
            autoContribution: { amount: 0, frequency: 'none' },
            status: 'completed',
        }
    ]);

    // Icon mapping
    const iconMap: Record<string, React.ReactNode> = {
        'bank': <BankOutlined />,
        'car': <CarOutlined />,
        'home': <HomeOutlined />,
        'global': <GlobalOutlined />,
        'gift': <GiftOutlined />,
        'heart': <HeartOutlined />,
        'book': <BookOutlined />,
        'trophy': <TrophyOutlined />,
    };

    // Modal handlers
    const showModal = (goalId: number | null = null): void => {
        setEditingGoalId(goalId);

        if (goalId) {
            const goal = savingGoals.find(g => g.id === goalId);
            if (goal) {
                form.setFieldsValue({
                    ...goal,
                    deadline: goal.deadline ? dayjs(goal.deadline) : undefined,
                    autoContributionAmount: goal.autoContribution?.amount,
                    autoContributionFrequency: goal.autoContribution?.frequency,
                });
            }
        } else {
            form.resetFields();
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = (values: FormValues): void => {
        const formattedGoal: SavingGoal = {
            id: editingGoalId || 0, // Will be replaced if adding new goal
            name: values.name,
            icon: values.icon,
            targetAmount: values.targetAmount,
            currentAmount: values.currentAmount || 0,
            deadline: values.deadline?.format('YYYY-MM-DD') || '',
            category: values.category,
            notes: values.notes || '',  // This fixes the 'notes' property type issue
            contributions: values.currentAmount 
                ? [{ date: dayjs().format('YYYY-MM-DD'), amount: values.currentAmount }] 
                : [],
            autoContribution: {
                amount: values.autoContributionAmount || 0,
                frequency: values.autoContributionFrequency || 'none'
            },
            status: 'active' as const
        };
    
        if (editingGoalId) {
            // Edit existing goal
            setSavingGoals(
                savingGoals.map(goal =>
                    goal.id === editingGoalId ? formattedGoal : goal
                )
            );
        } else {
            // Add new goal
            const newGoal = {
                ...formattedGoal,
                id: Math.max(0, ...savingGoals.map(g => g.id)) + 1,
            };
            setSavingGoals([...savingGoals, newGoal]);
        }
    
        setIsModalVisible(false);
    }

    // Delete goal handler
    const handleDelete = (goalId: number): void => {
        Modal.confirm({
            title: 'Are you sure you want to delete this savings goal?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete it',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                setSavingGoals(savingGoals.filter(goal => goal.id !== goalId));
            }
        });
    };

    // Add contribution handler
    const handleAddContribution = (goalId: number): void => {
        Modal.confirm({
            title: 'Add Contribution',
            icon: <BankOutlined />,
            content: (
                <Form layout="vertical">
                    <Form.Item label="Amount" name="contributionAmount">
                        <InputNumber
                            prefix="$"
                            min={1}
                            style={{ width: '100%' }}
                            id="contributionAmount"
                        />
                    </Form.Item>
                </Form>
            ),
            okText: 'Add',
            cancelText: 'Cancel',
            onOk() {
                const contributionAmountElement = document.getElementById('contributionAmount') as HTMLInputElement;
                const contributionAmount = parseFloat(contributionAmountElement.value);

                if (!isNaN(contributionAmount) && contributionAmount > 0) {
                    setSavingGoals(
                        savingGoals.map(goal => {
                            if (goal.id === goalId) {
                                const newCurrentAmount = goal.currentAmount + contributionAmount;
                                const newContributions = [
                                    ...goal.contributions,
                                    { date: dayjs().format('YYYY-MM-DD'), amount: contributionAmount }
                                ];

                                // Check if goal is now complete
                                const status = newCurrentAmount >= goal.targetAmount ? 'completed' : 'active';

                                return {
                                    ...goal,
                                    currentAmount: newCurrentAmount,
                                    contributions: newContributions,
                                    status
                                } as SavingGoal;
                            }
                            return goal;
                        })
                    );
                }
            }
        });
    };

    // Calculate total savings
    const totalSavings = savingGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    const totalTarget = savingGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);

    // Filter goals by status
    const activeGoals = savingGoals.filter(goal => goal.status === 'active');
    const completedGoals = savingGoals.filter(goal => goal.status === 'completed');

    // Calculate progress percentage for each goal
    const getProgressPercent = (current: number, target: number): number =>
        Math.min(100, Math.round((current / target) * 100));

    // Helper to format currency
    const formatCurrency = (amount: number): string => {
        return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={2} className="m-0">Savings Goals</Title>
                    <Text type="secondary">Track your progress toward financial goals</Text>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal()}
                    size="large"
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    Add New Goal
                </Button>
            </div>

            {/* Summary Statistics */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Total Savings</Text>}
                            value={totalSavings}
                            precision={2}
                            valueStyle={{ color: '#3f8600', fontSize: '2rem' }}
                            prefix="$"
                            suffix={
                                <Tooltip title="Total amount saved across all goals">
                                    <InfoCircleOutlined className="ml-2 text-gray-400" />
                                </Tooltip>
                            }
                        />
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Overall Progress</Text>}
                            value={getProgressPercent(totalSavings, totalTarget)}
                            precision={0}
                            valueStyle={{ fontSize: '2rem' }}
                            suffix="%"
                        />
                        <Progress
                            percent={getProgressPercent(totalSavings, totalTarget)}
                            showInfo={false}
                            status="active"
                            className="mt-2"
                        />
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong className="text-lg">Active Goals</Text>}
                            value={activeGoals.length}
                            valueStyle={{ fontSize: '2rem' }}
                            suffix={
                                <Text type="secondary" className="text-base ml-1">/ {savingGoals.length} total</Text>
                            }
                        />
                    </Card>
                </Col>
            </Row>

            {/* Goals Tabs */}
            <Card className="shadow-sm mb-6">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    className="goals-tabs"
                >
                    <TabPane tab={`Active Goals (${activeGoals.length})`} key="active">
                        {activeGoals.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {activeGoals.map(goal => (
                                    <Col xs={24} md={12} lg={8} key={goal.id}>
                                        <Card
                                            className="goal-card h-full"
                                            hoverable
                                            actions={[
                                                <Tooltip title="Add Contribution">
                                                    <Button
                                                        type="text"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => handleAddContribution(goal.id)}
                                                    >
                                                        Add Funds
                                                    </Button>
                                                </Tooltip>,
                                                <Tooltip title="Edit Goal">
                                                    <Button
                                                        type="text"
                                                        icon={<EditOutlined />}
                                                        onClick={() => showModal(goal.id)}
                                                    />
                                                </Tooltip>,
                                                <Tooltip title="Delete Goal">
                                                    <Button
                                                        type="text"
                                                        icon={<DeleteOutlined />}
                                                        danger
                                                        onClick={() => handleDelete(goal.id)}
                                                    />
                                                </Tooltip>,
                                            ]}
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="p-2.5 rounded-full bg-blue-100 text-blue-600 mr-3">
                                                    {iconMap[goal.icon] || <RocketOutlined />}
                                                </div>
                                                <div>
                                                    <Title level={5} className="mb-0">{goal.name}</Title>
                                                    <Tag color="blue">{goal.category}</Tag>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <Text>{formatCurrency(goal.currentAmount)}</Text>
                                                    <Text type="secondary">of {formatCurrency(goal.targetAmount)}</Text>
                                                </div>
                                                <Progress
                                                    percent={getProgressPercent(goal.currentAmount, goal.targetAmount)}
                                                    status={
                                                        getProgressPercent(goal.currentAmount, goal.targetAmount) >= 100
                                                            ? "success"
                                                            : "active"
                                                    }
                                                />
                                            </div>

                                            <div className="text-sm text-gray-500 flex justify-between">
                                                <span>Target date: {goal.deadline}</span>
                                                {goal.autoContribution.amount > 0 && (
                                                    <Tooltip title={`Auto-contributing ${formatCurrency(goal.autoContribution.amount)} ${goal.autoContribution.frequency}`}>
                                                        <span className="text-green-600 font-semibold">Auto-saving</span>
                                                    </Tooltip>
                                                )}
                                            </div>

                                            {goal.notes && (
                                                <div className="mt-3 text-sm text-gray-600">
                                                    <Paragraph ellipsis={{ rows: 2 }} className="mb-0">
                                                        {goal.notes}
                                                    </Paragraph>
                                                </div>
                                            )}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Empty
                                description="No active savings goals"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => showModal()}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Create Your First Goal
                                </Button>
                            </Empty>
                        )}
                    </TabPane>

                    <TabPane tab={`Completed Goals (${completedGoals.length})`} key="completed">
                        {completedGoals.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {completedGoals.map(goal => (
                                    <Col xs={24} md={12} lg={8} key={goal.id}>
                                        <Card className="goal-card h-full border-green-200" hoverable>
                                            <div className="absolute top-2 right-2">
                                                <Tag color="success" icon={<TrophyOutlined />}>
                                                    Completed!
                                                </Tag>
                                            </div>
                                            <div className="flex items-center mb-4 pt-6">
                                                <div className="p-2.5 rounded-full bg-green-100 text-green-600 mr-3">
                                                    {iconMap[goal.icon] || <RocketOutlined />}
                                                </div>
                                                <div>
                                                    <Title level={5} className="mb-0">{goal.name}</Title>
                                                    <Tag color="blue">{goal.category}</Tag>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <div className="flex justify-between mb-2">
                                                    <Text>{formatCurrency(goal.currentAmount)}</Text>
                                                    <Text type="secondary">of {formatCurrency(goal.targetAmount)}</Text>
                                                </div>
                                                <Progress percent={100} status="success" />
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                <span>Completed on: {goal.contributions.slice(-1)[0]?.date || 'N/A'}</span>
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <Empty
                                description="No completed goals yet"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                    </TabPane>
                </Tabs>
            </Card>

            {/* Recent Activity */}
            {savingGoals.length > 0 && (
                <Card
                    title="Recent Contributions"
                    className="shadow-sm"
                    extra={<Button type="link">View All</Button>}
                >
                    <List
                        dataSource={
                            savingGoals
                                .flatMap(goal =>
                                    goal.contributions.map(contrib => ({
                                        ...contrib,
                                        goalName: goal.name,
                                        goalIcon: goal.icon
                                    }))
                                )
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .slice(0, 5)
                        }
                        renderItem={item => (
                            <List.Item>
                                <div className="flex items-center w-full">
                                    <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                                        {iconMap[item.goalIcon] || <BankOutlined />}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between">
                                            <Text strong>Contribution to {item.goalName}</Text>
                                            <Text className="text-green-600">+{formatCurrency(item.amount)}</Text>
                                        </div>
                                        <Text type="secondary">{item.date}</Text>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>
            )}

            {/* Add/Edit Goal Modal */}
            <Modal
                title={editingGoalId ? "Edit Savings Goal" : "Create New Savings Goal"}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        icon: 'rocket',
                        currentAmount: 0,
                        autoContributionAmount: 0,
                        autoContributionFrequency: 'none',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Goal Name"
                        rules={[{ required: true, message: 'Please enter a name for your goal' }]}
                    >
                        <Input placeholder="e.g., Vacation Fund, New Car, etc." />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="Icon"
                    >
                        <Select>
                            <Option value="bank"><BankOutlined /> Emergency Fund</Option>
                            <Option value="car"><CarOutlined /> Vehicle</Option>
                            <Option value="home"><HomeOutlined /> Home</Option>
                            <Option value="global"><GlobalOutlined /> Travel</Option>
                            <Option value="gift"><GiftOutlined /> Gift</Option>
                            <Option value="heart"><HeartOutlined /> Wedding/Event</Option>
                            <Option value="book"><BookOutlined /> Education</Option>
                            <Option value="trophy"><TrophyOutlined /> Achievement</Option>
                        </Select>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="targetAmount"
                                label="Target Amount"
                                rules={[{ required: true, message: 'Please enter target amount' }]}
                            >
                                <InputNumber
                                    min={1}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/\$\s?|(,*)/g, '') : 1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="currentAmount"
                                label="Initial Contribution"
                                tooltip="Amount you've already saved toward this goal"
                            >
                                <InputNumber
                                    min={1}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/\$\s?|(,*)/g, '') : 1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="deadline"
                        label="Target Date"
                        rules={[{ required: true, message: 'Please select a target date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select placeholder="Select a category">
                            <Option value="Travel">Travel</Option>
                            <Option value="Vehicle">Vehicle</Option>
                            <Option value="Home">Home/Housing</Option>
                            <Option value="Emergency">Emergency Fund</Option>
                            <Option value="Education">Education</Option>
                            <Option value="Event">Event</Option>
                            <Option value="Retirement">Retirement</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Divider orientation="left">Auto-Contributions</Divider>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="autoContributionAmount"
                                label="Amount"
                                tooltip="Set up automatic contributions to this goal"
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/\$\s?|(,*)/g, '') : 0}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="autoContributionFrequency"
                                label="Frequency"
                            >
                                <Select>
                                    <Option value="none">None</Option>
                                    <Option value="weekly">Weekly</Option>
                                    <Option value="biweekly">Bi-weekly</Option>
                                    <Option value="monthly">Monthly</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="notes"
                        label="Notes (Optional)"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Additional details about this goal..."
                        />
                    </Form.Item>

                    <Form.Item className="mb-0 text-right">
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
                            {editingGoalId ? 'Update Goal' : 'Create Goal'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Saving;