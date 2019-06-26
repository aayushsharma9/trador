import React, { Component } from 'react';
import './ProductListItem.css';

class ProductListItem extends Component {
    render() {
        const { name, category, subCategory, price, condition, postedBy } = this.props.item;
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
                    <span style={{ display: 'flex', flex: 1,  flexDirection: 'row', justifyContent: 'space-between', width: '29em' }}>
                        <p className='product-list-item-text sub'>₹ {price}</p>
                        <p className='product-list-item-text sub faded'>Posted by {postedBy}</p>
                    </span>
                </span>
            </div>
        );
    }
}

export default ProductListItem;