import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
    Login,
    Dashboard,
    ExpenseAnalyzer,
    Manage,
    Settings,
    Statement,
} from '../pages';
import { LayoutWrapper } from '../components';
import NotFound from './NotFound';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const RouterConfig = ({ openModal, expenseData }) => {
    const user = useSelector(state => state.user);
    console.log(user)
    if(!user.loggedIn) {
        return <Login />
    }

    return (
        <LayoutWrapper openModal={openModal}>
            <Routes>
                <Route path="/" element={<Dashboard openModal={openModal} expenseData={expenseData} />} />
                <Route path="/expenseAnalyzer" element={<ExpenseAnalyzer />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/statements" element={<Statement />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </LayoutWrapper>
    )
}

export default RouterConfig;