import React from 'react';
import { Row, Col } from 'antd';
import CategoryCard from './components/CategoryCard';
import SourcesCard from './components/SourcesCard';

const Manage = () => {
    return (
        <Row style={{height: '100%'}} gutter={[16, 16]}>
            <Col span={24}>
                <SourcesCard />
            </Col>
            <Col span={24}>
                <CategoryCard />
            </Col>
        </Row>
    );
}

export default Manage;