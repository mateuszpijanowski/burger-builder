import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Checkout/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

/*
    TODO:
        1. Create advanced validation system
        2. Testing*
        3. Create README file
        4. Deploy project
        *Clear and upgrade quality code
 */

class App extends Component {
    componentDidMount() {
        this.props.onAuthCheckState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/orders" component={asyncOrders}/>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthCheckState: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
