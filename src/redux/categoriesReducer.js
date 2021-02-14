import { ADD_DISH_CATEGORY, REMOVE_DISH_CATEGORY, ADD_INGREDIENT_CATEGORY, REMOVE_INGREDIENT_CATEGORY } from '../redux/actions';

const initialState = {
    ingredientCategories: [
        { id: 0, name: "viande" },
        { id: 1, name: "legume" },
        { id: 2, name: "poisson" },
        { id: 3, name: "laitage" },
        { id: 4, name: "fruit" },
        { id: 5, name: "condiment" },
        { id: 6, name: "fromage" }
    ],
    dishCategories: [
        { id: 0, name: "entree" },
        { id: 1, name: "plat" },
        { id: 2, name: "dessert" }
    ]
}

const categoriesReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ADD_DISH_CATEGORY: {
            const obj = { id: state.dishCategories.length, ...payload };
            return {...state, dishCategories: [ {...obj} , ...state.dishCategories] };
        }

        case REMOVE_DISH_CATEGORY: {
            return state.dishCategories.filter(item => item.id !== payload.id);
        }

        case ADD_INGREDIENT_CATEGORY: {
            const obj = { id: state.ingredientCategories.length, ...payload };
            return {...state, ingredientCategories: [ {...obj} , ...state.ingredientCategories] };
        }

        case REMOVE_INGREDIENT_CATEGORY: {
            return state.ingredientCategories.filter(item => item.id !== payload.id);
        }

        default: {
            return state;
        }
    }
}

export default categoriesReducer;