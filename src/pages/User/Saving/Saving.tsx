import React, { useState, useEffect } from 'react';
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
    Tag,
    Alert
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
    bankAccountId?: string;
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
    bankAccountId?: string;
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
    bankAccountId?: string;
}

const Saving = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm<FormValues>();
    const [editingGoalId, setEditingGoalId] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<string>('active');
    const [bankAccounts, setBankAccounts] = useState<any[]>([]);
    const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);

    // Fetch bank accounts
    useEffect(() => {
        const getBankAccounts = async () => {
            try {
                // Import mock data from BankAccount module
                const { mockBankAccounts } = await import('../BankAccount/mockData');

                // Filter bank accounts to only show Savings type accounts
                const savingsAccounts = mockBankAccounts.filter(account =>
                    account.type === 'Savings' && account.isActive
                );

                setBankAccounts(savingsAccounts);
            } catch (error) {
                console.error('Error fetching bank accounts:', error);
                // Fallback to empty array if import fails
                setBankAccounts([]);
            }
        };

        getBankAccounts();
    }, []);

    // Import mock data and functions
    const [savingGoals, setSavingGoals] = useState<SavingGoal[]>([]);
    
    // Fetch saving goals
    useEffect(() => {
        const fetchSavingGoals = async () => {
            try {
                // Import mock data and functions from mockData
                const { mockFetchSavingGoals } = await import('./mockData');
                
                // Fetch all saving goals
                const response = await mockFetchSavingGoals();
                setSavingGoals(response.data.data);
            } catch (error) {
                console.error('Error fetching saving goals:', error);
                // Fallback to empty array if import fails
                setSavingGoals([]);
            }
        };
        
        fetchSavingGoals();
    }, []);
    
    // Effect to filter goals when bank account is selected
    useEffect(() => {
        const fetchGoalsByBankAccount = async () => {
            if (selectedBankAccountId) {
                try {
                    // Import mock function
                    const { mockFetchSavingGoalsByBankAccountId } = await import('./mockData');
                    
                    // Fetch goals filtered by bank account
                    const response = await mockFetchSavingGoalsByBankAccountId(selectedBankAccountId);
                    setSavingGoals(response.data.data);
                } catch (error) {
                    console.error('Error fetching goals by bank account:', error);
                }
            } else {
                // If no bank account is selected, fetch all goals
                try {
                    const { mockFetchSavingGoals } = await import('./mockData');
                    const response = await mockFetchSavingGoals();
                    setSavingGoals(response.data.data);
                } catch (error) {
                    console.error('Error fetching all goals:', error);
                }
            }
        };
        
        fetchGoalsByBankAccount();
    }, [selectedBankAccountId]);

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
                    bankAccountId: goal.bankAccountId,
                });
            }
        } else {
            form.resetFields();
            // Pre-select the currently selected bank account when creating a new goal
            if (selectedBankAccountId) {
                form.setFieldsValue({
                    bankAccountId: selectedBankAccountId
                });
            }
        }

        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async (values: FormValues): Promise<void> => {
        // Ensure bankAccountId is set - use selected account if not specified in form
        const goalBankAccountId = values.bankAccountId || selectedBankAccountId;

        if (!goalBankAccountId) {
            Modal.error({
                title: 'Bank Account Required',
                content: 'Please select a savings account for this goal.',
            });
            return;
        }

        try {
            // Import mock functions
            const { mockCreateSavingGoal, mockUpdateSavingGoal } = await import('./mockData');
            
            // Prepare goal data
            const goalData = {
                name: values.name,
                icon: values.icon,
                targetAmount: values.targetAmount,
                currentAmount: values.currentAmount || 0,
                deadline: values.deadline?.format('YYYY-MM-DD') || '',
                category: values.category,
                notes: values.notes || '',
                autoContribution: {
                    amount: values.autoContributionAmount || 0,
                    frequency: values.autoContributionFrequency || 'none'
                },
                bankAccountId: goalBankAccountId
            };

            if (editingGoalId) {
                // Edit existing goal
                await mockUpdateSavingGoal(editingGoalId, goalData);
            } else {
                // Add new goal
                await mockCreateSavingGoal(goalData);
            }
            
            // Refresh the goals list
            if (selectedBankAccountId) {
                const { mockFetchSavingGoalsByBankAccountId } = await import('./mockData');
                const response = await mockFetchSavingGoalsByBankAccountId(selectedBankAccountId);
                setSavingGoals(response.data.data);
            } else {
                const { mockFetchSavingGoals } = await import('./mockData');
                const response = await mockFetchSavingGoals();
                setSavingGoals(response.data.data);
            }

            setIsModalVisible(false);
        } catch (error) {
            console.error('Error saving goal:', error);
            Modal.error({
                title: 'Error',
                content: 'Failed to save the goal. Please try again.'
            });
        }
    }

    // Delete goal handler
    const handleDelete = (goalId: number): void => {
        Modal.confirm({
            title: 'Are you sure you want to delete this savings goal?',
            content: 'This action cannot be undone.',
            okText: 'Yes, delete it',
            okType: 'danger',
            cancelText: 'Cancel',
            async onOk() {
                try {
                    // Import mock delete function
                    const { mockDeleteSavingGoal } = await import('./mockData');
                    
                    // Delete the goal
                    await mockDeleteSavingGoal(goalId);
                    
                    // Refresh the goals list
                    if (selectedBankAccountId) {
                        const { mockFetchSavingGoalsByBankAccountId } = await import('./mockData');
                        const response = await mockFetchSavingGoalsByBankAccountId(selectedBankAccountId);
                        setSavingGoals(response.data.data);
                    } else {
                        const { mockFetchSavingGoals } = await import('./mockData');
                        const response = await mockFetchSavingGoals();
                        setSavingGoals(response.data.data);
                    }
                } catch (error) {
                    console.error('Error deleting goal:', error);
                    Modal.error({
                        title: 'Error',
                        content: 'Failed to delete the goal. Please try again.'
                    });
                }
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
                            prefix="đ"
                            min={1}
                            style={{ width: '100%' }}
                            id="contributionAmount"
                        />
                    </Form.Item>
                </Form>
            ),
            okText: 'Add',
            cancelText: 'Cancel',
            async onOk() {
                const contributionAmountElement = document.getElementById('contributionAmount') as HTMLInputElement;
                const contributionAmount = parseFloat(contributionAmountElement.value);

                if (!isNaN(contributionAmount) && contributionAmount > 0) {
                    try {
                        // Get the goal to find its bank account ID
                        const goal = savingGoals.find(g => g.id === goalId);
                        if (!goal) return;
                        
                        // Import mock add contribution function
                        const { mockAddContribution } = await import('./mockData');
                        
                        // Add the contribution
                        await mockAddContribution(goalId, contributionAmount, goal.bankAccountId);
                        
                        // Refresh the goals list
                        if (selectedBankAccountId) {
                            const { mockFetchSavingGoalsByBankAccountId } = await import('./mockData');
                            const response = await mockFetchSavingGoalsByBankAccountId(selectedBankAccountId);
                            setSavingGoals(response.data.data);
                        } else {
                            const { mockFetchSavingGoals } = await import('./mockData');
                            const response = await mockFetchSavingGoals();
                            setSavingGoals(response.data.data);
                        }
                        
                        // Refresh bank accounts to reflect the updated balance
                        const getBankAccounts = async () => {
                            try {
                                // Import mock data from BankAccount module
                                const { mockBankAccounts } = await import('../BankAccount/mockData');

                                // Filter bank accounts to only show Savings type accounts
                                const savingsAccounts = mockBankAccounts.filter(account =>
                                    account.type === 'Savings' && account.isActive
                                );

                                setBankAccounts(savingsAccounts);
                            } catch (error) {
                                console.error('Error fetching bank accounts:', error);
                                // Fallback to empty array if import fails
                                setBankAccounts([]);
                            }
                        };
                        
                        await getBankAccounts();
                    } catch (error) {
                        console.error('Error adding contribution:', error);
                        Modal.error({
                            title: 'Error',
                            content: 'Failed to add contribution. Please try again.'
                        });
                    }
                }
            }
        });
    };

    // Calculate total savings based on selected bank account
    const totalSavings = selectedBankAccountId
        ? savingGoals.filter(goal => goal.bankAccountId === selectedBankAccountId).reduce((sum, goal) => sum + goal.currentAmount, 0)
        : 0;
    const totalTarget = selectedBankAccountId
        ? savingGoals.filter(goal => goal.bankAccountId === selectedBankAccountId).reduce((sum, goal) => sum + goal.targetAmount, 0)
        : 0;

    // Filter goals by status
    const activeGoals = savingGoals.filter(goal => goal.status === 'active');
    const completedGoals = savingGoals.filter(goal => goal.status === 'completed');
    const allGoals = savingGoals; // All goals regardless of status

    // Use filtered goals when a bank account is selected
    // Filter active and completed goals from filtered goals
    const initialFilteredActiveGoals = selectedBankAccountId
        ? savingGoals.filter(goal => goal.status === 'active' && goal.bankAccountId === selectedBankAccountId)
        : [];
    const initialFilteredCompletedGoals = selectedBankAccountId
        ? savingGoals.filter(goal => goal.status === 'completed' && goal.bankAccountId === selectedBankAccountId)
        : [];
    const initialFilteredAllGoals = selectedBankAccountId
        ? savingGoals.filter(goal => goal.bankAccountId === selectedBankAccountId)
        : [];
        
    const displayedActiveGoals = selectedBankAccountId ? initialFilteredActiveGoals : activeGoals;
    const displayedCompletedGoals = selectedBankAccountId ? initialFilteredCompletedGoals : completedGoals;
    const displayedAllGoals = selectedBankAccountId ? initialFilteredAllGoals : allGoals;

    // Calculate progress percentage for each goal
    const getProgressPercent = (current: number, target: number): number =>
        Math.min(100, Math.round((current / target) * 100));

    // Helper to format currency
    const formatCurrency = (amount: number): string => {
        return `₫${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    // Filter goals by selected bank account
    const filteredGoals = selectedBankAccountId
        ? savingGoals.filter(goal => goal.bankAccountId === selectedBankAccountId)
        : [];

    // Filter active and completed goals from filtered goals
    const filteredActiveGoals = filteredGoals.filter(goal => goal.status === 'active');
    const filteredCompletedGoals = filteredGoals.filter(goal => goal.status === 'completed');

    // Get selected bank account name
    const selectedBankAccount = bankAccounts.find(account => account.id === selectedBankAccountId);

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
                    disabled={!selectedBankAccountId}
                >
                    Add New Goal
                </Button>
            </div>

            {/* Bank Account Selection */}
            <Card className="shadow-sm mb-6">
                <div className="flex items-center">
                    <BankOutlined className="text-xl mr-3 text-blue-500" />
                    <Text strong className="mr-4">Select Savings Account:</Text>
                    <Select
                        placeholder="Select a savings account to view goals"
                        style={{ width: 400 }}
                        value={selectedBankAccountId}
                        onChange={setSelectedBankAccountId}
                        className="flex-grow"
                    >
                        {bankAccounts.map(account => (
                            <Option key={account.id} value={account.id}>
                                {account.accountName} ({account.bankName}) - {account.balance.toLocaleString()} {account.currency}
                            </Option>
                        ))}
                    </Select>
                </div>

                {!selectedBankAccountId && (
                    <Alert
                        message="Please select a savings account to view your goals"
                        type="info"
                        showIcon
                        className="mt-4"
                    />
                )}

                {selectedBankAccountId && selectedBankAccount && (
                    <div className="mt-4">
                        <Text type="secondary">Showing savings goals for: </Text>
                        <Text strong className="text-blue-600">{selectedBankAccount.accountName} ({selectedBankAccount.bankName})</Text>
                    </div>
                )}
            </Card>

            {/* Summary Statistics */}
            <Row gutter={[16, 16]} className="mb-6">
                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                        {selectedBankAccountId ? (
                            <Statistic
                                title={<Text strong className="text-lg">Total Savings</Text>}
                                value={totalSavings}
                                precision={0}
                                valueStyle={{ color: '#3f8600', fontSize: '2rem' }}
                                prefix="₫"
                                suffix={
                                    <Tooltip title="Total amount saved across all goals in this account">
                                        <InfoCircleOutlined className="ml-2 text-gray-400 text-xl" />
                                    </Tooltip>
                                }
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-4">
                                <Text strong className="text-lg mb-2">Total Savings</Text>
                                <Text type="secondary">Select a bank account to view</Text>
                            </div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                        {selectedBankAccountId ? (
                            <>
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
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-4">
                                <Text strong className="text-lg mb-2">Overall Progress</Text>
                                <Text type="secondary">Select a bank account to view</Text>
                            </div>
                        )}
                    </Card>
                </Col>

                <Col xs={24} md={8}>
                    <Card className="shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                        {selectedBankAccountId ? (
                            <Statistic
                                title={<Text strong className="text-lg">Active Goals</Text>}
                                value={filteredActiveGoals.length}
                                valueStyle={{ fontSize: '2rem' }}
                                suffix={
                                    <Text type="secondary" className="text-base ml-1">/ {filteredGoals.length} total</Text>
                                }
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full py-4">
                                <Text strong className="text-lg mb-2">Active Goals</Text>
                                <Text type="secondary">Select a bank account to view</Text>
                            </div>
                        )}
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
                    <TabPane tab={selectedBankAccountId ? `All Goals (${initialFilteredAllGoals.length})` : "All Goals"} key="all">
                        {selectedBankAccountId && initialFilteredAllGoals.length === 0 ? (
                            <Empty
                                description="No savings goals for this account"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => showModal()}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Create New Goal
                                </Button>
                            </Empty>
                        ) : !selectedBankAccountId ? (
                            <Alert
                                message="Please select a savings account above to view your goals"
                                type="info"
                                showIcon
                            />
                        ) : displayedAllGoals.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {displayedAllGoals.map(goal => (
                                    <Col xs={24} md={12} lg={8} key={goal.id}>
                                        <Card
                                            className={`goal-card h-full ${goal.status === 'completed' ? 'border-green-200' : ''}`}
                                            hoverable
                                            actions={goal.status === 'active' ? [
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
                                            ] : []}
                                        >
                                            {goal.status === 'completed' && (
                                                <div className="absolute top-2 right-2">
                                                    <Tag color="success" icon={<TrophyOutlined />}>
                                                        Completed!
                                                    </Tag>
                                                </div>
                                            )}
                                            <div className={`flex items-center mb-4 ${goal.status === 'completed' ? 'pt-6' : ''}`}>
                                                <div className={`p-2.5 rounded-full ${goal.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'} mr-3`}>
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
                                                        goal.status === 'completed' || getProgressPercent(goal.currentAmount, goal.targetAmount) >= 100
                                                            ? "success"
                                                            : "active"
                                                    }
                                                />
                                            </div>

                                            <div className="text-sm text-gray-500 flex justify-between">
                                                {goal.status === 'completed' ? (
                                                    <span>Completed on: {goal.contributions.slice(-1)[0]?.date || 'N/A'}</span>
                                                ) : (
                                                    <>
                                                        <span>Target date: {goal.deadline}</span>
                                                        {goal.autoContribution.amount > 0 && (
                                                            <Tooltip title={`Auto-contributing ${formatCurrency(goal.autoContribution.amount)} ${goal.autoContribution.frequency}`}>
                                                                <span className="text-green-600 font-semibold">Auto-saving</span>
                                                            </Tooltip>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {goal.notes && goal.status === 'active' && (
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
                                description="No savings goals"
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
                    
                    <TabPane tab={selectedBankAccountId ? `Active Goals (${filteredActiveGoals.length})` : "Active Goals"} key="active">
                        {selectedBankAccountId && filteredActiveGoals.length === 0 ? (
                            <Empty
                                description="No active savings goals for this account"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => showModal()}
                                    className="bg-blue-500 hover:bg-blue-600"
                                >
                                    Create New Goal
                                </Button>
                            </Empty>
                        ) : !selectedBankAccountId ? (
                            <Alert
                                message="Please select a savings account above to view your goals"
                                type="info"
                                showIcon
                            />
                        ) : displayedActiveGoals.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {displayedActiveGoals.map(goal => (
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

                    <TabPane tab={selectedBankAccountId ? `Completed Goals (${filteredCompletedGoals.length})` : "Completed Goals"} key="completed">
                        {selectedBankAccountId && filteredCompletedGoals.length === 0 ? (
                            <Empty
                                description="No completed savings goals for this account"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : !selectedBankAccountId ? (
                            <Alert
                                message="Please select a savings account above to view your goals"
                                type="info"
                                showIcon
                            />
                        ) : displayedCompletedGoals.length > 0 ? (
                            <Row gutter={[16, 16]}>
                                {displayedCompletedGoals.map(goal => (
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
            {(selectedBankAccountId ? filteredGoals.length > 0 : savingGoals.length > 0) && (
                <Card
                    title="Recent Contributions"
                    className="shadow-sm"
                    extra={<Button type="link">View All</Button>}
                >
                    <List
                        dataSource={
                            (selectedBankAccountId ? filteredGoals : savingGoals)
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
                                    formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/₫\s?|(,*)/g, '') : 1}
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
                                    formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/₫\s?|(,*)/g, '') : 1}
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
                                    formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: string | undefined) => value ? value.replace(/₫\s?|(,*)/g, '') : 0}
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

                    <Form.Item
                        name="bankAccountId"
                        label="Savings Account"
                        tooltip="Select the savings account to associate with this goal"
                        rules={[{ required: true, message: 'Please select a savings account for this goal' }]}
                    >
                        <Select placeholder="Select a savings account">
                            {bankAccounts.map(account => (
                                <Option key={account.id} value={account.id}>
                                    {account.accountName} ({account.bankName}) - {account.balance.toLocaleString()} {account.currency}
                                </Option>
                            ))}
                        </Select>
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