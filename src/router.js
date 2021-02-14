import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import SettingsStack from './stacks/SettingsStack';
import InFreezersStack from './stacks/InFreezersStack';
import PlannerStack from './stacks/PlannerStack';
import ShoppingListStack from './stacks/ShoppingListStack';
import HomeStack from './stacks/HomeStack';

import * as theme from './config/theme';

import {useSelector} from 'react-redux';

const Navigation = () => {

    const {cart} = useSelector(state => state.shoppingCartStore);
    
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        console.log(cart);
    }, [])

    const IconWithBadge = ({tabInfo}) => {
        const [cartCount, setCartCount] = useState(0);
        const getShoppingCartListCount = () => {
            let count = 0;
            cart.forEach(item => {
                count += item.quantity;
            });
            return count;
        }

        useEffect(() => {
            setCartCount(getShoppingCartListCount());
        }, [cart])

        return (
            <View style={classes.shoppinCartIconContainer}>
                <FontAwesome5 name="shopping-cart" size={24} color={tabInfo.color} />
                {
                    cartCount > 0 && (
                        <View style={classes.countBadgeContainer}>
                            <Text style={classes.countBadgeCounter}>{ cartCount }</Text>
                        </View>
                    )
                }
            </View>
        )
    }

    // Navigation Container permet d'effectuer de gérer le routing de l'application
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb" />
            <NavigationContainer>
                
                <Tab.Navigator
                    initialRouteName="Home"
                    tabBarOptions={{
                        tabStyle: classes.tabBar,
                        labelStyle: classes.tabBarLabel,
                        activeTintColor: 'white',
                        inactiveTintColor: 'black'
                }}>

                <Stack.Screen
                    name="Home"
                    component={HomeStack} 
                    options={{
                        // tabBarLabel: "Accueil",
                        tabBarLabel: () => { return null },
                        tabBarIcon: (tabInfo) => <Ionicons name="home" size={24} color={tabInfo.color} />
                    }}
                />

                <Stack.Screen
                    name="ShoppingList" 
                    component={ShoppingListStack}
                    options={{
                        // tabBarLabel: "Liste de course",
                        tabBarLabel: () => { return null },
                        tabBarIcon: (tabInfo) => <IconWithBadge tabInfo={tabInfo} />
                    }}
                />

                <Stack.Screen 
                    name="Planner"
                    component={PlannerStack}
                    options={{
                        // tabBarLabel: "Planning",
                        tabBarLabel: () => { return null },
                        tabBarIcon: (tabInfo) => <Ionicons name='calendar' size={24} color={tabInfo.color} />
                    }}
                />

                <Stack.Screen 
                    name="Freezer"
                    component={InFreezersStack}
                    options={{
                        // tabBarLabel: "Frigo",
                        tabBarLabel: () => { return null },
                        tabBarIcon: (tabInfo) => <AntDesign name='database' size={24} color={tabInfo.color} />
                    }}
                />

                <Stack.Screen 
                    name="Settings"
                    component={SettingsStack}
                    options={{
                        // tabBarLabel: "Paramètres",
                        tabBarLabel: () => { return null },
                        tabBarIcon: (tabInfo) => <Ionicons name='settings-sharp' size={24} color={tabInfo.color} />
                    }}
                />
                    
                </Tab.Navigator>

            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const classes = StyleSheet.create({
    shoppinCartIconContainer: {
        position: 'relative'
    },
    countBadgeContainer: {
        position: 'absolute',
        minWidth: 15,
        minHeight:15,
        top: 0,
        right: -20,
        backgroundColor: 'tomato',
        borderRadius: 20,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    countBadgeCounter: {
        fontSize: 8,
        fontWeight: "700",
        color: theme.TEXT_COLOR
    },
    tabBar: {
        minHeight: 80,
        paddingBottom: 30,
        backgroundColor: theme.MAIN_COLOR,
    },
});

export default Navigation;