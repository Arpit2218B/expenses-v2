import React from 'react'
import '../styles/common.css'
import { Modal } from 'antd';
import TransactionForm from './TransactionForm';

const ModalWrapper = ({ show, handleOk, handleCancel }) => {
    if(!show) return null

    return (
        <Modal title="Add new transaction" visible={show} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <TransactionForm handleOk={handleOk} />
        </Modal>
    )
}

export default ModalWrapper;