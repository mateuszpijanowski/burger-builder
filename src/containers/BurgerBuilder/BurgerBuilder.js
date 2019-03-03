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
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onLoadingIngredients();
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({pathname: '/checkout'})
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    updatePurchasableState (ingredients) {
        if (ingredients) {
            const sum = Object.keys(ingredients)
                .map(igKey => {
                    return ingredients[igKey];
                })
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);

            return sum > 0;
        }
    };

    addIngredientHandler = (type) => {
        this.props.onUpdateIngredients(type);
        this.updatePurchasableState(this.props.ig);
    };

    removeIngredientHandler = (type) => {
        this.props.onRemoveIngredients(type);
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
        let burger = this.props.error ? <p>Ingredients can't by loaded</p> : <Spinner />;

        if (this.props.ig) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ig} />
                    <BuildControls
                        isAuth={this.props.isAuth}
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
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        if (this.props.loading) {
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
        ig: state.burgerBuilder.ingredients,
        pri: state.burgerBuilder.totalPrice,
        igPrice: state.burgerBuilder.igPrice,
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loading,
        isAuth: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateIngredients: (type) => dispatch(actions.addIngredient(type)),
        onRemoveIngredients: (type) => dispatch(actions.removeIngredient(type)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onLoadingIngredients: () => dispatch(actions.loadingIngredients()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectAuth(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
