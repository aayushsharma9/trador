import React, { Component } from 'react';
import './AuthButton.css';

class AuthButton extends Component {
    state = {
        hover: false
    }

    render() {
        const { href, width, height, backgroundColor, highlightColor, image, imageSize, text, textColor } = this.props;
        return (
            <a
                href={href}
                className='auth-button-container'
                onMouseEnter={() => { this.setState({ hover: true }) }}
                onMouseLeave={() => { this.setState({ hover: false }) }}
                style={
                    {   
                        width,
                        height,
                        backgroundColor: this.state.hover ? highlightColor : backgroundColor,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                    }
                }
            >
                <img
                    src={image}
                    className='auth-button-image'
                    style={{
                        height: imageSize,
                        width: imageSize,
                        resizeMode: 'contain',
                    }}
                    alt=''
                />
                <p className='auth-button-text' style={{ color: textColor }}>{text}</p>
            </a>
        );
    };
}

export { AuthButton };