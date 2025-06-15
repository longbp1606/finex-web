import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography, Tag, Divider, Modal, message, Tabs, Spin, Empty } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, ShoppingCartOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getAllSubscriptions, SubscriptionResponse } from '@/services/subscriptionAPI';
import { 
  purchaseSubscription, 
  getAllUserSubscriptions, 
  cancelUserSubscription, 
  renewUserSubscription,
  UserSubscriptionResponse 
} from '@/services/userSubscriptionAPI';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const Subscription: React.FC = () => {
  // State for available subscriptions
  const [availableSubscriptions, setAvailableSubscriptions] = useState<SubscriptionResponse[]>([]);
  
  // State for user's subscriptions
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptionResponse[]>([]);
  
  // Loading states
  const [loadingAvailable, setLoadingAvailable] = useState<boolean>(true);
  const [loadingUserSubs, setLoadingUserSubs] = useState<boolean>(true);
  
  // Modal state for purchase confirmation
  const [purchaseModalVisible, setPurchaseModalVisible] = useState<boolean>(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionResponse | null>(null);
  
  // Fetch available subscriptions
  const fetchAvailableSubscriptions = async () => {
    setLoadingAvailable(true);
    try {
      const response = await getAllSubscriptions(true); // Only get active subscriptions
      if (response.data) {
        setAvailableSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching available subscriptions:', error);
      message.error('Failed to fetch available subscriptions');
    } finally {
      setLoadingAvailable(false);
    }
  };

  // Fetch user's subscriptions
  const fetchUserSubscriptions = async () => {
    setLoadingUserSubs(true);
    try {
      const response = await getAllUserSubscriptions();
      if (response.data) {
        setUserSubscriptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
      message.error('Failed to fetch your subscriptions');
    } finally {
      setLoadingUserSubs(false);
    }
  };

  useEffect(() => {
    fetchAvailableSubscriptions();
    fetchUserSubscriptions();
  }, []);

  // Handle purchase subscription
  const handlePurchase = (subscription: SubscriptionResponse) => {
    setSelectedSubscription(subscription);
    setPurchaseModalVisible(true);
  };

  // Confirm purchase subscription
  const confirmPurchase = async () => {
    if (!selectedSubscription) return;
    
    try {
      await purchaseSubscription({
        subscriptionId: selectedSubscription.id,
        // expiryDate is optional, will default to 1 month from purchase date
      });
      message.success('Subscription purchased successfully');
      fetchUserSubscriptions(); // Refresh user subscriptions
      setPurchaseModalVisible(false);
    } catch (error) {
      console.error('Error purchasing subscription:', error);
      message.error('Failed to purchase subscription');
    }
  };

  // Handle cancel subscription
  const handleCancel = async (subscriptionId: string) => {
    Modal.confirm({
      title: 'Cancel Subscription',
      content: 'Are you sure you want to cancel this subscription? You will lose access to premium features.',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelUserSubscription(subscriptionId);
          message.success('Subscription cancelled successfully');
          fetchUserSubscriptions(); // Refresh user subscriptions
        } catch (error) {
          console.error('Error cancelling subscription:', error);
          message.error('Failed to cancel subscription');
        }
      },
    });
  };

  // Handle renew subscription
  const handleRenew = async (subscriptionId: string) => {
    Modal.confirm({
      title: 'Renew Subscription',
      content: 'Are you sure you want to renew this subscription?',
      okText: 'Yes, Renew',
      okType: 'primary',
      cancelText: 'No',
      onOk: async () => {
        try {
          await renewUserSubscription(subscriptionId);
          message.success('Subscription renewed successfully');
          fetchUserSubscriptions(); // Refresh user subscriptions
        } catch (error) {
          console.error('Error renewing subscription:', error);
          message.error('Failed to renew subscription');
        }
      },
    });
  };

  // Render subscription card
  const renderSubscriptionCard = (subscription: SubscriptionResponse) => {
    const isActive = subscription.active;
    
    return (
      <Col xs={24} sm={12} md={8} key={subscription.id}>
        <Card 
          hoverable 
          className="subscription-card"
          style={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ 
            backgroundColor: '#18453E', 
            margin: '-24px -24px 16px', 
            padding: '16px 24px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Title level={3} style={{ color: 'white', margin: 0 }}>{subscription.name}</Title>
          </div>
          
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ marginTop: 0 }}>
              {subscription.price} {subscription.currencyUnit}
              <Text type="secondary" style={{ fontSize: '14px' }}> / month</Text>
            </Title>
            
            <Paragraph>
              {subscription.description || 'No description available'}
            </Paragraph>
            
            <Divider />
            
            <Paragraph>
              <Text strong>Valid Period: </Text>
              {dayjs(subscription.startDate).format('MMM DD, YYYY')} - {dayjs(subscription.endDate).format('MMM DD, YYYY')}
            </Paragraph>
            
            <div style={{ marginTop: '16px' }}>
              {isActive ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
              ) : (
                <Tag color="error" icon={<CloseCircleOutlined />}>Inactive</Tag>
              )}
            </div>
          </div>
          
          <div style={{ marginTop: '16px' }}>
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              onClick={() => handlePurchase(subscription)}
              disabled={!isActive}
              block
            >
              Purchase
            </Button>
          </div>
        </Card>
      </Col>
    );
  };

  // Render user subscription card
  const renderUserSubscriptionCard = (subscription: UserSubscriptionResponse) => {
    const isActive = subscription.active;
    const isExpired = dayjs(subscription.expiryDate).isBefore(dayjs());
    
    return (
      <Col xs={24} sm={12} md={8} key={subscription.id}>
        <Card 
          className="user-subscription-card"
          style={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderLeft: isActive ? '4px solid #52c41a' : isExpired ? '4px solid #f5222d' : '4px solid #faad14'
          }}
        >
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            margin: '-24px -24px 16px', 
            padding: '16px 24px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Title level={4} style={{ margin: 0 }}>{subscription.subscription.name}</Title>
          </div>
          
          <div style={{ flex: 1 }}>
            <Paragraph>
              <Text strong>Price: </Text>
              {subscription.subscription.price} {subscription.subscription.currencyUnit}
            </Paragraph>
            
            <Paragraph>
              <Text strong>Purchase Date: </Text>
              {dayjs(subscription.purchaseDate).format('MMM DD, YYYY')}
            </Paragraph>
            
            <Paragraph>
              <Text strong>Expiry Date: </Text>
              {dayjs(subscription.expiryDate).format('MMM DD, YYYY')}
            </Paragraph>
            
            <Paragraph>
              <Text strong>Status: </Text>
              {isActive ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
              ) : isExpired ? (
                <Tag color="error" icon={<CloseCircleOutlined />}>Expired</Tag>
              ) : (
                <Tag color="warning" icon={<SyncOutlined spin />}>Pending</Tag>
              )}
            </Paragraph>
            
            <Paragraph>
              <Text strong>Payment Status: </Text>
              <Tag color={subscription.paymentStatus === 'COMPLETED' ? 'green' : subscription.paymentStatus === 'PENDING' ? 'orange' : 'red'}>
                {subscription.paymentStatus}
              </Tag>
            </Paragraph>
          </div>
          
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            {isActive && (
              <Button 
                danger 
                onClick={() => handleCancel(subscription.id)}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
            )}
            
            {!isActive && (
              <Button 
                type="primary" 
                onClick={() => handleRenew(subscription.id)}
                style={{ flex: 1 }}
              >
                Renew
              </Button>
            )}
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <Tabs defaultActiveKey="available">
        <TabPane 
          tab={
            <span>
              <ShoppingCartOutlined />
              Available Subscriptions
            </span>
          } 
          key="available"
        >
          {loadingAvailable ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : availableSubscriptions.length > 0 ? (
            <Row gutter={[16, 16]}>
              {availableSubscriptions.map(subscription => renderSubscriptionCard(subscription))}
            </Row>
          ) : (
            <Empty description="No subscription plans available" />
          )}
        </TabPane>
        
        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              My Subscriptions
            </span>
          } 
          key="my-subscriptions"
        >
          {loadingUserSubs ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
            </div>
          ) : userSubscriptions.length > 0 ? (
            <Row gutter={[16, 16]}>
              {userSubscriptions.map(subscription => renderUserSubscriptionCard(subscription))}
            </Row>
          ) : (
            <Empty description="You don't have any subscriptions yet" />
          )}
        </TabPane>
      </Tabs>

      {/* Purchase Confirmation Modal */}
      <Modal
        title="Confirm Subscription Purchase"
        open={purchaseModalVisible}
        onCancel={() => setPurchaseModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setPurchaseModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={confirmPurchase}>
            Confirm Purchase
          </Button>,
        ]}
      >
        {selectedSubscription && (
          <div>
            <p>You are about to purchase the following subscription:</p>
            <p><strong>Plan:</strong> {selectedSubscription.name}</p>
            <p><strong>Price:</strong> {selectedSubscription.price} {selectedSubscription.currencyUnit}</p>
            <p><strong>Description:</strong> {selectedSubscription.description || 'No description available'}</p>
            <p>
              <QuestionCircleOutlined /> This is a demo purchase and no actual payment will be processed.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Subscription;