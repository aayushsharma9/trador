import React, { Component } from 'react';
import './Button.css';

class IconButton extends Component {
    render() {
        return (
            <button
                className='button-icon-style'
                onClick={this.props.onClick}
            >
                <img src={this.props.src} className='button-icon' alt='' />
            </button>
        );
    }
}

export { IconButton }