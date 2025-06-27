import * as Styled from './AdminLayout.styled';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Typography } from "antd"
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";
import cookieUtils from '@/services/cookieUtils';
import config from '@/config';
import { FaUsers } from "react-icons/fa";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const menuItems: MenuItemType[] = [
    {
        key: "dashboard",
        label: 'Dashboard',
        icon: <MdSpaceDashboard />,
    },
    // {
    //     key: "systemCategory",
    //     label: 'System Category',
    //     icon: <MdOutlineCategory />,
    // },
    {
        key: "account",
        label: 'Account',
        icon: <FaUsers />,
    },
    {
        key: "subscription",
        label: 'Subscription',
        icon: <RiFileList3Line />,
    },
    {
        key: "user-subscription",
        label: 'User Subscriptions',
        icon: <MdSubscriptions />,
    },
    // {
    //     key: "userAccount",
    //     label: 'User account',
    //     icon: <HomeOutlined/>,
    // },
]

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const keys = location.pathname.split("/admin");

    const [selectedMenuLabel, setSelectedMenuLabel] = useState(
        menuItems.find(item => item.key === keys[1])?.label || "Dashboard"
    );

    // Xử lý khi chọn menu
    const handleMenuSelect = (e: { key: string }) => {
        const selectedItem = menuItems.find(item => item.key === e.key);
        setSelectedMenuLabel(selectedItem?.label || "Dashboard");
        navigate(`/admin/${e.key}`);
    };

    return (
        <>
            <Layout className="min-h-screen">
                <Sider
                    collapsible
                    collapsed={collapsed}
                    className='bg-[#ecf4e9]'
                    trigger={null}
                >
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
                            style={{ padding: 20, background: '#18453E', borderRadius: 0, }}
                            className='bg-[#ecf4e9]'
                        >
                            <MdLogout size={20} /> Logout
                        </Button>
                    </Flex>
                </Sider>
                <Layout>
                    <Header className='p-0 bg-white flex items-center px-4'>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        {/* Tên Menu Đang Chọn */}
                        <Title level={4} className="ml-5" style={{ marginBottom: "0px" }}>{selectedMenuLabel}</Title>
                    </Header>
                    <Content style={{ margin: '16px' }}>
                        <Styled.ContentContainer>
                            <Outlet />
                        </Styled.ContentContainer>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        FiNex ©{new Date().getFullYear()} Created by Dunno Gang
                    </Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default AdminLayout