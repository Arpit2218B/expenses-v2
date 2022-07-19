import React from 'react'
import '../styles/common.css'

const Button = ({ children, onClick, customClass }) => {
    return (
        <button className={`button ${customClass}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;