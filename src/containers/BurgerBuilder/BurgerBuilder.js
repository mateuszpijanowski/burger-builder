import React, { Component } from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        ingredients_price: null,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('/ingredients_price.json')
            .then(res => {
                this.setState({ ingredients_price: res.data });
            })
            .catch(err => {
                return err;
            })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    updatePurchasableState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    addIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // const updateCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type]=updateCount;
        // const priceAddition = this.state.ingredients_price[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        //
        // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        this.props.onUpdateIngredients(type, this.state.ingredients_price);
        this.updatePurchasableState(this.props.ig);
    };

    removeIngredientHandler = (type) => {
        // const oldCount = this.state.ingredients[type];
        // if (oldCount <= 0) return;
        // const updateCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type]=updateCount;
        // const oldPrice = this.state.totalPrice;
        // if (oldPrice <= 5) return;
        // const priceDeduction = this.state.ingredients_price[type];
        // const newPrice = oldPrice - priceDeduction;
        //
        // this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });

        this.props.onRemoveIngredients(type, this.state.ingredients_price);
        this.updatePurchasableState(this.props.ig);
    };

    render() {
        const disabledInfo = {
            ...this.props.ig
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />;

        if (this.state.ingredients_price) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ig} />
                    <BuildControls
                        ingredients={this.props.ig}
                        price={this.props.pri}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchasableState(this.props.ig)} />
                </Aux>
            );
            orderSummary = <OrderSummary
                price={this.props.pri}
                ingredients={this.props.ig}
                purchaseCancled={this.purchaseCancelHandler}
                purchaseContinued={() => this.props.history.push({pathname: '/checkout'})} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
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

const mapStateToProps = state => {
    return {
        ig: state.ingredients,
        pri: state.totalPrice
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateIngredients: (type, igPrice) => dispatch({type: actionTypes.UPDATE_IG, igType: type, igPrice: igPrice}),
        onRemoveIngredients: (type, igPrice) => dispatch({type: actionTypes.REMOVE_IG, igType: type, igPrice: igPrice}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
