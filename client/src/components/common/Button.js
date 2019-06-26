import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return (
            <button
                className='button-root-container'
                onClick={this.props.onClick}
                type={this.props.type}
            >
                <p className='button-text'>{this.props.text}</p>
            </button>
        );
    }
}

export { Button }