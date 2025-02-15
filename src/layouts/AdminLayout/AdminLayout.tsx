import * as Styled from './AdminLayout.styled';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Typography } from "antd"
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { MdOutlineCategory } from "react-icons/md";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const menuItems: MenuItemType[] = [
    {
        key: "dashboard",
        label: 'Dashboard',
        icon: <MdOutlineCategory />,
    },
    // {
    //     key: "systemCategory",
    //     label: 'System Category',
    //     icon: <MdOutlineCategory />,
    // },
    {
        key: "account",
        label: 'Account',
        icon: <MdOutlineCategory />,
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