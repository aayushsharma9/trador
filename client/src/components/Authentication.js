import React from 'react';
import { logo, googleLogo, facebookLogo } from '../drawables';
import { Button } from './common';
import './Authentication.css';
import { onbackgroundColor, backgroundColor } from '../values/colors';

const Landing = () => {
    return (
        <div className='root-container'>
            <img className='logo-image' src={logo} alt='Logo' />        
            <Button
                text='LOGIN WITH GOOGLE'
                href='/auth/google'
                image={googleLogo}
                imageSize={25}
                width={'15.5%'}
                height={'7%'}
                backgroundColor='#ffffff'
                textColor={onbackgroundColor}
            />
            <Button
                text='LOGIN WITH FACEBOOK'
                href='/auth/facebook'
                image={facebookLogo}
                imageColor={onbackgroundColor}
                imageSize={25}
                width={'15.5%'}
                height={'7%'}
                backgroundColor='#3b5998'
                textColor={backgroundColor}
            />
        </div>
    );
};

export default Landing;