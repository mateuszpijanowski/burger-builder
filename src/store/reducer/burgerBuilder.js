import * as actionTypes from '../actions/actionTypes';

const initState = {
    ingredients: null,
    igPrice: null,
    totalPrice: 5,
    error: false,
    loading: false
};

const burgerBuilder = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_IG:
            const oldCount = state.ingredients[action.igType];
            const updateCount = oldCount + 1;
            const updatedIngredients = { ...state.ingredients };
            updatedIngredients[action.igType]=updateCount;
            const priceAddition = state.igPrice[action.igType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: newPrice
            };
        case actionTypes.REMOVE_IG:
            const oldCountR = state.ingredients[action.igType];
            if (oldCountR <= 0) {
                return {
                    ...state
                };
            }
            const updateCountR = oldCountR - 1;
            const updatedIngredientsR = { ...state.ingredients };
            updatedIngredientsR[action.igType]=updateCountR;
            const oldPriceR = state.totalPrice;
            if (oldPriceR <= 5) return;
            const priceDeduction = state.igPrice[action.igType];
            const newPriceR = oldPriceR - priceDeduction;

            return {
                ...state,
                ingredients: updatedIngredientsR,
                totalPrice: newPriceR
            };
        case actionTypes.INGREDIENTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                totalPrice: 5,
                ingredients: action.ingredients,
                error: false,
                loading: false
            };
        case actionTypes.SET_INGREDIENTS_PRICE:
            return {
                ...state,
                igPrice: action.igPrice,
                error: false,
                loading: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                loading: false
            };
        default:
            return state;
    }
};

export default burgerBuilder;
