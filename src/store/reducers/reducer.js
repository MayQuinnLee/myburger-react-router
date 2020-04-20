import * as actionTypes from '../actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 4,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_ING:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
            }
        case actionTypes.REMOVE_ING:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
            }
        default: 
            return state
    }
}

export default reducer;

