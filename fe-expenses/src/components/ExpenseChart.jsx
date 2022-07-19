import React, { useEffect, useState } from 'react'
import '../styles/Transactions.css';
import { Card } from 'antd';
import { getAllSources } from '../services';

const ExpenseChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllSources()
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, []);
    
    return (
        <Card style={{height: '35vh'}}>
            <div className="transactions__header">
                <h2>Current Balance</h2>
                <h3>20,345</h3>
            </div>
            <div className="source__expenses">
                {data && data.map(d => (
                    <Card key={d._id} style={{width: '150px', aspectRatio: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <h3><center>{d.name}</center></h3>
                        <h1>{d.initialAmount}</h1>
                    </Card>
                ))}
            </div>
        </Card>
    )
}

export default ExpenseChart;