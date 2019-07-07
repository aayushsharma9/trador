import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProductListItem.css';

class ProductListItem extends Component {
    render() {
        const { _id, name, category, subCategory, price, condition, postedBy, images } = this.props.item;
        return (
            <Link to={`/products/view/${_id}`} style={{ textDecoration: 'none' }}>
                <div className='product-list-item-container'>
                    <img className='product-list-item-image' src={images[0]} alt='product' />
                    <span className='product-list-item-text-container'>
                        <p className='product-list-item-title-text'>{name}</p>
                        <span style={{ display: 'flex', flexDirection: 'row' }}>
                            <p className='product-list-item-text sub'>{category}</p>
                            <p className='product-list-item-text sub faded'>{subCategory}</p>
                        </span>
                        <p className='product-list-item-text sub'>{condition}</p>
                        <span style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <p className='product-list-item-text sub'>₹ {price}</p>
                            <p className='product-list-item-text sub faded'>Posted by {postedBy}</p>
                        </span>
                    </span>
                </div>
            </Link>
        );
    }
}

export default ProductListItem;