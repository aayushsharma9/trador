import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';
import { fetchProducts } from '../actions';
import ProductListItem from './ProductListItem';
import Header from './Header';

class Home extends Component {
    state = {
        allProducts: []
    }

    componentWillMount() {
        this.props.fetchProducts().then(() => {
            this.setState({ allProducts: this.props.allProducts });
        });
    }

    render() {
        return (
            <div className='home-root-container'>
                <Header />
                {this.state.allProducts.map((item, index) => (
                    <ProductListItem key={item._id} item={item} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = ({ products }) => {
    return {
        allProducts: products.allProducts,
    }
}

export default connect(mapStateToProps, { fetchProducts })(Home);