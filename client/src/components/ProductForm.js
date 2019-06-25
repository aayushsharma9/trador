import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductForm.css';
import { createProduct } from '../actions';
import { Button } from './common';
import { logo } from '../drawables';

class ProductForm extends Component {
    state = {
        name: '',
        price: '',
        category: '',
        subCategory: '',
        condition: 'Brand New',
        description: '',
    }

    submit() {
        this.props.createProduct(this.state);
        // console.log(this.state);
    }

    render() {
        return (
            <div className='product-form-root-container'>
                <span className='product-form-header-container'>
                    <img src={logo} className='product-form-logo' alt='logo' />
                    <p className='product-form-header-text'>Create an ad.</p>
                </span>
                <form className='product-form'>
                    <div className='product-form-field-container'>
                        <input id='name' type='text' name='name' className='product-form-input' required
                            value={this.state.name}
                            onChange={(event) => { this.setState({ name: event.target.value }) }}
                        />
                        <label for='name' className='product-form-label'>Name</label>
                    </div>
                    <div className='product-form-field-container'>
                        <input id='price' type='number' name='price' className='product-form-input' required
                            value={this.state.price}
                            onChange={(event) => { this.setState({ price: event.target.value }) }}
                        />
                        <label for='pice' className='product-form-label'>Price</label>
                    </div>
                    <div className='product-form-field-container'>
                        <input id='category' type='text' name='category' className='product-form-input' required
                            value={this.state.category}
                            onChange={(event) => { this.setState({ category: event.target.value }) }}
                        />
                        <label for='category' className='product-form-label'>Category</label>
                    </div>
                    <div className='product-form-field-container'>
                        <input id='subcategory' type='text' name='subcategory' className='product-form-input' required
                            value={this.state.subCategory}
                            onChange={(event) => { this.setState({ subCategory: event.target.value }) }}
                        />
                        <label for='subcategory' className='product-form-label'>Subcategory</label>
                    </div>
                    <div className='product-form-field-container'>
                        <label for='condition' className='product-form-label-focused'>Condition</label>
                        <select id='condition' className='product-form-select'
                            value={this.state.condition}
                            onChange={(event) => { this.setState({ condition: event.target.value }) }}
                        >
                            <option className='product-form-option' value='Brand New'>Brand New</option>
                            <option className='product-form-option' value='Light Wear and Tear'>Light Wear and Tear</option>
                            <option className='product-form-option' value='Heavy Wear and Tear'>Heavy Wear and Tear</option>
                        </select>
                    </div>
                    <div className='product-form-field-container'>
                        <textarea rows={5} id='description' type='text' name='description' className='product-form-textarea' required
                            value={this.state.description}
                            onChange={(event) => { this.setState({ description: event.target.value }) }}
                        />
                        <label for='description' className='product-form-label'>Description</label>
                    </div>
                </form>
                <Button text='SUBMIT' onClick={this.submit.bind(this)}/>
            </div>
        );
    }
}

const mapStateToProps = ({ createSuccess }) => {
    return { createSuccess };
}

export default connect(mapStateToProps, { createProduct })(ProductForm);