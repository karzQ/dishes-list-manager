import React from 'react';
import InFreezerScreen from '../views/InFreezerScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Permet de faire un routing à l'intérieur du routing effectué pour les tabs
const InFreezersStack = () => {
    const Modal = createStackNavigator();
    const Stack = createStackNavigator();

    return (
        <Modal.Navigator mode="modal">
            <Stack.Screen name="Dans le frigo" component={InFreezerScreen} />
        </Modal.Navigator>
    )
}

export default InFreezersStack;