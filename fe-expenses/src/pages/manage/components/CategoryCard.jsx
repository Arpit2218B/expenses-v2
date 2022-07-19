import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import { getAllCategories } from '../../../services';

const CategoryCard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAllCategories()
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    return (
        <Card 
        style={{height: '100%', maxHeight: '43vh', overflowY: 'auto'}}
        title="Categories"
        >
            <Row gutter={[48, 48]}>
                <Col span={10}>
                    <CategoryForm data={data} updateData={setData} />
                </Col>
                <Col span={14}>
                    <CategoryList data={data} updateData={setData} />
                </Col>
            </Row>            
        </Card>
    );
}

export default CategoryCard;