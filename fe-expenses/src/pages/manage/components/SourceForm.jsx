import { Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import React from 'react';
import { createSource, getAllSources } from '../../../services';

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
};

const SourceForm = ({ data, updateData }) => {
    const [form] = Form.useForm();

    const resetFields = () => {
        form.resetFields();
    }

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

    const onFinish = async (values) => {
        let body = {...values.source};
        try {
            let res1 = await createSource(body);
            if(res1) {
                let res2 = await getAllSources();
                updateData(res2.data);
                resetFields();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <Form 
        form={form} 
        {...layout} 
        name="nest-messages" 
        onFinish={onFinish} 
        validateMessages={validateMessages}
        >
            <Form.Item
                name={['source', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['source', 'initialAmount']}
                label="Initial amount"
                rules={[
                    {
                        type: 'number',
                        min: 0
                    },
                ]}
            >
                <InputNumber style={{width: '100%'}} />
            </Form.Item>
            <Form.Item
                name={['source', 'limit']}
                label="Monthly limit"
                rules={[
                    {
                        type: 'number',
                        min: 0
                    },
                ]}
            >
                <InputNumber style={{width: '100%'}} />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                    Submit
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24, offset: 6 }}>
                <Button type="link" htmlType="button" style={{width: '100%'}} onClick={resetFields}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SourceForm;