import { Form, Input, Select, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import TransactionsPage from '../components/TransactionPage';
import { getAllCategories, getAllSources } from '../services';

const layout = null;

const Statement = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        getAllCategories()
            .then(res => setCategories(res.data))
        getAllSources()
            .then(res => setSources(res.data))
    }, []);

    const onFinish = (values) => {
        setFilters(values.transaction)
    }

    return (
        <>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{display: 'flex', gap: 16}}
            >
                <Form.Item
                    style={{flex: 1.5}}
                    name={['transaction', 'startDate']}
                    label="Start date"
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name={['transaction', 'endDate']}
                    label="End date"
                    style={{flex: 1.5}}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    name={['transaction', 'category']}
                    label="Category"
                    style={{flex: 1.5}}
                >
                    <Select>
                        {categories.map(category => (
                            <Select.Option value={category._id}>{category.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={['transaction', 'source']}
                    label="Source"
                    style={{flex: 1.5}}
                >
                    <Select>
                        {sources.map(source => (
                            <Select.Option value={source._id}>{source.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item style={{flex: 1}}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Apply filter
                    </Button>
                </Form.Item>
            </Form>



            <TransactionsPage {...filters}/>
        </>
    );
}

export default Statement;