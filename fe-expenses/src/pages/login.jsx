import React from 'react';
import { Card, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';

const Login = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if(e.target.value === 'galjonit2218') {
            dispatch(loginUser());
        }
    }

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card style={{width: '50%'}}>
                <h1>Expense Analyzer</h1>
                <Input type='password' onChange={handleChange}/>
            </Card>
        </div>
    )
}

export default Login;