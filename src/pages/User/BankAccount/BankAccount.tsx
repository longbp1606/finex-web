import React, { useEffect, useState } from 'react';
import { Button, Typography, Space, Table, Tag, Modal, Form, Input, InputNumber, Select, Empty, Card, Flex, Tooltip, TableColumnsType } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BankOutlined, EyeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import * as Styled from './BankAccount.styled';
import { BankAccount as BankAccountType, CreateBankAccountRequest, UpdateBankAccountRequest } from '@/services/bankAccountAPI';
import { mockBankAccounts, mockFetchBankAccounts, mockCreateBankAccount, mockUpdateBankAccount, mockDeleteBankAccount } from './mockData';
import ConfirmDeleteModal from '@/components/DeleteModal/ConfirmDeleteModal';

const { Title, Text } = Typography;
const { Option } = Select;

const BankAccount: React.FC = () => {
    const [accounts, setAccounts] = useState<BankAccountType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editingAccount, setEditingAccount] = useState<BankAccountType | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [accountToDelete, setAccountToDelete] = useState<string>('');
    const [form] = Form.useForm();

    // Calculate total balance
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
    
    // Count active accounts
    const activeAccounts = accounts.filter(account => account.isActive).length;

    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {
            setLoading(true);
            const response = await mockFetchBankAccounts();
            if (response.data) {
                setAccounts(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching bank accounts:', error);
            toast.error('Failed to load bank accounts');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAccount = () => {
        setEditingAccount(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEditAccount = (account: BankAccountType) => {
        setEditingAccount(account);
        form.setFieldsValue({
            accountName: account.accountName,
            accountNumber: account.accountNumber,
            bankName: account.bankName,
            balance: account.balance,
            currency: account.currency,
            type: account.type,
            isActive: account.isActive
        });
        setModalVisible(true);
    };

    const handleDeleteAccount = (accountId: string) => {
        setAccountToDelete(accountId);
        setDeleteModalVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await mockDeleteBankAccount(accountToDelete);
            toast.success('Bank account deleted successfully');
            fetchAccountData();
            setDeleteModalVisible(false);
        } catch (error) {
            console.error('Error deleting bank account:', error);
            toast.error('Failed to delete bank account');
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            if (editingAccount) {
                // Update existing account
                await mockUpdateBankAccount(editingAccount.id, values as UpdateBankAccountRequest);
                toast.success('Bank account updated successfully');
            } else {
                // Create new account
                await mockCreateBankAccount(values as CreateBankAccountRequest);
                toast.success('Bank account created successfully');
            }
            setModalVisible(false);
            fetchAccountData();
        } catch (error) {
            console.error('Error saving bank account:', error);
            toast.error('Failed to save bank account');
        }
    };

    const columns: TableColumnsType<BankAccountType> = [
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
            render: (text: string, record: BankAccountType) => (
                <Space>
                    <BankOutlined />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Account Number',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
            render: (text: string) => (
                <span style={{ fontFamily: 'monospace' }}>{text}</span>
            ),
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: (balance: number, record: BankAccountType) => (
                <span style={{ fontWeight: 'bold' }}>
                    ₫{balance.toLocaleString()}
                </span>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (text: string) => (
                <Tag color="blue">{text}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (isActive: boolean) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BankAccountType) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button 
                            type="text" 
                            icon={<EditOutlined />} 
                            onClick={() => handleEditAccount(record)} 
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => handleDeleteAccount(record.id)} 
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Styled.AccountContainer>
            <Styled.AccountHeader>
                <Title level={4}>Bank Accounts</Title>
                <Button 
                    type="primary" 
                    icon={<PlusOutlined />} 
                    onClick={handleAddAccount}
                >
                    Add Account
                </Button>
            </Styled.AccountHeader>

            {/* Summary Cards */}
            <Styled.AccountGrid>
                <Styled.AccountSummaryCard className="primary" title="Total Balance">
                    <Title level={3}>₫{totalBalance.toLocaleString()}</Title>
                    <Text type="secondary">Across all accounts</Text>
                </Styled.AccountSummaryCard>
                
                <Styled.AccountSummaryCard className="secondary" title="Active Accounts">
                    <Title level={3}>{activeAccounts}</Title>
                    <Text type="secondary">Out of {accounts.length} total accounts</Text>
                </Styled.AccountSummaryCard>
            </Styled.AccountGrid>

            {/* Accounts Table */}
            {accounts.length > 0 ? (
                <Styled.AccountCard>
                    <Styled.StyledTable
                        columns={columns as TableColumnsType<unknown>}
                        dataSource={accounts} 
                        rowKey="id" 
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                    />
                </Styled.AccountCard>
            ) : (
                <Styled.EmptyStateContainer>
                    <Empty 
                        image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        description={
                            loading ? 'Loading accounts...' : 'No bank accounts found'
                        }
                    />
                    {!loading && (
                        <Button 
                            type="primary" 
                            icon={<PlusOutlined />} 
                            onClick={handleAddAccount}
                            style={{ marginTop: 16 }}
                        >
                            Add Your First Account
                        </Button>
                    )}
                </Styled.EmptyStateContainer>
            )}

            {/* Add/Edit Account Modal */}
            <Modal
                title={editingAccount ? 'Edit Bank Account' : 'Add Bank Account'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        currency: 'VND',
                        isActive: true
                    }}
                >
                    <Form.Item
                        name="accountName"
                        label="Account Name"
                        rules={[{ required: true, message: 'Please enter account name' }]}
                    >
                        <Input placeholder="e.g. Primary Checking" />
                    </Form.Item>

                    <Form.Item
                        name="bankName"
                        label="Bank Name"
                        rules={[{ required: true, message: 'Please enter bank name' }]}
                    >
                        <Input placeholder="e.g. Chase Bank" />
                    </Form.Item>

                    <Form.Item
                        name="accountNumber"
                        label="Account Number"
                        rules={[{ required: true, message: 'Please enter account number' }]}
                    >
                        <Input placeholder="e.g. XXXX-XXXX-XXXX-1234" />
                    </Form.Item>

                    <Flex gap={16}>
                        <Form.Item
                            name="balance"
                            label="Balance"
                            rules={[{ required: true, message: 'Please enter balance' }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder="0.00"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item
                            name="currency"
                            label="Currency"
                            rules={[{ required: true, message: 'Please select currency' }]}
                            style={{ flex: 1 }}
                        >
                            <Select placeholder="Select currency">
                                <Option value="USD">USD ($)</Option>
                                <Option value="VND">VND (₫)</Option>
                            </Select>
                        </Form.Item>
                    </Flex>

                    <Form.Item
                        name="type"
                        label="Account Type"
                        rules={[{ required: true, message: 'Please select account type' }]}
                    >
                        <Select placeholder="Select account type">
                            <Option value="Checking">Checking</Option>
                            <Option value="Savings">Savings</Option>
                            <Option value="Credit Card">Credit Card</Option>
                            <Option value="Investment">Investment</Option>
                            <Option value="Loan">Loan</Option>
                        </Select>
                    </Form.Item>

                    {editingAccount && (
                        <Form.Item
                            name="isActive"
                            label="Status"
                        >
                            <Select>
                                <Option value={true}>Active</Option>
                                <Option value={false}>Inactive</Option>
                            </Select>
                        </Form.Item>
                    )}

                    <Flex justify="end" gap={8}>
                        <Button onClick={() => setModalVisible(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">
                            {editingAccount ? 'Update' : 'Create'}
                        </Button>
                    </Flex>
                </Form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                visible={deleteModalVisible}
                onCancel={() => setDeleteModalVisible(false)}
                onConfirm={confirmDelete}
            />
        </Styled.AccountContainer>
    );
};

export default BankAccount;