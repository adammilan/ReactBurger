import * as actionTypes from './actionTypes'
import axios from '../../axios-orderes'

export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return  {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    };
}
export const purchaseBurger = (orderData) =>{
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))
                // this.setState({ loading: false });
                // this.props.history.push('/');
            }).catch(error =>
                // this.setState({ loading: false })
                dispatch(purchaseBurgerFail(error))
            );
    }
}