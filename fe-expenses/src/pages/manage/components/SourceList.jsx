import { Empty, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { deleteSource } from '../../../services';

const SourceList = ({ data, updateData }) => {
    const handleDeleteSource = (id) => {
        let newData = data.filter(item => item._id != id);
        deleteSource(id)
        .then(res => {
            updateData(newData)
        })
        .catch(err => console.log('Error deleting category'));
    }
    if(!data || data?.length == 0) {
        return (
            <Empty />
        )
    }
    return (
        <List
        // bordered={true}
        dataSource={data}
        renderItem={item => (
            <List.Item style={{display: 'flex'}}>
                <Typography.Text style={{flex: 3}}>{item.name}</Typography.Text>
                <Typography.Text style={{flex: 2}}>{item.initialAmount}</Typography.Text>
                <Typography.Text style={{flex: 2}}>{item.limit}</Typography.Text>
                <DeleteOutlined style={{flex: 1}} onClick={() => handleDeleteSource(item._id)} />
            </List.Item>
        )}
        />
    );
}

export default SourceList;