import React, { useEffect, useState } from 'react';
import { Button, Space, Modal, Form, DatePicker, message, Select, Card, Row, Col, Statistic, Tag, Tooltip } from 'antd';
import { EditOutlined, ReloadOutlined, StopOutlined, InfoCircleOutlined } from '@ant-design/icons';
import CTable from '@/components/Table/CTable';
import {
  getAllUserSubscriptions,
  getUserSubscriptionStatistics,
  updateUserSubscription,
  cancelUserSubscription,
  renewUserSubscription,
  UserSubscriptionResponse,
  UserSubscriptionStatistics,
  UserSubscriptionUpdateRequest
} from '@/services/adminUserSubscriptionAPI';
import dayjs from 'dayjs';

const { Option } = Select;

const UserSubscription: React.FC = () => {
  // State for user subscriptions
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptionResponse[]>([]);
  const [statistics, setStatistics] = useState<UserSubscriptionStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statsLoading, setStatsLoading] = useState<boolean>(false);
  
  // Filter states
  const [filters, setFilters] = useState<{
    active?: boolean;
    subscriptionId?: string;
    accountId?: string;
    paymentStatus?: string;
  }>({});
  
  // Edit modal states
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [editingSubscription, setEditingSubscription] = useState<UserSubscriptionResponse | null>(null);
  const [form] = Form.useForm();
  
  // Renew modal states
  const [renewModalVisible, setRenewModalVisible] = useState<boolean>(false);
  const [renewingSubscription, setRenewingSubscription] = useState<UserSubscriptionResponse | null>(null);
  const [renewForm] = Form.useForm();

  // Fetch user subscriptions
  const fetchUserSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await getAllUserSubscriptions(filters);
      if (response.data) {
        setUserSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
      message.error('Failed to fetch user subscriptions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch subscription statistics
  const fetchStatistics = async () => {
    setStatsLoading(true);
    try {
      const response = await getUserSubscriptionStatistics();
      if (response.data) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Error fetching subscription statistics:', error);
      message.error('Failed to fetch subscription statistics');
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSubscriptions();
    fetchStatistics();
  }, []);

  useEffect(() => {
    fetchUserSubscriptions();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key: string, value: any) => {
    if (value === undefined || value === null || value === '') {
      const newFilters = { ...filters };
      delete newFilters[key as keyof typeof filters];
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({});
  };

  // Handle edit subscription
  const showEditModal = (subscription: UserSubscriptionResponse) => {
    setEditingSubscription(subscription);
    form.setFieldsValue({
      expiryDate: dayjs(subscription.expiryDate),
      active: subscription.active,
      paymentStatus: subscription.paymentStatus.toLowerCase(),
    });
    setEditModalVisible(true);
  };

  // Handle edit form submission
  const handleEditSubmit = async (values: any) => {
    if (!editingSubscription) return;
    
    try {
      const updateData: UserSubscriptionUpdateRequest = {
        expiryDate: values.expiryDate.toISOString(),
        active: values.active,
        paymentStatus: values.paymentStatus,
      };
      
      await updateUserSubscription(editingSubscription.id, updateData);
      message.success('User subscription updated successfully');
      setEditModalVisible(false);
      fetchUserSubscriptions();
    } catch (error) {
      console.error('Error updating user subscription:', error);
      message.error('Failed to update user subscription');
    }
  };

  // Handle cancel subscription
  const handleCancel = (subscription: UserSubscriptionResponse) => {
    Modal.confirm({
      title: 'Cancel Subscription',
      content: `Are you sure you want to cancel the subscription for account ${subscription.accountId}?`,
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelUserSubscription(subscription.id);
          message.success('Subscription cancelled successfully');
          fetchUserSubscriptions();
        } catch (error) {
          console.error('Error cancelling subscription:', error);
          message.error('Failed to cancel subscription');
        }
      },
    });
  };

  // Handle renew subscription
  const showRenewModal = (subscription: UserSubscriptionResponse) => {
    setRenewingSubscription(subscription);
    renewForm.resetFields();
    setRenewModalVisible(true);
  };

  // Handle renew form submission
  const handleRenewSubmit = async (values: any) => {
    if (!renewingSubscription) return;
    
    try {
      await renewUserSubscription(renewingSubscription.id, values.monthsToAdd);
      message.success('Subscription renewed successfully');
      setRenewModalVisible(false);
      fetchUserSubscriptions();
    } catch (error) {
      console.error('Error renewing subscription:', error);
      message.error('Failed to renew subscription');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 220,
      ellipsis: true,
    },
    {
      title: 'Account ID',
      dataIndex: 'accountId',
      key: 'accountId',
      width: 220,
      ellipsis: true,
    },
    {
      title: 'Subscription',
      key: 'subscription',
      render: (_: string, record: UserSubscriptionResponse) => (
        <span>{record.subscription.name}</span>
      ),
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date: string) => {
        const expiryDate = dayjs(date);
        const isExpired = expiryDate.isBefore(dayjs());
        const isExpiringSoon = !isExpired && expiryDate.diff(dayjs(), 'day') <= 30;
        
        return (
          <span style={{ color: isExpired ? 'red' : isExpiringSoon ? 'orange' : 'inherit' }}>
            {expiryDate.format('MMM DD, YYYY')}
            {isExpired && (
              <Tooltip title="Subscription has expired">
                <InfoCircleOutlined style={{ marginLeft: 8, color: 'red' }} />
              </Tooltip>
            )}
            {isExpiringSoon && (
              <Tooltip title="Subscription will expire soon">
                <InfoCircleOutlined style={{ marginLeft: 8, color: 'orange' }} />
              </Tooltip>
            )}
          </span>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => {
        let color = 'default';
        switch (status.toLowerCase()) {
          case 'completed':
            color = 'green';
            break;
          case 'pending':
            color = 'gold';
            break;
          case 'cancelled':
            color = 'red';
            break;
          case 'failed':
            color = 'volcano';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: UserSubscriptionResponse) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => showEditModal(record)}
            title="Edit Subscription"
          />
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={() => showRenewModal(record)}
            title="Renew Subscription"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
          />
          <Button 
            type="primary" 
            danger 
            icon={<StopOutlined />} 
            onClick={() => handleCancel(record)}
            title="Cancel Subscription"
            disabled={!record.active}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Card loading={statsLoading}>
            <Statistic 
              title="Total Subscriptions" 
              value={statistics?.totalSubscriptions || 0} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={statsLoading}>
            <Statistic 
              title="Active Subscriptions" 
              value={statistics?.activeSubscriptions || 0} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={statsLoading}>
            <Statistic 
              title="Expired Subscriptions" 
              value={statistics?.expiredSubscriptions || 0} 
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={statsLoading}>
            <Statistic 
              title="Expiring Soon" 
              value={statistics?.expiringSubscriptions || 0} 
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginBottom: 16, padding: 16, backgroundColor: '#f5f5f5', borderRadius: 8 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6} lg={5}>
            <Select
              placeholder="Filter by Status"
              style={{ width: '100%' }}
              allowClear
              onChange={(value) => handleFilterChange('active', value)}
              value={filters.active}
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} lg={5}>
            <Select
              placeholder="Filter by Payment Status"
              style={{ width: '100%' }}
              allowClear
              onChange={(value) => handleFilterChange('paymentStatus', value)}
              value={filters.paymentStatus}
            >
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="failed">Failed</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={12} lg={14} style={{ textAlign: 'right' }}>
            <Button onClick={resetFilters} style={{ marginRight: 8 }}>
              Reset Filters
            </Button>
            <Button type="primary" onClick={fetchUserSubscriptions}>
              Refresh
            </Button>
          </Col>
        </Row>
      </div>

      <CTable 
        columns={columns} 
        dataSource={userSubscriptions} 
        loading={loading}
        rowKey="id"
      />

      {/* Edit Subscription Modal */}
      <Modal
        title="Edit User Subscription"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true, message: 'Please select expiry date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="active"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentStatus"
            label="Payment Status"
            rules={[{ required: true, message: 'Please select payment status' }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="failed">Failed</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Update
            </Button>
            <Button onClick={() => setEditModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Renew Subscription Modal */}
      <Modal
        title="Renew User Subscription"
        open={renewModalVisible}
        onCancel={() => setRenewModalVisible(false)}
        footer={null}
      >
        <Form
          form={renewForm}
          layout="vertical"
          onFinish={handleRenewSubmit}
          initialValues={{ monthsToAdd: 1 }}
        >
          <Form.Item
            name="monthsToAdd"
            label="Months to Add"
            rules={[{ required: true, message: 'Please enter months to add' }]}
          >
            <Select>
              <Option value={1}>1 Month</Option>
              <Option value={3}>3 Months</Option>
              <Option value={6}>6 Months</Option>
              <Option value={12}>12 Months</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Renew
            </Button>
            <Button onClick={() => setRenewModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserSubscription;