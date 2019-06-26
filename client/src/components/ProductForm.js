import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductForm.css';
import { createProduct } from '../actions';
import { Button, Input, TextArea } from './common';
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

    submit(event) {
        this.props.createProduct(this.state).then((res) => {
            alert(this.props.createSuccess ? 'Ad posted successfully!' : 'Error posting ad');
        });
        event.preventDefault();
        // console.log(this.state);
    }

    render() {
        return (
            <div className='product-form-root-container'>
                <form className='product-form'>
                    <span className='product-form-header-container'>
                        <img src={logo} className='product-form-logo' alt='logo' />
                        <p className='product-form-header-text'>Create an ad.</p>
                    </span>
                    <Input
                        label='Name'
                        type='text'
                        value={this.state.name}
                        onChange={(event) => { this.setState({ name: event.target.value }) }}
                    />
                    <Input
                        label='Price'
                        type='number'
                        value={this.state.price}
                        onChange={(event) => { this.setState({ price: event.target.value }) }}
                    />
                    <Input
                        label='Category'
                        type='text'
                        value={this.state.category}
                        onChange={(event) => { this.setState({ category: event.target.value }) }}
                    />
                    <Input
                        label='Subcategory'
                        type='text'
                        value={this.state.subCategory}
                        onChange={(event) => { this.setState({ subCategory: event.target.value }) }}
                    />
                    <div className='product-form-field-container'>
                        <label className='product-form-label-focused'>Condition</label>
                        <select className='product-form-select'
                            value={this.state.condition}
                            onChange={(event) => { this.setState({ condition: event.target.value }) }}
                        >
                            <option className='product-form-option' value='Brand New'>Brand New</option>
                            <option className='product-form-option' value='Light Wear and Tear'>Light Wear and Tear</option>
                            <option className='product-form-option' value='Heavy Wear and Tear'>Heavy Wear and Tear</option>
                        </select>
                    </div>
                    <TextArea
                        label='Description'
                        type='text'
                        rows={5}
                        value={this.state.description}
                    onChange={(event) => { this.setState({ description: event.target.value }) }}
                    />
                    <Button type='submit' text='SUBMIT' onClick={this.submit.bind(this)} />
                </form>
            </div >
        );
    }
}

const mapStateToProps = ({ products }) => {
    return { createSuccess: products.createSuccess };
}

export default connect(mapStateToProps, { createProduct })(ProductForm);