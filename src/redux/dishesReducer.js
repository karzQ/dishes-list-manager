import { dishes } from '../config/data';
import { GET_DISHES, ADD_DISH, REMOVE_DISH, RESET_DISHES } from '../redux/actions';

const initialState = {
    dishes: Array.from(dishes)
};

const dishesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ADD_DISH: {
            console.log({payload});
            const obj = { id: state.dishes.length, ...payload };
            return {...state, dishes: [ {...obj} , ...state.dishes] };
        }

        case REMOVE_DISH: {
            return state.filter(item => item.id !== payload);
        }

        case GET_DISHES: {
            return state;
        }

        case RESET_DISHES: {
            return initialState;
        }

        default:
            return state;
    }
}

export default dishesReducer;