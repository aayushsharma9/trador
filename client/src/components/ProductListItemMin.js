import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductListItemMin extends Component {
    render() {
        const { _id, name, price, images } = this.props.item;
        return (
            <Link to={`/products/view/${_id}`} style={{ textDecoration: 'none' }}>
                <div className='product-list-item-container short'>
                    <img className='product-list-item-image small' src={images[0]} alt='product' />
                    <span className='product-list-item-text-container'>
                        <p className='product-list-item-title-text'>{name}</p>                        
                        <p className='product-list-item-text sub'>₹ {price}</p>
                    </span>
                </div>
            </Link>
        );
    }
}

export default ProductListItemMin;