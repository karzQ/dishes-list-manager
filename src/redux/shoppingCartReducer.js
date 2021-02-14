import { GET_CART, ADD_DISH_TO_CART, REMOVE_DISH_FROM_CART, DELETE_CART } from '../redux/actions';
import { idGenerator } from '../utils/commons';

const initialState = {
    cart: []
};

const shoppingCartReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case ADD_DISH_TO_CART: {
            let obj = { id: idGenerator(), ingredients: Array.from(payload.ingredients), ...payload, dates: []  };
            let newArr = []

            const dish = state.cart.find(item => item.name === payload.name);

            if (dish === undefined) {
                obj = { ...obj, quantity: obj.quantity ? obj.quantity : 1};

                return { ...state, cart: [...state.cart, {...obj}] };
            } else if (dish !== undefined) {

                obj = { ...obj, quantity: obj.quantity ? (obj.quantity + dish.quantity) : (dish.quantity + 1)};
                // console.log({obj});
                newArr = state.cart.filter(item => item.name !== dish.name);

                return { ...state, cart: [...newArr, {...obj}] };
            }
        }
        case REMOVE_DISH_FROM_CART:{
            console.log({payload});
            const newArr = state.cart.filter(item => {
                return item.name !== payload.name
            });
            return { ...state, cart: [...newArr] };
        }

        case GET_CART: 
            return state.cart;
        
        case DELETE_CART: 
            return initialState;
        
        default:
            return state;
    }
}

export default shoppingCartReducer;