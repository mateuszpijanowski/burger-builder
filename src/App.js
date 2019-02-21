import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from "react-router-dom";
import Orders from './containers/Checkout/Orders/Orders';

/*
    TODO:
        1. Make a delete button in order section
        2. Make a view detail in order section
        3. Create authentication system
        4. Create advanced validation system
        5. Create README file
        6. Testing
        7. Deploy project
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
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
