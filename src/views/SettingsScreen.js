import React, {useState} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

import { DELETE_CART, DELETE_FREEZER_CONTENT, RESET_INGREDIENTS, RESET_DISHES, RESET_PLANNED_DISHES } from '../redux/actions';
import * as theme from '../config/theme';

import { useDispatch } from 'react-redux';

const SettingsScreen = ({navigation}) => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={theme.styles.viewContainer}>
            <View style={theme.styles.container}>
                {/* <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Langue</Text>
                </View> */}

                <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Ingrédients</Text>

                    <Button
                        onPress={() => navigation.navigate('Créer un ingrédient')}
                        title="Créer un ingrédient" />
                    
                    <Button
                        disabled={true}
                        onPress={() => navigation.navigate('ModifyIngredient')}
                        title="Modifier un ingrédient (WIP)" />
                    
                    <Button
                        onPress={() => dispatch({ type: RESET_INGREDIENTS })}
                        title="Reset ingrédients" />
                </View>

                <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Plats</Text>

                    <Button
                        onPress={() => navigation.navigate('Créer un plat')}
                        title="Créer un plat (WIP)" />
                    
                    <Button
                        disabled={true}
                        onPress={() => navigation.navigate('ModifyDish')}
                        title="Modifier un plat (WIP)" />
                    
                    <Button
                        onPress={() => dispatch({ type: RESET_DISHES })}
                        title="Reset plats" />
                </View>

                <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Liste de course</Text>
                    
                    <Button
                        onPress={() => dispatch({ type: DELETE_CART })}
                        title="Supprimer la liste de course" />
                </View>

                <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Agenda</Text>
                    
                    <Button
                        onPress={() => dispatch({ type: RESET_PLANNED_DISHES })}
                        title="Reset les plannifications" />
                </View>

                <View style={classes.container}>
                    <Text style={theme.styles.mainTitle}>Dans le frigo</Text>
                    
                    <Button
                        onPress={() => dispatch({ type: DELETE_FREEZER_CONTENT })}
                        title="Supprimer le frigo" />
                </View>
            </View>

        </SafeAreaView>
    )
}

const classes = StyleSheet.create({
    container: {
        marginBottom: 20
    }
})

export default SettingsScreen;