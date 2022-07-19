import React from 'react';
import { Card, Tabs } from 'antd';
import { CategoryWiseAnalysis, SnapshotComparison, SourceWiseAnalysis } from './components';
const { TabPane } = Tabs;

const ExpenseAnalyzer = () => {
    return (
        <Card>    
            <Tabs type="card">
                <TabPane tab="Category wise analysis" key="1">
                    <CategoryWiseAnalysis />
                </TabPane>
                <TabPane tab="Source wise analysis" key="2">
                    <SourceWiseAnalysis />
                </TabPane>
                <TabPane tab="Compare snapshots" key="3">
                    <SnapshotComparison />
                </TabPane>
            </Tabs>
        </Card>
    );
}

export default ExpenseAnalyzer;