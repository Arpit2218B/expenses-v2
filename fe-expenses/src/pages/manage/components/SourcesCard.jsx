import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import CategoryList from './CategoryList';
import SourceForm from './SourceForm';
import SourceList from './SourceList';
import { getAllSources } from '../../../services';

const data = [
    {
        name: 'PayTM',
        initialAmount: 5060,
        limit: 4000,
        id: 'a'
    },
    {
        name: 'PayTM',
        initialAmount: 5060,
        limit: 4000,
        id: 'b'
    },
    {
        name: 'PayTM',
        initialAmount: 5060,
        limit: 4000,
        id: 'c'
    },
    {
        name: 'PayTM',
        initialAmount: 5060,
        limit: 4000,
        id: 'd'
    },
];

const SourcesCard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllSources()
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return (
        <Card 
        style={{height: '100%', maxHeight: '43vh', overflowY: 'auto'}}
        title="Sources"
        >
            <Row gutter={[48, 48]}>
                <Col span={10}>
                    <SourceForm data={data} updateData={setData} />
                </Col>
                <Col span={14}>
                    <SourceList data={data} updateData={setData} />
                </Col>
            </Row>
        </Card>
    );
}

export default SourcesCard;