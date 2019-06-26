import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import { logo } from '../drawables';
import { Button } from './common/Button';
import Search from './Search';

class Header extends Component {
    renderContent() {
        switch (this.props.user) {
            case null:
                return;
            case false:
                return <li>
                    <Button
                        text='LOGIN'
                        onClick={() => {
                            window.location.href = '/auth';
                        }}
                    />
                </li>;
            default:
                return [
                    <li key="1" style={{ margin: '0 10px' }}>
                        {/* Credits: {this.props.user.credits} */}
                    </li>,
                    <li key="2">
                        <Button
                            text='CREATE AN AD'
                            onClick={() => {
                                window.location.href = '/products/new';
                            }}
                        />
                    </li>,
                    <li key="3">
                        <Button
                            text='LOGOUT'
                            onClick={() => {
                                window.location.href = '/api/logout';
                            }}
                        />
                    </li>
                ];
        }
    }

    render() {
        return (
            <div className='header-root-container'>
                <Link
                    to='/home'
                >
                    <img className='header-logo-image' src={logo} alt='logo' />
                </Link>
                <Search />
                <ul className='header-content-list'>
                    {this.renderContent()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return { user };
}

export default connect(mapStateToProps, null)(Header);