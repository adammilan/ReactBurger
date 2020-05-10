import React, { Component }  from 'react';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import  {Route,Switch} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Checkout/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}
export default App;