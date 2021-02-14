import React from 'react';
import DetailsScreen from '../views/DetailsScreen';
import HomeScreen from '../views/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';

// Permet de faire un routing à l'intérieur du routing effectué pour les tabs
const HomeStack = () => {
    const Modal = createStackNavigator();
    const Stack = createStackNavigator();

    return (
        <Modal.Navigator mode="modal">
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="Détails" component={DetailsScreen} />
        </Modal.Navigator>
    )
}

export default HomeStack;