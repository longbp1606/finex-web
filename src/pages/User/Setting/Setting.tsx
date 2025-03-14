import React, { useState } from 'react';
import {
  Layout,
  Card,
  Tabs,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Divider,
  Typography,
  Avatar,
  Row,
  Col,
  Upload,
  notification
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  DollarOutlined,
  GlobalOutlined,
  FileOutlined,
  UploadOutlined,
  SaveOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

const { Title, Text } = Typography;
const { Option } = Select;

const Setting: React.FC = () => {
  // State for profile form
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  // Mock user data
  const initialUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    currency: 'USD',
    language: 'en-US',
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: true,
    billReminders: true
  };

  // Handle form submission
  const handleProfileSubmit = (values: any) => {
    console.log('Profile updated:', values);
    notification.success({
      message: 'Profile Updated',
      description: 'Your profile information has been updated successfully.'
    });
  };

  const handleSecuritySubmit = (values: any) => {
    console.log('Security settings updated:', values);
    notification.success({
      message: 'Security Settings Updated',
      description: 'Your security settings have been updated successfully.'
    });
    securityForm.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
  };

  const handleNotificationSubmit = (values: any) => {
    console.log('Notification settings updated:', values);
    notification.success({
      message: 'Notification Settings Updated',
      description: 'Your notification preferences have been saved.'
    });
  };

  const handlePreferencesSubmit = (values: any) => {
    console.log('Preferences updated:', values);
    notification.success({
      message: 'Preferences Updated',
      description: 'Your app preferences have been updated successfully.'
    });
  };

  // Handle file upload
  const handleFileChange = (info: any) => {
    const newFileList = [...info.fileList];
    setFileList(newFileList.slice(-1)); // Keep only the latest file
    
    if (info.file.status === 'done') {
      notification.success({
        message: 'Upload successful',
        description: 'Your profile picture has been updated.'
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: 'Upload failed',
        description: 'There was an error uploading your profile picture.'
      });
    }
  };

  // Tab items
  const tabItems: TabsProps['items'] = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          Profile
        </span>
      ),
      children: (
        <Card bordered={false} className="profile-card">
          <Form
            form={profileForm}
            layout="vertical"
            initialValues={initialUserData}
            onFinish={handleProfileSubmit}
          >
            <div className="mb-6 flex justify-center">
              <div className="text-center">
                <Avatar 
                  size={100} 
                  icon={<UserOutlined />} 
                  src={fileList.length > 0 ? fileList[0].thumbUrl : undefined}
                  className="mb-3"
                />
                <div>
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    fileList={fileList}
                    onChange={handleFileChange}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Placeholder endpoint
                  >
                    <Button icon={<UploadOutlined />}>Change Picture</Button>
                  </Upload>
                </div>
              </div>
            </div>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              name="phone"
              label="Phone Number"
            >
              <Input />
            </Form.Item>
            
            <Divider />
            <div className="flex justify-end">
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Card>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <LockOutlined />
          Security
        </span>
      ),
      children: (
        <Card bordered={false}>
          <Form
            form={securityForm}
            layout="vertical"
            onFinish={handleSecuritySubmit}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please enter your current password' }]}
            >
              <Input.Password />
            </Form.Item>
            
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                { required: true, message: 'Please enter your new password' },
                { min: 8, message: 'Password must be at least 8 characters' }
              ]}
            >
              <Input.Password />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('The two passwords do not match');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            
            <Divider />
            
            <Form.Item
              name="twoFactor"
              valuePropName="checked"
              className="mb-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Two-Factor Authentication</Text>
                  <div>
                    <Text type="secondary">Add an extra layer of security to your account</Text>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </Form.Item>
            
            <Divider />
            <div className="flex justify-end">
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Update Password
              </Button>
            </div>
          </Form>
        </Card>
      ),
    },
    {
      key: 'notifications',
      label: (
        <span>
          <BellOutlined />
          Notifications
        </span>
      ),
      children: (
        <Card bordered={false}>
          <Form
            form={notificationForm}
            layout="vertical"
            initialValues={initialUserData}
            onFinish={handleNotificationSubmit}
          >
            <Form.Item
              name="emailNotifications"
              valuePropName="checked"
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Email Notifications</Text>
                  <div>
                    <Text type="secondary">Receive account updates and alerts via email</Text>
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
            
            <Form.Item
              name="pushNotifications"
              valuePropName="checked"
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Push Notifications</Text>
                  <div>
                    <Text type="secondary">Receive notifications on your devices</Text>
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
            
            <Form.Item
              name="weeklyReport"
              valuePropName="checked"
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Weekly Financial Reports</Text>
                  <div>
                    <Text type="secondary">Get weekly summaries of your financial activity</Text>
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
            
            <Form.Item
              name="billReminders"
              valuePropName="checked"
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Bill Payment Reminders</Text>
                  <div>
                    <Text type="secondary">Get notified before bills are due</Text>
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
            
            <Divider />
            <div className="flex justify-end">
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Save Notification Settings
              </Button>
            </div>
          </Form>
        </Card>
      ),
    },
    {
      key: 'preferences',
      label: (
        <span>
          <GlobalOutlined />
          Preferences
        </span>
      ),
      children: (
        <Card bordered={false}>
          <Form
            form={preferencesForm}
            layout="vertical"
            initialValues={initialUserData}
            onFinish={handlePreferencesSubmit}
          >
            <Form.Item
              name="language"
              label="Language"
              className="mb-6"
            >
              <Select>
                <Option value="en-US">English (US)</Option>
                <Option value="es-ES">Spanish (Spain)</Option>
                <Option value="fr-FR">French</Option>
                <Option value="de-DE">German</Option>
                <Option value="ja-JP">Japanese</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="currency"
              label="Default Currency"
              className="mb-6"
            >
              <Select>
                <Option value="USD">USD - US Dollar</Option>
                <Option value="EUR">EUR - Euro</Option>
                <Option value="GBP">GBP - British Pound</Option>
                <Option value="JPY">JPY - Japanese Yen</Option>
                <Option value="CAD">CAD - Canadian Dollar</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="darkMode"
              valuePropName="checked"
              className="mb-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Dark Mode</Text>
                  <div>
                    <Text type="secondary">Use dark theme for the application</Text>
                  </div>
                </div>
                <Switch />
              </div>
            </Form.Item>
            
            <Divider />
            <div className="flex justify-end">
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Save Preferences
              </Button>
            </div>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <Layout className="p-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto w-full">
        <Title level={2} className="mb-6">Settings</Title>
        
        <Tabs 
          defaultActiveKey="profile" 
          items={tabItems}
          animated={{ inkBar: true, tabPane: false }}
          className="settings-tabs"
        />
      </div>
    </Layout>
  );
};

export default Setting;