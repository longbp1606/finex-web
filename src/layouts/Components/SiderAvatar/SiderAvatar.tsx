import React from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Avatar, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
// import '@/components/styles/CustomSider.scss';

const { Sider } = Layout;
const { Text } = Typography;

interface SiderAvatarProps {
    collapsible: boolean;
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    children?: React.ReactNode;
    className?: string;
    trigger?: React.ReactNode;
    items: React.ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem => ({
    key,
    icon,
    children,
    label,
} as MenuItem);

const menuItems: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const SiderAvatar: React.FC<SiderAvatarProps> = ({ collapsible, collapsed, className, trigger }) => {
    const navigate = useNavigate();

    return (
        <Sider collapsible={collapsible} collapsed={collapsed} className={className} trigger={trigger}>
            <div className="demo-logo-vertical" />
            <Menu
                items={menuItems}
                selectedKeys={[]}
                onSelect={(e) => navigate(`/admin/${e.key}`)}
                className='bg-[#ecf4e9]'
            />
            <div className="sider-footer">
                <Avatar size={40} src="https://i.pravatar.cc/150?img=3" />
                {!collapsed && <Text className="user-name">John Doe</Text>}
                <div className="logout-icon">
                    <LogoutOutlined />
                </div>
            </div>
        </Sider>
    );
};

export default SiderAvatar;
