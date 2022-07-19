import React, { useEffect, useState } from 'react'
import { Button, Card, Empty } from 'antd';
import '../styles/Transactions.css';
import { getAllTransactions } from '../services';
import { dateUtil } from '../utils/stringUtils';

const TransactionsPage = ({ startDate, endDate, source, category }) => {
    let totalExpense = 0;
    const [expenseData, updateExpenseData] = useState([]);

    useEffect(() => {
        getAllTransactions(startDate, endDate, source, category)
            .then(res => updateExpenseData(res.data))
            .catch(err => console.log(err));
    }, [startDate, endDate, source, category]);

    return (
        <Card>
            {!expenseData || expenseData.length == 0 ? <Empty /> : (
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    {expenseData.map(transaction => {
                        let amount = transaction.tag == 'CREDITED' ? 1*transaction.amount : -1*transaction.amount;
                        totalExpense += amount;
                        return (
                        <tr>
                            <td>{dateUtil(transaction.date)}</td>
                            <td>{transaction.source.name}</td>
                            <td>{transaction.category.name}</td>
                            <td>{transaction.tag == 'CREDITED' ?
                                `+${transaction.amount}` : `-${transaction.amount}`}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    )
                    })}
                    <tr>
                        <td></td>
                        <td><strong>TOTAL</strong></td>
                        <td></td>
                        <td>{totalExpense}</td>
                        <td></td>
                    </tr>
                </table>
            )}
        </Card>
    )
}

export default TransactionsPage;