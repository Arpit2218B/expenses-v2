import React from 'react'
import { Link, useLocation, useHistory, useNavigate } from 'react-router-dom';
import '../styles/layout.css'
import {
    DashboardOutlined,
    RadarChartOutlined,
    SnippetsOutlined,
    WalletOutlined,
    SettingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

const MENU = [
    {
        key: '1',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        location: '/',
    },
    {
        key: '2',
        icon: <RadarChartOutlined />,
        label: 'Expense Analyzer',
        location: '/expenseAnalyzer',
    },
    {
        key: '3',
        icon: <SnippetsOutlined />,
        label: 'Statements',
        location: '/statements',
    },
    {
        key: '4',
        icon: <WalletOutlined />,
        label: 'Manage',
        location: '/manage',
    },
    // {
    //     key: '5',
    //     icon: <SettingOutlined />,
    //     label: 'Settings',
    //     location: '/settings',
    // },
]

const Sidebar = ({ collapsed }) => {
    const navigate = useNavigate();

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                {collapsed ? 'E' : 'EXPENSES'}
            </div>
            <Menu
                mode="inline"
                theme='dark'
                defaultSelectedKeys={['1']}
                items={MENU}
                onClick={(item, key) => navigate(MENU[Number(item.key)-1].location)}
            />
        </Sider>
    );
};

export default Sidebar;