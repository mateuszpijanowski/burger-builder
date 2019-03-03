import React, { Component } from 'react';
import classes from './Orders.css';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Modal from '../../../components/UI/Modal/Modal';

class Orders extends Component {
    state = {
        view: false,
        id: null,
        nr: null
    };

    componentDidMount() {
        this.props.onFetchOrdersStart();
        this.props.onFetchOrders(
            this.props.token,
            this.props.userId,
            this.props.isAdmin
        );
    }

    removeOrderHandler = (orderId) => {
        this.props.onRemoveOrder(
            orderId,
            this.props.token,
            this.props.userId,
            this.props.isAdmin
        );
    };

    finishOrderHandler = (orderId, status) => {
        this.props.onFinishOrder(
            orderId,
            this.props.token,
            this.props.userId,
            this.props.isAdmin,
            status
        );
    };

    orderHiddenDetailsHandler = () => {
        this.setState({
            view: false,
            id: null,
            nr: null
        });
    };

    orderViewDetailsHandler = (orderId, nr) => {
        this.setState({
            view: true,
            nr: nr,
            id: orderId
        });
    };

    render() {
        let modal = null;
        let orders = <Spinner/>;

        if (this.state.view) {
            modal = <Modal show={this.state.view} modalClosed={this.orderHiddenDetailsHandler}>
                <h3 style={{textAlign: 'center'}}>Client data:</h3>
                <hr/>
                <div>Name:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.name}</p></div>
                <div>E-mail:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.email}</p></div>
                <div>Phone:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.phone}</p></div>
                <div>Street:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.street}</p></div>
                <div>Zip-Code:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.zipCode}</p></div>
                <div>Country:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.country}</p></div>
                <div>Delivery method:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].orderData.deliveryMethod}</p></div>
                <div>Status:
                    <p className={classes.Data}>{this.props.orders[this.state.nr].finish ? "Finish" : "In progress"}</p></div>
            </Modal>;
        }
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            orderId={order.id}
                            ingredients={order.ingredients}
                            finish={order.finish}
                            price={+order.price}
                            isAdmin={this.props.isAdmin}
                            remove={() => this.removeOrderHandler(order.id)}
                            details={() => this.orderViewDetailsHandler(order.id, order.nr)}
                            cancelFinishOrder={() => this.finishOrderHandler(order.id, false)}
                            finishOrder={() => this.finishOrderHandler(order.id, true)}/>
                    ))}
                </div>
            );
        }
        return (
            <React.Fragment>
                {modal}
                {orders}
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        isAdmin: state.auth.isAdmin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId, isAdmin) => dispatch(actions.fetchOrders(token, userId, isAdmin)),
        onFetchOrdersStart: () => dispatch(actions.fetchOrdersStart()),
        onRemoveOrder: (orderId, token, userId, isAdmin) => dispatch(actions.removeOrder(orderId, token, userId, isAdmin)),
        onFinishOrder: (orderId, token, userId, isAdmin, status) => dispatch(actions.finishOrder(orderId, token, userId, isAdmin, status))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
