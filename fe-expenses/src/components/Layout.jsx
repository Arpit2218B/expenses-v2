import React, { useState } from 'react'
import { Layout } from 'antd';
import '../styles/layout.css'
import Sidebar from './Sidebar';
import HeaderWrapper from './Header';

const { Content } = Layout;

const LayoutWrapper = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="layout__container">
            <Sidebar collapsed={collapsed} />
            <Layout className="site-layout">
                <HeaderWrapper collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        // padding: 24,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutWrapper;