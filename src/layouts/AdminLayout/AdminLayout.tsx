import * as Styled from './AdminLayout.styled';
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd"
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { MdOutlineCategory } from "react-icons/md";

const { Header, Content, Footer, Sider } = Layout;

const menuItems: MenuItemType[] = [
    {
        key: "dashboard",
        label: 'Dashboard',
        icon: <MdOutlineCategory />,
    },
    {
        key: "systemCategory",
        label: 'System Category',
        icon: <MdOutlineCategory />,
    },
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
                        selectedKeys={keys.slice(1)}
                        onSelect={(e) => navigate(`/admin/${e.key}`)}
                        className='bg-[#ecf4e9]'
                    />
                </Sider>
                <Layout>
                    <Header className='p-0 bg-white'>
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