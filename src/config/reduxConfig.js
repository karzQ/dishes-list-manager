import { createStore, combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistReducer, persistStore} from 'redux-persist';

// Reducers
import dishesReducer from '../redux/dishesReducer';
import ingredientsReducer from '../redux/ingredientsReducer';
import storedIngredientsReducer from '../redux/storedIngredientsReducer';
import shoppingCartReducer from '../redux/shoppingCartReducer';
import categoriesReducer from '../redux/categoriesReducer';
import plannedDishesReducer from '../redux/plannedDishesReducer';

const dishesPersistConfig = {
    key: 'dishes',
    storage: AsyncStorage
}

const ingredientsPersistConfig = {
    key: 'ingredients',
    storage: AsyncStorage
}

const shoppingCartPersistConfig = {
    key: 'cart',
    storage: AsyncStorage
}

const categoriesPersistConfig = {
    key: 'categories',
    storage: AsyncStorage
}

const storedIngredientsPersistConfig = {
    key: 'storedIngredients',
    storage: AsyncStorage
}

const plannedDishesPersistConfig = {
    key: 'planned',
    storage: AsyncStorage
}

const persistedDishes = persistReducer(dishesPersistConfig, dishesReducer);
const persistedIngredients = persistReducer(ingredientsPersistConfig, ingredientsReducer);
const persistedShoppingCart = persistReducer(shoppingCartPersistConfig, shoppingCartReducer);
const persistedCategories = persistReducer(categoriesPersistConfig, categoriesReducer);
const persistedStoredIngredients = persistReducer(storedIngredientsPersistConfig, storedIngredientsReducer);
const persistedStoredPlannedDishes = persistReducer(plannedDishesPersistConfig, plannedDishesReducer);

const rootReducer = combineReducers({
    dishesStore: persistedDishes,
    ingredientsStore: persistedIngredients,
    shoppingCartStore: persistedShoppingCart,
    categoriesStore: persistedCategories,
    storedIngredientsStore: persistedStoredIngredients,
    plannedDishesStore: persistedStoredPlannedDishes,
});

export const store = createStore(rootReducer, {});
export const persistor = persistStore(store);