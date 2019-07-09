import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './ProductForm.css';
import { createProduct, updateProduct, fetchProducts, fetchUserProducts } from '../actions';
import { Button, Input, TextArea } from './common';
import { logo } from '../drawables';
import { imageIconLight, closeIconLight } from '../drawables/icons';

class ProductForm extends Component {
    state = {
        name: '',
        price: '',
        category: '',
        subCategory: '',
        condition: 'Brand New',
        description: '',
        files: []
    }

    componentWillMount() {
        if (this.props.isEdit) {
            this.fetchProductById(this.props.match.params.productId);
            console.log(this.props.user);
        }
    }

    async fetchProductById(productId) {
        const res = await axios.get(`/api/products/${productId}`);
        this.setState(res.data);
        console.log(this.state);
    }

    submit(event) {
        if (this.props.isEdit) {
            this.props.updateProduct(this.state).then((res) => {
                console.log(this.props);
                alert(this.props.updateSuccess ? 'Ad updated successfully!' : 'Error updating ad');
                this.props.fetchProducts();
            });
        } else {
            this.props.createProduct(this.state).then((res) => {
                alert(this.props.createSuccess ? 'Ad posted successfully!' : 'Error posting ad');
                this.props.fetchProducts().then(() => {
                    this.props.fetchUserProducts();
                });
            });
        }

        event.preventDefault();
    }

    async readImages(event) {
        var fileList = event.target.files;
        var files = [...fileList]

        for (var i = 0; i < files.length; i++) {
            var reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = readerEvent => {
                var content = readerEvent.target.result;
                this.setState(({ files }) => ({ files: [...files, content] }));
            }
        }
    }

    removeImage(item) {
        const fileArray = this.state.files;
        console.log("Remove image called");
        for (var i = 0; i < fileArray.length; i++) {
            if (fileArray[i] === item) {
                fileArray.splice(i, 1);
                this.setState({ files: fileArray });
            }
        }
    }

    renderImageSelector() {
        return (
            <div className='product-form-image-list-container'>
                <div className='product-form-image-list'>
                    {this.state.files.map((item, index) => (
                        <div className='image-thumbnail-container' key={item}>
                            <img src={item} alt='' className='image-thumbnail' />
                            <img src={closeIconLight} className='image-thumbnail-remove-button' alt='' onClick={() => this.removeImage(item)} />
                        </div>
                    ))}
                </div>
                <div className='product-form-image-input-container'>
                    <img src={imageIconLight} alt='' className='product-form-image-input-icon' />
                    <label className='product-form-image-input-label'>
                        ADD IMAGES
                        <input
                            className='product-form-image-input-field'
                            id='file'
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={(event) => this.readImages(event)}
                        />
                    </label>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className='product-form-root-container'>
                <form className='product-form'>
                    <span className='product-form-header-container'>
                        <img src={logo} className='product-form-logo' alt='logo' />
                        <p className='product-form-header-text'>Create an ad.</p>
                    </span>
                    <div className='product-form-horizontal-section'>
                        <div className='product-form-section'>
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
                        </div>
                        <div className='product-form-section'>
                            {this.renderImageSelector()}
                            <TextArea
                                label='Description'
                                type='text'
                                rows={8}
                                value={this.state.description}
                                onChange={(event) => { this.setState({ description: event.target.value }) }}
                            />
                        </div>
                    </div>
                    <Button type='submit' text='SUBMIT' onClick={this.submit.bind(this)} />
                </form>
            </div >
        );
    }
}

const mapStateToProps = ({ products }) => {
    return {
        createSuccess: products.createSuccess,
        updateSuccess: products.updateSuccess,
    };
}

export default connect(mapStateToProps, { createProduct, fetchProducts, updateProduct, fetchUserProducts })(ProductForm);