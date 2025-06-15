import React, { useEffect, useState } from 'react';
import { Button, Space, Modal, Form, Input, InputNumber, DatePicker, message, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CTable from '@/components/Table/CTable';
import { getAllSubscriptions, createSubscription, updateSubscription, deleteSubscription, toggleSubscriptionActive, SubscriptionRequest, SubscriptionResponse } from '@/services/subscriptionAPI';
import dayjs from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

const Subscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingSubscription, setEditingSubscription] = useState<SubscriptionResponse | null>(null);
  const [form] = Form.useForm();

  // Fetch subscriptions
  const fetchSubscriptions = async () => {
    setLoading(true);
    try {
      const response = await getAllSubscriptions();
      if (response.data) {
        setSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      message.error('Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Handle form submission for create/update
  const handleSubmit = async (values: any) => {
    try {
      const subscriptionData: SubscriptionRequest = {
        name: values.name,
        price: values.price,
        currencyUnit: values.currencyUnit,
        startDate: values.dateRange[0].toISOString(),
        endDate: values.dateRange[1].toISOString(),
        description: values.description,
      };

      if (editingSubscription) {
        // Update existing subscription
        await updateSubscription(editingSubscription.id, subscriptionData);
        message.success('Subscription updated successfully');
      } else {
        // Create new subscription
        await createSubscription(subscriptionData);
        message.success('Subscription created successfully');
      }

      setModalVisible(false);
      form.resetFields();
      fetchSubscriptions();
    } catch (error) {
      console.error('Error saving subscription:', error);
      message.error('Failed to save subscription');
    }
  };

  // Handle delete subscription
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this subscription?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteSubscription(id);
          message.success('Subscription deleted successfully');
          fetchSubscriptions();
        } catch (error) {
          console.error('Error deleting subscription:', error);
          message.error('Failed to delete subscription');
        }
      },
    });
  };

  // Handle toggle subscription active status
  const handleToggleActive = async (id: string) => {
    try {
      await toggleSubscriptionActive(id);
      message.success('Subscription status toggled successfully');
      fetchSubscriptions();
    } catch (error) {
      console.error('Error toggling subscription status:', error);
      message.error('Failed to toggle subscription status');
    }
  };

  // Open modal for creating/editing
  const showModal = (subscription?: SubscriptionResponse) => {
    setEditingSubscription(subscription || null);
    
    if (subscription) {
      form.setFieldsValue({
        name: subscription.name,
        price: subscription.price,
        currencyUnit: subscription.currencyUnit,
        dateRange: [dayjs(subscription.startDate), dayjs(subscription.endDate)],
        description: subscription.description,
      });
    } else {
      form.resetFields();
    }
    
    setModalVisible(true);
  };

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 220,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      key: 'price',
      render: (_: string, record: SubscriptionResponse) => (
        <span>{`${record.price} ${record.currencyUnit}`}</span>
      ),
    },
    {
      title: 'Duration',
      key: 'duration',
      render: (_: string, record: SubscriptionResponse) => (
        <span>{`${dayjs(record.startDate).format('MMM DD, YYYY')} - ${dayjs(record.endDate).format('MMM DD, YYYY')}`}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => (
        <span style={{ color: active ? 'green' : 'red' }}>
          {active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: SubscriptionResponse) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
          />
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          />
          <Switch 
            checked={record.active} 
            onChange={() => handleToggleActive(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => showModal()}
        >
          Add Subscription
        </Button>
      </div>

      <CTable 
        columns={columns} 
        dataSource={subscriptions} 
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingSubscription ? 'Edit Subscription' : 'Add Subscription'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter subscription name' }]}
          >
            <Input placeholder="Subscription name" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={0.01}
              precision={2}
              placeholder="Price"
            />
          </Form.Item>

          <Form.Item
            name="currencyUnit"
            label="Currency"
            rules={[{ required: true, message: 'Please enter currency unit' }]}
          >
            <Input placeholder="USD, EUR, etc." />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Subscription Period"
            rules={[{ required: true, message: 'Please select date range' }]}
          >
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} placeholder="Subscription description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {editingSubscription ? 'Update' : 'Create'}
            </Button>
            <Button onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Subscription;