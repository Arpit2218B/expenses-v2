import { Empty, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROOT } from './CONSTANTS';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Empty
        description="404 not found"
        >
            <Button type="primary" onClick={() => navigate(ROOT)}>
                Go to dashboard
            </Button>
        </Empty>
    )
}

export default NotFound;