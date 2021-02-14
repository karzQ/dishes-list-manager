import React from 'react';
import SettingsScreen from '../views/SettingsScreen';
import AddDishScreen from '../views/AddDishScreen';
import AddIngredientScreen from '../views/AddIngredientScreen';
import ModifyDishScreen from '../views/ModifyDishScreen';
import ModifyIngredientScreen from '../views/ModifyIngredientScreen';
import PhotoScreen from '../views/PhotoScreen';

import { createStackNavigator } from '@react-navigation/stack';

// Permet de faire un routing à l'intérieur du routing effectué pour les tabs
const SettingsStack = () => {
    const Modal = createStackNavigator();
    const Stack = createStackNavigator();

    return (
        <Modal.Navigator mode="modal">
            <Stack.Screen name="Paramètres" component={SettingsScreen} />
            <Stack.Screen name="Créer un plat" component={AddDishScreen} />
            <Stack.Screen name="Créer un ingrédient" component={AddIngredientScreen} />
            <Stack.Screen name="ModifyDish" component={ModifyDishScreen} />
            <Stack.Screen name="ModifyIngredient" component={ModifyIngredientScreen} />
            <Stack.Screen name="Photo" component={PhotoScreen} options={{headerShown: false}} />
        </Modal.Navigator>
    )
}
export default SettingsStack;