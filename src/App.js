import React, { Component }  from 'react';
import Layout from './components/Layout/Layout';
import BurgetBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <BurgetBuilder />
                </Layout>
            </div>
        );
    }
}
export default App;