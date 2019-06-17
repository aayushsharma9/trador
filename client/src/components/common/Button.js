import React from 'react';
import './Button.css';

const Button = ({ href, width, height, backgroundColor, image, imageColor, imageSize, text, textColor }) => {
    return (
        <button
            onClick={() => {
                window.location.href=href
            }}
            className='root-container'
            style={{
                width,
                height,
                backgroundColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
            }}
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
        </button>
    );
};

export { Button };