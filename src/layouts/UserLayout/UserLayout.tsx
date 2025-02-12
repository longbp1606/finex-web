import * as Styled from './UserLayout.styled';
import { Button, Layout, Menu, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { MdCategory, MdGridOn, MdOutlineDashboard } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { BsRecordBtn } from "react-icons/bs";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const menuItems: MenuItemType[] = [
    { key: "dashboard", label: 'Dashboard', icon: <MdOutlineDashboard /> },
    { key: "transaction", label: 'Transaction', icon: <MdGridOn /> },
    { key: "category", label: 'Category', icon: <SiGoogleanalytics /> },
    { key: "report", label: 'Report', icon: <BsRecordBtn /> },
    { key: "alert", label: 'Alert', icon: <MdCategory /> },
];

const UserLayout = () => {
    const navigate = useNavigate();
    const keys = location.pathname.split("/user");
    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuLabel, setSelectedMenuLabel] = useState(
        menuItems.find(item => item.key === keys[1])?.label || "Dashboard"
    );

    // Xử lý khi chọn menu
    const handleMenuSelect = (e: { key: string }) => {
        const selectedItem = menuItems.find(item => item.key === e.key);
        setSelectedMenuLabel(selectedItem?.label || "Dashboard");
        navigate(`/user/${e.key}`);
    };

    return (
        <Layout className="min-h-screen">
            <Sider collapsible collapsed={collapsed} className='bg-[#ecf4e9]' trigger={null}>
                <div className="demo-logo-vertical" />
                <Menu
                    items={menuItems}
                    selectedKeys={[keys[1]]}
                    onSelect={handleMenuSelect}
                    className='bg-[#ecf4e9]'
                />
            </Sider>
            <Layout>
                <Header className='p-0 bg-white flex items-center px-4'>
                    {/* Button Toggle Sidebar */}
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                    {/* Tên Menu Đang Chọn */}
                    <Title level={4} className="ml-5" style={{marginBottom: "0px"}}>{selectedMenuLabel}</Title>
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
    );
};

export default UserLayout;
