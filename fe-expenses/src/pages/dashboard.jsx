import { Row, Col, Button } from 'antd';
import React from 'react';
import { 
    CategoryBreakdown,
    ExpenseChart,
    Transactions
} from '../components';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux';
import { createSnapshot } from '../services';

const Dashboard = ({ openModal, expenseData }) => {
    const user = useSelector((state) => state.user);
    return (
        <Row gutter={[16, 16]}>
            <Col span={24}>
                <Row justify='end' gutter={[16]}>
                    <Col>
                        <Button onClick={openModal}>Add transaction</Button>
                    </Col>
                    <Col>
                        <Button onClick={createSnapshot}>Snapshot</Button>
                    </Col>
                </Row>
            </Col>
            <Col span={16}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <ExpenseChart />
                    </Col>
                    <Col span={24}>
                        <Transactions openModal={openModal} expenseData={expenseData} />
                    </Col>
                </Row>
            </Col>
            <Col span={8}>
                <CategoryBreakdown />
            </Col>
        </Row>
    );
}

export default Dashboard;