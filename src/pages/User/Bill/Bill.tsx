import React, { useState } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Table,
    Tag,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    DatePicker,
    Tooltip,
    Badge
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ThunderboltOutlined,
    WifiOutlined,
    HomeOutlined,
    CloudOutlined,
    MobileOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Option } = Select;

// Define bill types
interface Bill {
    id: number;
    name: string;
    category: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'upcoming' | 'overdue';
    icon: React.ReactNode;
}

const Bill: React.FC = () => {
    // State for bills
    const [bills, setBills] = useState<Bill[]>([
        {
            id: 1,
            name: 'Electricity',
            category: 'Utilities',
            amount: 145.80,
            dueDate: '2025-03-20',
            status: 'upcoming',
            icon: <ThunderboltOutlined />
        },
        {
            id: 2,
            name: 'Internet',
            category: 'Utilities',
            amount: 79.99,
            dueDate: '2025-03-15',
            status: 'upcoming',
            icon: <WifiOutlined />
        },
        {
            id: 3,
            name: 'Water',
            category: 'Utilities',
            amount: 68.25,
            dueDate: '2025-03-05',
            status: 'overdue',
            icon: <CloudOutlined />
        },
        {
            id: 4,
            name: 'Rent',
            category: 'Housing',
            amount: 1500.00,
            dueDate: '2025-03-01',
            status: 'paid',
            icon: <HomeOutlined />
        },
        {
            id: 5,
            name: 'Mobile Phone',
            category: 'Utilities',
            amount: 95.50,
            dueDate: '2025-03-22',
            status: 'upcoming',
            icon: <MobileOutlined />
        },
    ]);

    // State for modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBill, setEditingBill] = useState<Bill | null>(null);
    const [form] = Form.useForm();

    // Calculate totals
    const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const unpaidBills = bills.filter(bill => bill.status !== 'paid')
        .reduce((sum, bill) => sum + bill.amount, 0);

    // Table columns
    const columns: ColumnsType<Bill> = [
        {
            title: 'Bill',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconColor(record.category)}`}>
                        {record.icon}
                    </div>
                    <span>{record.name}</span>
                </div>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount.toFixed(2)}`,
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (date) => formatDueDate(date),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'blue';
                let icon = <ClockCircleOutlined />;

                if (status === 'paid') {
                    color = 'green';
                    icon = <CheckCircleOutlined />;
                } else if (status === 'overdue') {
                    color = 'red';
                    icon = <WarningOutlined />;
                }

                return (
                    <Tag color={color} icon={icon}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div className="flex space-x-2">
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        icon={record.status === 'paid' ? <CheckCircleOutlined /> : <CheckCircleOutlined />}
                        size="small"
                        type={record.status === 'paid' ? "default" : "primary"}
                        onClick={() => markAsPaid(record.id)}
                        disabled={record.status === 'paid'}
                    >
                        {record.status === 'paid' ? 'Paid' : 'Pay'}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    />
                </div>
            ),
        },
    ];

    // Helper functions
    const getIconColor = (category: string): string => {
        switch (category) {
            case 'Utilities': return 'bg-blue-100 text-blue-600';
            case 'Housing': return 'bg-purple-100 text-purple-600';
            case 'Insurance': return 'bg-green-100 text-green-600';
            case 'Subscription': return 'bg-orange-100 text-orange-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const formatDueDate = (dateStr: string): JSX.Element => {
        const dueDate = dayjs(dateStr);
        const today = dayjs();
        const diffDays = dueDate.diff(today, 'day');

        let text = dueDate.format('MMM D, YYYY');
        let tooltipText = '';

        if (diffDays < 0) {
            tooltipText = `Overdue by ${Math.abs(diffDays)} days`;
        } else if (diffDays === 0) {
            tooltipText = 'Due today!';
        } else if (diffDays <= 7) {
            tooltipText = `Due in ${diffDays} days`;
        }

        return tooltipText ? (
            <Tooltip title={tooltipText}>
                <span className={diffDays < 0 ? 'text-red-500' : diffDays <= 7 ? 'text-orange-500' : ''}>
                    {text}
                </span>
            </Tooltip>
        ) : (
            <span>{text}</span>
        );
    };

    // Modal functions
    const showModal = () => {
        setEditingBill(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (bill: Bill) => {
        setEditingBill(bill);
        form.setFieldsValue({
            ...bill,
            dueDate: dayjs(bill.dueDate)
        });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSave = (values: any) => {
        const newBill = {
            ...values,
            dueDate: values.dueDate.format('YYYY-MM-DD'),
            status: dayjs(values.dueDate).isBefore(dayjs(), 'day') ? 'overdue' : 'upcoming',
            id: editingBill ? editingBill.id : Math.max(0, ...bills.map(b => b.id)) + 1,
            icon: getIconForCategory(values.category)
        };

        if (editingBill) {
            setBills(bills.map(bill => bill.id === editingBill.id ? newBill : bill));
        } else {
            setBills([...bills, newBill]);
        }

        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this bill?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setBills(bills.filter(bill => bill.id !== id));
            }
        });
    };

    const markAsPaid = (id: number) => {
        setBills(bills.map(bill =>
            bill.id === id ? { ...bill, status: 'paid' as const } : bill
        ));
    };

    const getIconForCategory = (category: string): React.ReactNode => {
        switch (category) {
            case 'Utilities': return <ThunderboltOutlined />;
            case 'Housing': return <HomeOutlined />;
            case 'Internet': return <WifiOutlined />;
            case 'Water': return <CloudOutlined />;
            case 'Phone': return <MobileOutlined />;
            default: return <HomeOutlined />;
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Title level={2}>Bills & Payments</Title>
                    <Text type="secondary">Manage your recurring bills and payment schedules</Text>
                </div>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                >
                    Add New Bill
                </Button>
            </div>

            {/* Summary Cards */}
            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <Card>
                        <Tooltip title="Total value of all bills">
                            <div>
                                <Text type="secondary">Total Monthly Bills</Text>
                                <Title level={3}>${totalBills.toFixed(2)}</Title>
                            </div>
                        </Tooltip>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Tooltip title="Bills that need to be paid">
                            <div>
                                <Text type="secondary">Unpaid Bills</Text>
                                <Title level={3}>${unpaidBills.toFixed(2)}</Title>
                            </div>
                        </Tooltip>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Tooltip title="Bills due within the next 7 days">
                            <div>
                                <Text type="secondary">Due Soon</Text>
                                <Title level={3}>
                                    <Badge count={bills.filter(bill =>
                                        bill.status === 'upcoming' &&
                                        dayjs(bill.dueDate).diff(dayjs(), 'day') <= 7
                                    ).length} />
                                </Title>
                            </div>
                        </Tooltip>
                    </Card>
                </Col>
            </Row>

            {/* Bill Table */}
            <Card className="shadow-sm">
                <Table
                    columns={columns}
                    dataSource={bills}
                    rowKey="id"
                    pagination={false}
                />
            </Card>

            {/* Add/Edit Bill Modal */}
            <Modal
                title={editingBill ? "Edit Bill" : "Add New Bill"}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{ category: 'Utilities' }}
                >
                    <Form.Item
                        name="name"
                        label="Bill Name"
                        rules={[{ required: true, message: 'Please enter bill name' }]}
                    >
                        <Input placeholder="e.g., Electricity Bill" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Option value="Utilities">Utilities</Option>
                            <Option value="Housing">Housing</Option>
                            <Option value="Insurance">Insurance</Option>
                            <Option value="Subscription">Subscription</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: 'Please enter amount' }]}
                    >
                        <InputNumber
                            min={0.01}
                            step={0.01}
                            prefix="$"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="dueDate"
                        label="Due Date"
                        rules={[{ required: true, message: 'Please select due date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <div className="flex justify-end gap-2">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {editingBill ? 'Update' : 'Add'} Bill
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Bill;