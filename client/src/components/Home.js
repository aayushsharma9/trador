import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { fetchProducts, fetchUserProducts, fetchSavedProducts } from '../actions';
import ProductListItem from './ProductListItem';
import Header from './Header';
import ProductListItemMin from './ProductListItemMin';
import { archiveIcon, bookmarkIcon } from '../drawables/icons';

class Home extends Component {
    state = {
        allProducts: [],
        userProducts: [],
        productsToShow: [],
        savedProducts: []
    }

    async componentWillMount() {
        await this.props.fetchProducts();
        this.setState({ allProducts: this.props.allProducts, productsToShow: this.props.allProducts });
        await this.props.fetchUserProducts();
        this.setState({ userProducts: this.props.userProducts });
        await this.props.fetchSavedProducts();
        this.setState({ savedProducts: this.props.user.savedProducts });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult) this.setState({ productsToShow: nextProps.searchResult });
    }

    renderSelfProductList(array, emptyMessage) {
        if (array.length === 0) {
            return <p className='home-text home-text-faded'>{emptyMessage}</p>;
        } else {
            return (
                array.map((item, index) => (
                    <ProductListItemMin key={item._id} item={item} />
                ))
            )
        }
    }

    render() {
        return (
            <div className='home-root-container'>
                <Header />
                <div className='home-content'>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={styles.subListTextContainer}>
                            <img src={archiveIcon} style={{ height: '1.1em', width: '1.1em', marginRight: '0.7em', marginTop: '0.1em' }} alt='' />
                            <p className='home-text'>Your listings</p>
                        </span>
                        <div className='home-product-list self'>
                            {this.renderSelfProductList(this.state.userProducts, 'You have not uploaded anything yet!')}
                        </div>
                    </div>
                    <div className='home-product-list'>
                        {this.state.productsToShow.map((item, index) => (
                            <ProductListItem key={item._id} item={item} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={styles.subListTextContainer}>
                            <img src={bookmarkIcon} style={{ height: '1.1em', width: '1.1em', marginRight: '0.7em', marginTop: '0.1em' }} alt='' />
                            <p className='home-text'>Saved Items</p>
                        </span>
                        <div className='home-product-list self'>
                            {this.renderSelfProductList(this.state.savedProducts, 'You have not saved anything yet!')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    subListTextContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4em'
    }
}

const mapStateToProps = ({ products, user }) => {
    return {
        user,
        allProducts: products.allProducts,
        userProducts: products.userProducts,
        savedProducts: products.savedProducts,
        searchResult: products.searchResult
    }
}

export default connect(mapStateToProps, { fetchProducts, fetchUserProducts, fetchSavedProducts })(Home);