import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { connect } from 'react-redux';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './ProductPage.css';
import { deleteProduct } from '../actions';
import { Button } from './common/Button';
import { chevronLeft, chevronRight, messageIconLight, editIconLight, trashIcon } from '../drawables/icons';

class ProductPage extends Component {
    state = {
        name: '',
        price: '',
        condition: '',
        description: '',
        category: '',
        subCategory: '',
        images: [],
        _user: '',
        postedBy: '',
        datePosted: '',
    }

    componentWillMount() {
        this.fetchProductById(this.props.match.params.productId);
    }

    async fetchProductById(productId) {
        const res = await axios.get(`/api/products/${productId}`);
        this.setState(res.data);
    }

    renderButton() {
        if (this.state._user === this.props.user._id) {
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
                            console.log(this.props.match.params.productId);
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
        } else {
            return <Button text='CONTACT SELLER' image={messageIconLight} filled />;
        }
    }

    render() {
        const { name, price, category, subCategory, description, postedBy, condition, datePosted, images } = this.state;
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
                        <span style={{ display: 'flex', flexDirection: 'row', marginTop: '0.5%', marginBottom: '0.5%', marginLeft: '2%' }}>
                            <p className='product-page-text product-page-subtitle'>{category}</p>
                            <p className='product-page-text product-page-subtitle faded'>{subCategory}</p>
                        </span>
                        <p className='product-page-text product-page-subtitle'>Sold by {postedBy}</p>
                        <p className='product-page-text product-page-title'>₹ {price}</p>
                        {this.renderButton()}
                        <div style={{ display: 'flex', marginTop: '0.5%', flexDirection: 'column' }}>
                            <p className='product-page-text-nomargin product-page-subtitle'>About this product</p>
                            <p className='product-page-text-nomargin product-page-subtitle faded'>{condition}</p>
                            <p className='product-page-text-nomargin product-page-subtitle faded'>Posted on {datePosted}</p>
                            <p className='product-page-text-nomargin product-page-subtitle faded'>{description}</p>
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
        deleteSuccess: products.deleteSuccess
    })
}

export default connect(mapStateToProps, { deleteProduct })(ProductPage);