import React from 'react';
import ShoppingListScreen from '../views/ShoppingListScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Permet de faire un routing à l'intérieur du routing effectué pour les tabs
const ShoppingListStack = () => {

    const Modal = createStackNavigator();
    const Stack = createStackNavigator();

    return (
        <Modal.Navigator mode="modal">
            <Stack.Screen name="Liste de course" component={ShoppingListScreen} />
        </Modal.Navigator>
    )
}

export default ShoppingListStack;