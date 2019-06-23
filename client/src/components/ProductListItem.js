import React, { Component } from 'react';
import './ProductListItem.css';

class ProductListItem extends Component {
    render() {
        const { name, category, subCategory, price, condition } = this.props.item;
        return (
            <div className='product-list-item-container'>
                {/* <img className='product-list-item-image' src={facebookLogo} alt='product'/> */}
                <span className='product-list-item-text-container'>
                    <p className='product-list-item-title-text'>{name}</p>
                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                        <p className='product-list-item-text sub'>{category}</p>
                        <p className='product-list-item-text sub faded'>{subCategory}</p>
                    </span>
                    <p className='product-list-item-text sub'>{condition}</p>
                    <p className='product-list-item-text sub'>₹ {price}</p>
                </span>
            </div>
        );
    }
}

export default ProductListItem;