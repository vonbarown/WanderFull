import React from 'react'

const Button = ({value, handleChange}) => (
    <button
    value={value}
    onClick ={handleChange}>{value}</button>
)

export default Button