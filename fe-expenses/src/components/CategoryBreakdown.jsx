import React, { useEffect, useState } from 'react'
import { Button, Card, Progress } from 'antd';
import {
    SortAscendingOutlined,
    SortDescendingOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import '../styles/CategoryBreakdown.css';
import { analyseByCategory } from '../services';

const CategoryBreakdown = () => {
    const [sort, updateSort] = useState();
    const [data, updateData] = useState([]);
    const [sum, updateSum] = useState(0);

    const handleSort = () => {
        if(sort)
            updateData([...data].sort((a, b) => a.amount - b.amount))
        else
            updateData([...data].sort((a, b) => b.amount - a.amount))
        updateSort(!sort)
    }

    useEffect(() => {
        analyseByCategory()
        .then(res => {
            let a = 0;
            res.data.data.forEach(e => a=a+e.amount);
            updateSum(a);
            updateData(res.data.data.sort((a, b) => a.amount - b.amount))
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <Card style={{height: '80vh'}}>
            <div className="category__header">
                <h2>All Categories</h2>
                {/* <h1>{sum}</h1> */}
            </div>
            <div className="category__metadata">
                {/* <h2 style={{color: '#3AA3E2'}}>+2.2% <span style={{fontSize: '14px', color: '#000', fontWeight: 400}}>vs last month</span></h2> */}
                <h2 style={{color: '#3AA3E2'}}>{sum} <span style={{fontSize: '14px', color: '#000', fontWeight: 400}}>spent</span></h2>
                <Button 
                onClick={handleSort}>
                    {sort ? (<>High to low <SortAscendingOutlined /></>) : (<>Low to high <SortDescendingOutlined/></>)}
                </Button>
            </div>
            <div className="category__list">
                {
                    data.map((d) => (
                        <div className="category__item">
                            <div className="category__data">
                                <span>{d?._id?.name} ({d.amount})</span>
                                <span>{d._id.limit}</span>
                            </div>
                            <Progress percent={(d.amount/d._id.limit)*100} showInfo={false}></Progress>
                        </div>
                    ))
                }
            </div>
            <div className="category__bottom">
                <Button block={true}>Download report <DownloadOutlined /> </Button>
            </div>
        </Card>
    )
}

export default CategoryBreakdown;