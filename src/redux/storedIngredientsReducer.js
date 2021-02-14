import { idGenerator } from '../utils/commons';
import { GET_INGREDIENTS_IN_FREEZER, ADD_INGREDIENT_TO_FREEZER, REMOVE_INGREDIENT_FROM_FREEZER, DELETE_FREEZER_CONTENT } from '../redux/actions';

const initialState = {
    storedIngredients: []
};

const storedIngredientsReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case ADD_INGREDIENT_TO_FREEZER: {
            let obj = { id: idGenerator(), ...payload  };
            let newArr = []

            console.log({payload});

            const aliment = state.storedIngredients.find(item => item.name === payload.name);

            if (aliment === undefined) {
                obj = { ...obj, quantity: obj.quantity ? obj.quantity : 1};

                console.log("obj not exist: ", obj);

                return { ...state, storedIngredients: [...state.storedIngredients, {...obj}] };
            } else if (aliment !== undefined) {

                obj = { ...obj, quantity: obj.quantity ? (obj.quantity + aliment.quantity) : (aliment.quantity + 1)};

                console.log("obj exist: ", obj);

                newArr = state.storedIngredients.filter(item => item.name !== aliment.name);

                return { ...state, storedIngredients: [...newArr, {...obj}] };
            }
        }

        case REMOVE_INGREDIENT_FROM_FREEZER: {
            return state.filter(item => item.id !== payload);
        }

        case GET_INGREDIENTS_IN_FREEZER: {
            return state.storedIngredients;
        }

        case DELETE_FREEZER_CONTENT: {
            return initialState;
        }

        default: {
            return state;
        }
    }
}

export default storedIngredientsReducer;