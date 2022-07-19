import React, { useEffect, useState } from 'react'
import {
    Form,
    Input,
    Select,
    Switch,
    InputNumber,
    Button
} from 'antd';
import { createTransaction, getAllCategories, getAllSources, getAllTransactions } from '../services'

const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 20,
    },
};

const TransactionForm = ({ handleOk }) => {
    const [form] = Form.useForm();
    const [data, setData] = useState({});

    const [categories, updateCategories] = useState([]);
    const [sources, updateSources] = useState([]);

    useEffect(() => {
        getAllCategories()
        .then(res => updateCategories(res.data))
        .catch(err => console.log(err));

        getAllSources()
        .then(res => updateSources(res.data))
        .catch(err => console.log(err));
    }, []);

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = (values) => {
        let body = {...values.transaction};
        console.log(body);
        body.category = JSON.parse(body.category);
        body.source = JSON.parse(body.source);
        if(body.destination)
            body.destination = JSON.parse(body.destination);
        createTransaction(body)
        .then(res => handleOk())
        .catch(err => console.log(err));
    };

    return (
        <Form 
        onFieldsChange={() => setData(form.getFieldsValue())} 
        form={form} 
        {...layout} 
        name="nest-messages" 
        onFinish={onFinish} 
        validateMessages={validateMessages}
        >
            <Form.Item
                name={['transaction', 'category']}
                label="Category"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select>
                    {categories.map(category => (
                        <Select.Option value={JSON.stringify(category)}>{category.name}</Select.Option>
                    ))}
                    <Select.Option value="transfer">Transfer</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name={['transaction', 'source']}
                label="Source"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select>
                    {sources.map(source => (
                        <Select.Option value={JSON.stringify(source)}>{source.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name={['transaction', 'destination']}
                label="To account"
                // hidden={data?.transaction?.category !== 'transfer'}
            >
                <Select>
                    {sources.map(source => (
                        <Select.Option value={JSON.stringify(source)}>{source.name}</Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name={['transaction', 'amount']}
                label="Amount"
                rules={[
                    {
                        type: 'number',
                        min: 0,
                        required: true,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item label="Is split" name={['transaction', 'splitted']}>
                <Switch />
            </Form.Item>
            <Form.Item
                name={['transaction', 'splitAmount']}
                label="Split Amount"
                hidden={!data?.transaction?.splitted}
                rules={[
                    {
                        type: 'number',
                        min: 0,
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item name={['transaction', 'description']} label="Description">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 5 }}>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default TransactionForm;