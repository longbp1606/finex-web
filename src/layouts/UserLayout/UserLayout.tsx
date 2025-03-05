import * as Styled from './UserLayout.styled';
import { Avatar, Button, Flex, Layout, Menu, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { useEffect, useState } from "react";
import { MdCategory, MdGridOn, MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { BsChatDots } from "react-icons/bs";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import Notification from '@/components/Notification/Notification';
import ChatAI from '@/components/ChatAI';
import { getProfile, ProfileType } from '@/services/authAPI';
import cookieUtils from '@/services/cookieUtils';
import config from '@/config';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const menuItems: MenuItemType[] = [
    { key: "budget", label: 'Budget', icon: <MdGridOn /> },
    { key: "category", label: 'Category', icon: <MdCategory /> },
    { key: "analysis", label: 'Analysis', icon: <SiGoogleanalytics /> },
    // { key: "report", label: 'Report', icon: <MdOutlineDashboard /> },
    // { key: "alert", label: 'Alert', icon: <MdCategory /> },
    { key: "chat", label: 'Chat', icon: <BsChatDots /> },
];

const UserLayout = () => {
    const navigate = useNavigate();
    const keys = location.pathname.split("/user");
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuLabel, setSelectedMenuLabel] = useState(
        menuItems.find(item => item.key === keys[1])?.label || "Budget"
    );
    const [profile, setProfile] = useState<ProfileType>();

    // Xử lý khi chọn menu
    const handleMenuSelect = (e: { key: string }) => {
        const selectedItem = menuItems.find(item => item.key === e.key);
        setSelectedMenuLabel(selectedItem?.label || "Budget");
        navigate(`/user/${e.key}`);
    };

    const fetchProfile = async () => {
        try {
            const response = await getProfile();

            if (!response.data) throw response.data;
            else {
                setProfile(response.data.data);
            }
        } catch (error: any) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <>
            <Layout className="min-h-screen">
                <Sider collapsible collapsed={collapsed} className='bg-[#ecf4e9]' trigger={null}>
                    <Flex vertical className='h-full justify-between'>
                        <Menu
                            items={menuItems}
                            selectedKeys={[keys[1]]}
                            onSelect={handleMenuSelect}
                            className='bg-[#ecf4e9]'
                        />
                        <Button
                            type='primary'
                            danger
                            onClick={() => {
                                cookieUtils.clear();
                                navigate(config.routes.public.login);
                            }}
                            style={{ padding: 20 }}
                        >
                            <MdLogout size={20} /> Logout
                        </Button>
                    </Flex>
                </Sider>
                <Layout>
                    <Header className="p-0 bg-white flex items-center px-4 justify-between">
                        <div className="flex items-center">
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{ fontSize: "16px", width: 64, height: 64 }}
                            />
                            <Title level={4} className="ml-5" style={{ marginBottom: "0px" }}>
                                {selectedMenuLabel}
                            </Title>
                        </div>

                        <Flex gap={20} align='center'>
                            <Notification />
                            <Text className='w-24 text-right'>
                                {`Welcome back, \n`}
                                <strong>{profile?.fname} {profile?.lname}</strong>
                            </Text>
                            <Avatar icon={<UserOutlined />} />
                        </Flex>
                    </Header>

                    <Content style={{ margin: '16px' }}>
                        <Styled.ContentContainer>
                            <Outlet />
                        </Styled.ContentContainer>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        FiNex ©{new Date().getFullYear()} Created by LTLN Gang
                    </Footer>
                </Layout>
            </Layout>

            {keys[1] !== "/chat" && <ChatAI />}
        </>
    );
};

export default UserLayout;
