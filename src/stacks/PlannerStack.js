import React from 'react';
import PlannerScreen from '../views/PlannerScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Permet de faire un routing à l'intérieur du routing effectué pour les tabs
const PlannerStack = () => {

    const Modal = createStackNavigator();
    const Stack = createStackNavigator();

    return (
        <Modal.Navigator mode="modal">
            <Stack.Screen name="Planning" component={PlannerScreen} />
        </Modal.Navigator>
    )
}
export default PlannerStack;