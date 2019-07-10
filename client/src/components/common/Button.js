import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    state = {
        buttonStyle: 'button-root-container',
        textStyle: 'button-text'
    }

    componentWillMount() {
        if (this.props.filled) {
            this.setState({
                buttonStyle: 'filled',
                textStyle: 'button-text light'
            })
        }
    }

    renderIcon() {
        if (this.props.image) {
            return <img src={this.props.image} className='button-image' alt='' />;
        }

        else return;
    }

    render() {
        return (
            <button
                className={this.state.buttonStyle}
                onClick={this.props.onClick}
                type={this.props.type}
            >
                {this.renderIcon()}
                <p className={this.state.textStyle}>{this.props.text}</p>
            </button>
        );
    }
}

export { Button }