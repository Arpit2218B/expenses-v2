import { Button, Card, Col, Empty, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { analyseByCategory, getAllSnapshots } from '../../../services';
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

const SnapshotComparison = () => {
    const [data, updateData] = useState([]);
    const [timeFrame, setTimeFrame] = useState(0);
    const [compare, setCompare] = useState({
        c1: null,
        c2: null
    });
    const [c2, setC2] = useState({});
    const [compareBoxMessage, updateCompareBoxMessage] = useState('Select snapshots to compare');

    const handleCompareClick = (val) => {
        let obj = { ...compare };
        if (obj.c1 === null) {
            obj.c1 = val;
        }
        else if (obj.c2 === null) {
            obj.c2 = val;
        }
        setCompare(obj);
    }

    useEffect(() => {
        let newMessage = 'Select snapshots to compare';
        if (compare.c1 !== null && compare.c2 === null) {
            newMessage = `Comparing ${compare.c1.date} with _____________`;
        }
        else if (compare.c2 !== null) {
            newMessage = `Comparing ${compare.c1.date} with ${compare.c2.date}`;
        }
        updateCompareBoxMessage(newMessage);
    }, [compare])

    useEffect(() => {
        let arr = [];
        let obj2 = {};
        compare?.c2?.snap.forEach(element => {
            obj2[element._id] = {name: element.name, amount: element.initialAmount}
        });
        setC2(obj2);
    }, [compare])

    useEffect(() => {
        getAllSnapshots()
            .then(res => updateData(res.data))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <Row gutter={[32, 32]}>
                <Col span={8}>
                    {data.length == 0 ? <Empty /> : (
                        <>
                            <table>
                                <tr>
                                    <th>Snapshots</th>
                                    <th></th>
                                </tr>
                                {data.map(d => (
                                    <tr>
                                        <td>{d.date}</td>
                                        <td>
                                            <Button
                                                disabled={compare.c1?._id === d._id || compare.c2?._id === d._id}
                                                onClick={() => handleCompareClick(d)}
                                                >
                                                {(compare.c1?._id === d._id || compare.c2?._id === d._id) ? 'Comparing' : compare.c1 === null ? 'Select for compare' : 'Compare With'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </table>
                            <br />
                            <Button type='primary' onClick={() => setCompare({ c1: null, c2: null })}>Reset comparison</Button>
                        </>
                    )}
                </Col>
                <Col span={16}>
                    {compare.c1 == null || compare.c2 === null ? <Empty description={compareBoxMessage} /> : (
                        <Card>
                            <>
                                <h3>{compareBoxMessage}</h3>
                                <table>
                                    <tr>
                                        <th>Source</th>
                                        <th>{compare.c1.date}</th>
                                        <th>{compare.c2.date}</th>
                                    </tr>
                                    {compare?.c1?.snap.map(d => (
                                        <tr>
                                            <td>{d.name}</td>
                                            <td>
                                                {d.initialAmount}
                                            </td>
                                            <td>
                                                {c2[d._id].amount}
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </>
                        </Card>
                    )}
                </Col>
            </Row>

        </>
    )
}

export default SnapshotComparison;