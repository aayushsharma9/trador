import React from 'react';
import { logo, googleLogo, facebookLogo } from '../drawables';
import { Button } from './common';
import './Authentication.css';
import { onbackgroundColor, backgroundColor } from '../values/colors';

const Landing = () => {
    return (
        <span className='root-container'>
            <img className='logo-image' src={logo} alt='Logo' />        
            <p className='tagline-text'>Unlimited Classfieds. For Free.</p>
            <Button
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
            <Button
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