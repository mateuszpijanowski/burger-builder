import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const finishOrder = (orderId, token, userId, isAdmin, status) => {
    return dispatch => {
        axios.put('/orders/'+orderId+'/finish.json?auth=' + token, status)
            .then(res => {
                dispatch(fetchOrders(token, userId, isAdmin));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    };
};

export const removeOrder = (orderId, token, userId, isAdmin) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.delete('/orders/'+orderId+'.json?auth=' + token)
            .then(res => {
                console.log(res);
                dispatch(fetchOrders(token, userId, isAdmin));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            });
    };
};

export const fetchOrders = (token, userId, isAdmin) => {
    return dispatch => {
        let queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        if (isAdmin === true) {
            queryParams = '?auth=' + token;
        }
        axios.get('/orders.json' + queryParams)
            .then(res => {
                let i = 0;
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                        nr: i
                    });
                    i++
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    };
};
