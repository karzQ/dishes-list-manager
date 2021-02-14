import {idGenerator} from '../utils/commons';
import {RESET_PLANNED_DISHES, ADD_PLANNED_DISH} from './actions';

const initialState = {
    plannedDishes: []
}

const plannedDishesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case ADD_PLANNED_DISH: {
            const obj = {id: idGenerator(), ...payload}
            return { ...state, plannedDishes: [...state.plannedDishes, {...obj}]};
        }

        case RESET_PLANNED_DISHES: {
            return initialState;
        }

        default:
            return state;
    }
}

export default plannedDishesReducer;