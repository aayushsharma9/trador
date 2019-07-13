import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../values/variables.css';
import Authentication from './Authentication';
import Home from './Home';
import ProductForm from './ProductForm';
import ProductPage from './ProductPage';
import ChatRoom from './ChatRoom';


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/auth' component={Authentication} />
                        <Route path='/products/new' component={ProductForm} />
                        <Route path='/products/edit/:productId' render={(props) => <ProductForm {...props} isEdit={true} />} />                        
                        <Route path='/products/view/:productId' component={ProductPage} />
                        <Route path='/chat' component={ChatRoom} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}


export default connect(null, actions)(App);