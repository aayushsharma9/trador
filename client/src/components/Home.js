import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { fetchProducts, fetchUserProducts } from '../actions';
import ProductListItem from './ProductListItem';
import Header from './Header';
import ProductListItemMin from './ProductListItemMin';
import { archiveIcon } from '../drawables/icons';

class Home extends Component {
    state = {
        allProducts: [],
        userProducts: []
    }

    componentWillMount() {
        this.props.fetchProducts().then(() => {
        });
        this.props.fetchUserProducts(() => {
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.allProducts) this.setState({ allProducts: nextProps.allProducts });
        if (nextProps.userProducts) this.setState({ userProducts: nextProps.userProducts });
    }

    render() {
        return (
            <div className='home-root-container'>
                <Header />
                <div className='home-content'>
                    <div className='home-product-list'>
                        {this.state.allProducts.map((item, index) => (
                            <ProductListItem key={item._id} item={item} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={archiveIcon} style={{ height: '1.1em', width: '1.1em', marginRight: '0.7em', marginTop: '0.1em' }} alt='' />
                            <p className='home-text'>Your listings</p>
                        </span>
                        <div className='home-product-list self'>
                            {this.state.userProducts.map((item, index) => (
                                <ProductListItemMin key={item._id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ products }) => {
    return {
        allProducts: products.allProducts,
        userProducts: products.userProducts
    }
}

export default connect(mapStateToProps, { fetchProducts, fetchUserProducts })(Home);