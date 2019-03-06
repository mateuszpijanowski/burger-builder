import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
    ingredients: null,
    igPrice: null,
    totalPrice: 5,
    error: false,
    loading: false,
    building: false
};

const addIngredients = (state, action) => {
    const updatedIngredient = { [action.igType]: state.ingredients[action.igType] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.igPrice[action.igType],
        building: true
    };
    return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
    const updatedIngredientR = { [action.igType]: state.ingredients[action.igType] - 1 };
    const updatedIngredientsR = updateObject(state.ingredients, updatedIngredientR);
    const updatedStateR = {
        ingredients: updatedIngredientsR,
        totalPrice: state.totalPrice - state.igPrice[action.igType],
        building: true
    };
    return updateObject(state, updatedStateR);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        totalPrice: 5,
        ingredients: action.ingredients,
        error: false,
        loading: false,
    });
};

const setIngredientsPrice = (state, action) => {
    return updateObject(state, {
        igPrice: action.igPrice,
        error: false,
        loading: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true,
        loading: false
    });
};

const burgerBuilder = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_IG: return addIngredients(state, action);
        case actionTypes.REMOVE_IG: return removeIngredients(state, action);
        case actionTypes.INGREDIENTS_LOADING: return updateObject(state, { loading: true });
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.SET_INGREDIENTS_PRICE: return setIngredientsPrice(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default burgerBuilder;
