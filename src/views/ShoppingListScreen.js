import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableHighlight, StyleSheet,Pressable} from 'react-native';
import FlatListItemSeparator from '../components/FlatListItemSeparator';
import Loading from '../components/Loading';
import ButtonAddElement from '../components/ButtonAddElement';

import {useSelector, useDispatch } from 'react-redux';
import { idGenerator } from '../utils/commons';
import { REMOVE_DISH_FROM_CART } from '../redux/actions';

import * as theme from '../config/theme';

const ShoppingList = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector(store => store.shoppingCartStore);
    const {dishes} = useSelector(store => store.dishesStore);
    const [cartIngredients, setCartIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);


    const getDishesIngredients = (arr) => {

        let ingredientsArr = [];
    
        if (arr.length > 0) {
            arr.forEach(dish => {
                // console.log("Dish from iteration : ", dish);

                dish.ingredients.forEach(ingredient => {
                    const newIngredient = {
                        ...ingredient,
                        quantity: ingredient.quantity * dish.quantity
                    }
                    
                    ingredientsArr.push(newIngredient);
                })
            });
        }

        return ingredientsArr;
    }

    const removeDish = (name) => {
        dispatch({type: REMOVE_DISH_FROM_CART, payload: {name}})
    }
    
    const FlatListPlannedDishItem = ({dish}) => {
        return (
            <View style={classes.flatListPlannedDishItemContainer}>
                <View style={classes.flatListPlannedDishItemInformations}>
                    <View style={classes.flatListPlannedDishItemName}>
                        <Text>{dish.name}</Text>
                    </View>
                    <Text>{dish.quantity}</Text>
                </View>
                
                {
                    isDeleteMode && (
                        <View>
                            <Pressable style={classes.removeButton}
                                onPress={() => removeDish(dish.name)}>
                                <Text style={theme.styles.text}>-</Text>
                            </Pressable>
                        </View>
                    )
                }
            </View>
        )
    }

    const FlatListIngredientItem = ({ingredient}) => {

        return (
            
            <View style={classes.flatListIngredientItemContainer}>
                <View style={classes.flatListIngredientItemName}>
                    <Text>{ingredient.name}</Text>
                    {
                        ingredient.details !== '' && (
                            <Text style={theme.styles.detailsText}> - {ingredient.details}</Text>
                        )
                    }
                </View>
                <Text>{ `${ingredient.quantity} ${ingredient.unit}`}</Text>
            </View>
        )
    }
    
    const init = async () => {
        const ingredients = await getDishesIngredients(cart);
        await setCartIngredients([...ingredients]);
    }

    const handleDeleteModePress = () => {
        setIsDeleteMode(!isDeleteMode);
    }
    
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await init();
            setIsLoading(false);
        })()
        
    }, [cart])
    
    
    return (
        <SafeAreaView style={theme.styles.viewContainer}>

            <View style={theme.styles.container}>
                <Text style={theme.styles.mainTitle}>Plats prévus</Text>

                {
                    cart.length > 0 && (
                        <TouchableHighlight
                            style={[classes.deleteModeButton, isDeleteMode ? classes.active : classes.inactive]}
                            onPress={() => handleDeleteModePress()}
                            activeOpacity={0.6}
                            underlayColor={theme.TOUCHABLE_OPACITY_COLOR}>
                            <>
                                {
                                    isDeleteMode && (
                                        <Text style={[theme.styles.text, theme.styles.bold]}>Arrêter</Text>
                                    )
                                }

                                {
                                    !isDeleteMode && (
                                        <Text style={[theme.styles.text, theme.styles.bold]}>Retirer un plat</Text>
                                    )
                                }
                            </>
                        </TouchableHighlight>
                    ) 
                }
                

                <View style={classes.flatListPlannedDishListContainer}>
                    {
                        !isLoading && cart.length > 0 && (
                            <FlatList
                                data={cart}
                                ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                keyExtractor={item => `dish-${item.id + idGenerator()}-${item.name}`}
                                renderItem={({item}) => <FlatListPlannedDishItem dish={item} />}/>
                        )
                    }

                    {
                        !isLoading && cart.length === 0 && (
                            <Text style={theme.styles.detailsText}>Aucun plats de prévu</Text>
                        )
                    }

                    {
                        isLoading && cart.length === 0 && (
                            <Loading />
                        )
                    }
                </View>
                        
                <Text style={theme.styles.mainTitle}>Liste des ingrédients</Text>
                <View style={classes.flatListIngredientsListContainer}>
                    {
                        !isLoading && cartIngredients.length > 0 && (
                                <FlatList
                                    data={cartIngredients}
                                    ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                    keyExtractor={item => `ingredient-${item.id + idGenerator()}-${item.name}`}
                                    renderItem={({item}) => <FlatListIngredientItem ingredient={item}  />}/>
                        )
                    }

                    {
                        !isLoading && cartIngredients.length === 0 && (
                            <Text style={theme.styles.detailsText}>Aucun ingrédient</Text>
                        )
                    }

                    {
                        isLoading && cartIngredients.length === 0 && (
                            <Loading />
                        )
                    }
                </View>
            </View>

            <ButtonAddElement dispatchAction="ADD_DISH_TO_CART" listName="Liste des plats"  listItems={dishes} quantityIsNeeded={true} />
        </SafeAreaView>
    )
}

const classes = StyleSheet.create({
    flatListPlannedDishListContainer: {
        width: '100%',
        marginBottom: 20,
        maxHeight: 200 
    },
    flatListPlannedDishItemInformations: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatListPlannedDishItemName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    flatListPlannedDishItemContainer: {
        width: '100%',
        flex:1,
        height: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10 
    },
    removeButton: {
        height: 20,
        width: 20,
        backgroundColor: theme.ALERT_COLOR,
        marginLeft: 20,
        borderRadius: 20,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatListIngredientsListContainer: {
        width: '100%',
        maxHeight: 400 
    },
    flatListIngredientItemContainer: {
        width: '100%',
        flex:1,
        height: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10 
    },
    flatListIngredientItemName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteModeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 120,
        height: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    active: {
        backgroundColor: theme.ALERT_COLOR
    },
    inactive: {
        backgroundColor: theme.MAIN_COLOR
    }
});


export default ShoppingList;