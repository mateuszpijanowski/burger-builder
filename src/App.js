import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from "react-router-dom";
import Orders from './containers/Checkout/Orders/Orders';
import Auth from './containers/Auth/Auth';

/*
    TODO:
        1. Auto-close SideDrawer if page has been changed
        2. Create authentication system
        3. Create advanced validation system
        4. Create README file
        5. Testing
        6. Deploy project
        *Clear and upgrade quality of code
 */

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Switch>
                <Route path="/orders" component={Orders}/>
                <Route path="/checkout" component={Checkout} />
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
