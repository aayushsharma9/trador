import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductPage.css';
import { deleteProduct, saveProduct, unsaveProduct, fetchSavedProducts, createChatRoom } from '../actions';
import { Button } from './common/Button';
import { chevronLeft, chevronRight, messageIconLight, editIconLight, trashIcon, bookmarkIcon, bookmarkCancelIcon, userIconLight } from '../drawables/icons';

class ProductPage extends Component {
    state = {
        product: {
            name: '',
            price: '',
            condition: '',
            description: '',
            category: '',
            subCategory: '',
            images: [],
            _user: '',
            postedBy: '',
            datePosted: ''
        },
        savedProducts: [],
        saved: false,
        loading: false
    }

    async componentWillMount() {
        this.fetchProductById(this.props.match.params.productId);
        if (!_.isEmpty(this.props.user)) {
            await this.props.fetchSavedProducts();
            this.setState({ savedProducts: this.props.user.savedProducts });
            this.setState({ saved: await this.checkSaved() });
        }
    }

    async checkSaved() {
        const found = await _.find(this.state.savedProducts, { _id: this.props.match.params.productId })
        if (found) return true;
        else return false;
    }

    async fetchProductById(productId) {
        const res = await axios.get(`/api/products/view/${productId}`);
        this.setState({ product: res.data });
    }

    renderSaveButton() {
        if (this.state.loading) return;
        if (this.state.saved) {
            return (
                <Button
                    text='UNSAVE'
                    image={bookmarkCancelIcon}
                    onClick={async () => {
                        this.setState({ loading: true });
                        await this.props.unsaveProduct({ _id: this.props.match.params.productId });
                        this.setState({ saved: false, loading: false });
                    }}
                />
            );
        }

        return (
            <Button
                text='SAVE'
                image={bookmarkIcon}
                onClick={async () => {
                    this.setState({ loading: true });
                    await this.props.saveProduct({ _id: this.props.match.params.productId });
                    this.setState({ saved: true, loading: false });
                }}
            />
        );
    }

    renderButton() {
        switch (this.props.user._id) {
            case undefined:
                return (
                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            text='LOG IN TO CONTACT SELLER OR SAVE ITEM'
                            image={userIconLight}
                            filled
                            onClick={() => {
                                window.location.href = '/auth';
                            }}
                        />
                    </span>
                );

            case this.state.product._user:
                return (
                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            text='EDIT AD'
                            image={editIconLight}
                            filled
                            onClick={() => {
                                window.location.href = `/products/edit/${this.props.match.params.productId}`;
                            }}
                        />
                        <Button
                            text='DELETE'
                            image={trashIcon}
                            onClick={async () => {
                                const confirm = window.confirm('Do you want to delete this ad?');
                                if (confirm) {
                                    await this.props.deleteProduct(this.props.match.params.productId);
                                    alert(this.props.deleteSuccess ? 'Ad deleted successfully!' : 'Error deleting ad');
                                    window.location.href = '/';
                                } else {
                                }
                            }
                            }
                        />
                    </span>
                );

            default:
                return (
                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button
                            text='CONTACT SELLER'
                            image={messageIconLight}
                            filled
                            onClick={async () => {
                                await this.props.createChatRoom({
                                    recipients: [this.props.user.name, this.state.product.postedBy]
                                }, this.state.product._user);
                                window.location.href = '/chat';
                            }}
                        />
                        {this.renderSaveButton()}
                    </span>
                );
        }
    }

    render() {
        const { name, price, category, subCategory, description, postedBy, condition, datePosted, images } = this.state.product;
        return (
            <div className='product-page-root-container'>
                <Header />
                <div className='product-page-container'>
                    <CarouselProvider
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        totalSlides={images.length}
                        className='product-page-carousel'
                    >
                        <ButtonBack className='product-page-carousel-button'>
                            <img src={chevronLeft} alt='Back Button' className='product-page-carousel-button-image' />
                        </ButtonBack>
                        <Slider className='product-page-carousel-slider'>
                            {images.map((item, index) => (
                                <Slide index={index} key={item}>
                                    <img src={item} className='product-page-image' alt='' />
                                </Slide>
                            ))}
                        </Slider>
                        <ButtonNext className='product-page-carousel-button'>
                            <img src={chevronRight} alt='Next Button' className='product-page-carousel-button-image' />
                        </ButtonNext>
                    </CarouselProvider>
                    <div className='product-page-text-container'>
                        <p className='product-page-text product-page-title'>{name}</p>
                        <span style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '0.5%',
                            marginBottom: '0.5%',
                        }}>
                            <p className='product-page-text product-page-subtitle'>{category}</p>
                            <p className='product-page-text product-page-subtitle fade'>{subCategory}</p>
                        </span>
                        <p className='product-page-text product-page-subtitle'>Sold by {postedBy}</p>
                        <p className='product-page-text product-page-title'>₹ {price}</p>
                        {this.renderButton()}
                        <div style={{ display: 'flex', marginTop: '0.5%', flexDirection: 'column' }}>
                            <p className='product-page-text-nomargin product-page-subtitle'>About this product</p>
                            <p className='product-page-text-nomargin product-page-subtitle fade'>{condition}</p>
                            <p className='product-page-text-nomargin product-page-subtitle fade'>Posted on {datePosted}</p>
                            <p className='product-page-text-nomargin product-page-subtitle fade'>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user, products }) => {
    return ({
        user,
        deleteSuccess: products.deleteSuccess,
    })
}

export default connect(mapStateToProps, { deleteProduct, saveProduct, unsaveProduct, fetchSavedProducts, createChatRoom })(ProductPage);