import * as actionTypes from './actions';

const initState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 5,
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_IG:
            const oldCount = state.ingredients[action.igType];
            const updateCount = oldCount + 1;
            const updatedIngredients = { ...state.ingredients };
            updatedIngredients[action.igType]=updateCount;
            const priceAddition = action.igPrice[action.igType];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            return {
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
            const priceDeduction = action.igPrice[action.igType];
            const newPriceR = oldPriceR - priceDeduction;

            return {
                ingredients: updatedIngredientsR,
                totalPrice: newPriceR
            };
    }

    return state;
};

export default reducer;
