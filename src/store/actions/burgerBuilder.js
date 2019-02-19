import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (type, igPrice) => {
    return {
        type: actionTypes.UPDATE_IG,
        igType: type,
        igPrice: igPrice
    }
};

export const removeIngredient = (type, igPrice) => {
    return {
        type: actionTypes.REMOVE_IG,
        igType: type,
        igPrice: igPrice
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const setIngredientsPrice = (igPrice) => {
    return {
        type: actionTypes.SET_INGREDIENTS_PRICE,
        igPrice: igPrice
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
        axios.get('/ingredients_price.json')
            .then(res => {
                dispatch(setIngredientsPrice(res.data));
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    };
};
