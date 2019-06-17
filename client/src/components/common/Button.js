import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    state = {
        hover: false
    }

    render() {
        const { href, width, height, backgroundColor, highlightColor, image, imageSize, text, textColor } = this.props;
        return (
            <a
                href={href}
                className='button-container'
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
                    className='image'
                    style={{
                        height: imageSize,
                        width: imageSize,
                        resizeMode: 'contain',
                    }}
                    alt=''
                />
                <p className='text' style={{ color: textColor }}>{text}</p>
            </a>
        );
    };
}

export default Button;