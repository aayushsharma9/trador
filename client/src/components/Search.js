import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Search.css';
import { fetchSearchResult } from '../actions';
import { searchIcon } from '../drawables/icons';

class Search extends Component {
    handleOnChange(searchString) {
        this.props.fetchSearchResult(searchString);
    }

    render() {
        return (
            <div className='search-bar-root-container'>
                <input
                    type='text'
                    placeholder='Search'
                    className='search-bar-field'
                    onChange={(event) => { this.handleOnChange(event.target.value); }} />
                <img src={searchIcon} className='search-bar-icon' alt='search' />
            </div>
        );
    }
}

export default connect(null, { fetchSearchResult })(Search);