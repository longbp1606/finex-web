import * as Styled from './UserLayout.styled';
import { Button, Layout, Menu } from "antd"
import { MenuItemType } from "antd/es/menu/interface";
import { useState } from "react";
import { MdCategory, MdGridOn, MdOutlineDashboard } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { BsRecordBtn } from "react-icons/bs";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const menuItems: MenuItemType[] = [
    {
        key: "dashboard",
        label: 'Dashboard',
        icon: <MdOutlineDashboard />,
    },
    {
        key: "transaction",
        label: 'Transaction',
        icon: <MdGridOn />,
    },
    {
        key: "category",
        label: 'Category',
        icon: <SiGoogleanalytics />,
    },
    {
        key: "report",
        label: 'Report',
        icon: <BsRecordBtn />,
    },
    {
        key: "alert",
        label: 'Alert',
        icon: <MdCategory />,
    },
]

const UserLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const keys = location.pathname.split("/user");

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
                        onSelect={(e) => navigate(`/user/${e.key}`)}
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

export default UserLayout