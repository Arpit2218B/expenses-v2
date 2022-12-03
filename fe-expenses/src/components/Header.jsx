import React from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import '../styles/layout.css'
import { Avatar, Button, Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions';

const { Header } = Layout;

const HeaderWrapper = ({collapsed, setCollapsed}) => {
    const dispatch = useDispatch();

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                backgroundColor: '#FFF'
            }}
        >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
            })}
            <span style={{display: 'inline-flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', height: '100%', width: '90%'}}>
                <Avatar icon={<UserOutlined />}>User</Avatar>
                <span>{"John Doe"}</span>
                <Button type="primary" onClick={() => dispatch(logoutUser())}>Logout</Button>
            </span>
        </Header>
    );
};

export default HeaderWrapper;
