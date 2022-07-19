import { Empty, List, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { deleteCategory } from '../../../services';

const CategoryList = ({ data, updateData }) => {
    const handleDeleteCategory = (id) => {
        let newData = data.filter(item => item._id != id);
        deleteCategory(id)
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
        style={{overflowY: 'auto', height: '100%'}}
        dataSource={data}
        renderItem={item => (
            <List.Item style={{display: 'flex'}}>
                <Typography.Text style={{flex: 3}}>{item.name}</Typography.Text>
                <Typography.Text style={{flex: 2}}>{item.type.toUpperCase()}</Typography.Text>
                <Typography.Text style={{flex: 2}}>{item.limit}</Typography.Text>
                <DeleteOutlined style={{flex: 1}} onClick={() => handleDeleteCategory(item._id)} />
            </List.Item>
        )}
        />
    );
}

export default CategoryList;