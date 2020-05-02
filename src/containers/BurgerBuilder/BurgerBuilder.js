import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orderes';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.5,
    meat: 3,
    bacon: 2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el
            }, 0);
        this.setState({ purchaseable: sum > 0 });

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return alert('you didnt have this ingedient!');
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })

    }
    purchaseContiniueHandler = () => {
        // this.setState({ loading: true });
        // // alert('you continiue');
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Adam choen',
        //         adress: 'aroe 34',
        //         country: 'aftica'
        //     },
        //     email: 'adam@gmail.com'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false })
        //     }).catch(error =>
        //         this.setState({ loading: false, purchasing: false })
        //   );
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('https://react-my-burger-25821.firebaseio.com/ingredients.json')
            .then(resonse => this.setState({ ingredients: resonse.data })).catch(error => {
                this.setState({error: true})
            });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
       

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger =this.state.error ? <p>ingrediaents cant be loaded</p>  : <Spinner/>
        if (this.state.ingredients !== null) {
         burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredient}
                    disabled={disableInfo}
                    purchasable={this.state.purchaseable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler} />
            </Aux>);
             orderSummary = <OrderSummary
             price={this.state.totalPrice}
             ingredients={this.state.ingredients}
             purchaseCanceled={this.purchaseCancelHandler}
             purchaseContinued={this.purchaseContiniueHandler}>  </OrderSummary>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);