import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "../../containers/Checkout/ContactData/ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {

    // state = {
    //     ingredients: null,
    //     price:0
    // }
    // componentWillMount(){
    //     console.log(this.props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()){
    //         if (param[0]==='price') {
    //             price = param[1];
    //         }else{
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients,totalPrice:price});
    // }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect  = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );  
        }
        return summary;
    }

    //render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.props.price} {...props}/>)}


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased:state.order.purchased
        //price: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);