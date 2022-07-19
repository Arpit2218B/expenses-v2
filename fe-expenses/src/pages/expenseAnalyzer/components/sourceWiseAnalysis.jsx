import { Empty, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { analyseBySource } from '../../../services';
import './style.css';

const FILTERS = [
    {
        name: 'Last month',
        value: 0
    },
    {
        name: 'Last 3 months',
        value: 3
    },
    {
        name: 'Last 6 months',
        value: 6
    },
    {
        name: 'Last year',
        value: 12
    },
]

const SourceWiseAnalysis = () => {
    const [data, updateData] = useState([]);
    const [timeFrame, setTimeFrame] = useState(0);

    useEffect(() => {
        analyseBySource(timeFrame)
            .then(res => updateData(res.data.data))
            .catch(err => console.log(err));
    }, [timeFrame])

    return (
        <>
            <div>
                <p>Filter</p>
                <Select onChange={(e) => setTimeFrame(e)} style={{width: '150px'}} defaultValue={FILTERS[0].value}>
                    {FILTERS.map(category => (
                        <Select.Option 
                        value={category.value}>
                            {category.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            {data.length == 0 ? <Empty /> : (
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>
                    {data.map(d => (
                        <tr>
                            <td>{d._id}</td>
                            <td>{d.amount}</td>
                        </tr>
                    ))}
                </table>
            )}
        </>
    )
}

export default SourceWiseAnalysis;