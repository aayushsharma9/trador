import React, { Component } from 'react';
import './Input.css';

class TextArea extends Component {
    render() {
        const { value, onChange, label, type, rows } = this.props;

        return (
            <div className='input-field-container'>
                <textarea
                    className='textarea-field'
                    required
                    rows={rows}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                <label className='input-label'>{label}</label>
            </div>
        );
    }
}

export { TextArea };