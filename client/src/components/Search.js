import React, { Component } from 'react';
import './Search.css';
import { searchIcon } from '../drawables/icons';

class Search extends Component {
    render() {
        return (
            <div className='search-bar-root-container'>
                <input type='text' placeholder='Search' className='search-bar-field'/>
                <img src={searchIcon} className='search-bar-icon' alt='search'/>
            </div>
        );
    }
}

export default Search;