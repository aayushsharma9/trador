import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    render() {
        const { value, onChange, label, type } = this.props;

        return (
            <div className='input-field-container'>
                <input
                    className='input-field'
                    required
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                <label className='input-label'>{label}</label>
            </div>
        );
    }
}

export { Input };