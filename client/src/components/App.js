import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../values/variables.css';
import Authentication from './Authentication';
import Home from './Home';
import ProductForm from './ProductForm';


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
                        <Route path='/product/new' component={ProductForm} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}


export default connect(null, actions)(App);