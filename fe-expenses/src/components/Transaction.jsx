import React, { useEffect, useState } from 'react'
import { Button, Card, Empty } from 'antd';
import '../styles/Transactions.css';
import { getAllTransactions } from '../services';
import { dateUtil } from '../utils/stringUtils';

const Transactions = ({ openModal, expenseData }) => {

    return (
        <Card className="transactions">
            <div className="transactions__header">
                <h2>Recent transactions</h2>
                <Button onClick={openModal}>Add transaction</Button>
            </div>
            {expenseData.length == 0 ? <Empty /> : (
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    {expenseData.map(transaction => (
                        <tr>
                            <td>{dateUtil(transaction.date)}</td>
                            <td>{transaction.source.name}</td>
                            <td>{transaction.category.name}</td>
                            <td>{transaction.tag == 'CREDITED' ?
                                `+${transaction.amount}` : `-${transaction.amount}`}</td>
                            <td>{transaction.description}</td>
                        </tr>
                    ))}
                </table>
            )}
        </Card>
    )
}

export default Transactions;