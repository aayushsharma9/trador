import React from 'react';
import { logo, googleLogo, facebookLogo } from '../drawables';
import { AuthButton } from './common';
import './Authentication.css';
import { onbackgroundColor, backgroundColor } from '../values/colors';

const Landing = () => {
    return (
        <span className='auth-root-container'>
            <img className='auth-logo-image' src={logo} alt='Logo' />        
            <p className='auth-tagline-text'>Unlimited Classfieds. For Free.</p>
            <AuthButton
                text='LOGIN WITH GOOGLE'
                href='/auth/google'
                image={googleLogo}
                imageSize={25}
                width={'16em'}
                height={'3em'}
                backgroundColor='#ffffff'
                highlightColor='#efefef'
                textColor={onbackgroundColor}
            />
            <AuthButton
                text='LOGIN WITH FACEBOOK'
                href='/auth/facebook'
                image={facebookLogo}
                imageColor={onbackgroundColor}
                imageSize={25}
                width={'16em'}
                height={'3em'}
                backgroundColor='#3b5998'
                highlightColor='#4885ed'
                textColor={backgroundColor}
            />
        </span>
    );
};

export default Landing;