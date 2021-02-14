import { ingredients } from '../config/data';
import { GET_INGREDIENTS, ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_INGREDIENTS } from '../redux/actions';

const initialState = {
    ingredients:  Array.from(ingredients)
};

const ingredientsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case ADD_INGREDIENT: {
            const obj = { id: state.ingredients.length, ...payload };
            return {...state, ingredients: [ {...obj} , ...state.ingredients] };
        }

        case REMOVE_INGREDIENT: {
            return state.filter(item => item.id !== payload);
        }

        case GET_INGREDIENTS: {
            return state;
        }

        case RESET_INGREDIENTS: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export default ingredientsReducer;