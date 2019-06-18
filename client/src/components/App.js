import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../values/variables.css';
import Authentication from './Authentication';

const DashBoard = () => <h2>DashBoard</h2>
const ProductNew = () => <h2>ProductNew</h2>

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path='/' component={Authentication} />
                        <Route exact path='/home' component={DashBoard} />
                        <Route path='/product/new' component={ProductNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

export default connect(null, actions)(App);