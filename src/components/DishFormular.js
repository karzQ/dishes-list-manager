import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet, Button, TextInput, Modal, TouchableHighlight, FlatList } from "react-native";

import {useSelector, useDispatch} from "react-redux";

import { idGenerator } from '../utils/commons';
import FlatListItemSeparator from '../components/FlatListItemSeparator';

import * as theme from '../config/theme';

const DishFormular = () => {
    const {dishCategories} = useSelector(store => store.categoriesStore);
    const {dishes} = useSelector(store => store.dishesStore);
    const {ingredients} = useSelector(store => store.ingredientsStore);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(false);
    const [dish, setDish] = useState({
        name: "",
        imagePath: "#",
        details: '',
        category: "",
        ingredients: []
    });
    const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
    const [isModalIngredientsOpen, setIsModalIngredientsOpen] = useState(false);

    const [selectedItems, setSelectedItems] = useState([]);

    const onChange = (text, inputName) => {
        setDish({
            ...dish,
            [inputName]: text
        })
    }

    const changeCategorie = async (name) => {
        await setDish({
            ...dish,
            category: name
        });
        await setIsModalCategoriesOpen(false);
    }

    const addDishes = () => {
        if (findItemByName(dish.name) === undefined) {
            dispatch({type: "ADD_DISH", payload: dish})
        } else {
            setIsValid(false);
        }
    }

    const removeSelectedItems = (name) => {
        setSelectedItems([...selectedItems.filter(ingredient => ingredient.name !== name)]);
    }

    const removeIngredient = (name) => {
        const obj = { ...dish, ingredients: [...dish.ingredients.filter(ingredient => ingredient.name !== name)] };
        setDish({...obj});
        removeSelectedItems(name);
    }

    const findItemByName = (name) => {
        return dishes.find(item => item.name === name);
    }

    const FlatListIngredientItem = ({ingredient}) => {
        return (
            <View style={classes.flatListIngredientContainer}>
                <View style={classes.flatListIngredientInformations}>
                    <View style={classes.flatListIngredientItemName}>
                        <Text>{ingredient.name}</Text>
                    </View>
                    <Text>{ingredient.quantity}</Text>
                </View>
                
                

                <View>
                    <Pressable style={classes.removeButton}
                        onPress={() => removeIngredient(ingredient.name)}>
                        <Text style={theme.styles.text}>-</Text>
                    </Pressable>
                </View>
            </View>
        )
    }

    const FlatListItem = ({ingredient}) => {

        const existInSelectedIngredients = () => {
            return selectedItems.find(el => el.name === ingredient.name);
        }

        const handlePressSelectedItem = () => {
            const exist = existInSelectedIngredients(ingredient);
            if (exist === undefined) {
                setSelectedItems(selectedItems.concat(ingredient))
            } else {
                setSelectedItems([...selectedItems.filter(el => el.name !== ingredient.name)]);
            }
        }

        return (
            <>
                {
                    ingredient && (
                        <Pressable
                            style={[existInSelectedIngredients() !== undefined && (existInSelectedIngredients().name === ingredient.name) ? theme.styles.selected : null , classes.modalFlatListItemContainer]}
                            onPress={() => handlePressSelectedItem()}>
                            <View>
                                <Text style={existInSelectedIngredients() !== undefined && (existInSelectedIngredients().name === ingredient.name) ? theme.styles.text : null }>{ingredient.name}</Text>
                            </View>
                        </Pressable>
                    )
                }
            </>
        )
    }

    const addToIngredientsList = () => {
        const obj = { ...dish, ingredients: [...selectedItems] }
        setDish({...obj});
        setIsModalIngredientsOpen(false);
    }
    
    useEffect(()=>{
        if(dish.name !== "" && dish.category !== "" && dish.ingredients.length > 0 && !dishes.find(item => item.name === dish.name)){
            setIsValid(true);
        }
        else{
            setIsValid(false);
        }
    }, [dish])
    
    return (
        <SafeAreaView style={theme.styles.viewContainer}>

            <View style={[theme.styles.container, classes.test]}>

                <Modal animationType="slide" transparent={true} visible={isModalCategoriesOpen}>
                    <View style={classes.centeredView}>
                        <View style={classes.modalView}>
                            <Text style={theme.styles.mainTitle}>Liste des catégories</Text>
                            {
                                dishCategories.map((item, index)=>(
                                    <Pressable key={index} style={[classes.containerItem, classes.centerRow]} onPress={() => changeCategorie(item.name)}>
                                        <Text style={[ theme.styles.capitalized]}>{item.name}</Text>
                                    </Pressable>
                                ))
                            }
                            
                            <Button
                                onPress={() => setIsModalCategoriesOpen(false)}
                                title="Back" />
                            
                        </View>
                    </View>
                </Modal>

                <Modal animationType="slide" transparent='true' visible={isModalIngredientsOpen}>
                    <View style={classes.centeredView}>
                        <View style={classes.modalView}>
                            <Text style={theme.styles.mainTitle}>Liste des ingrédients</Text>
                            {
                                ingredients.length > 0 && (
                                    <FlatList 
                                        style={classes.modalFlatListItems}
                                        data={ingredients}
                                        keyExtractor={item => `ingredient-${item.id + idGenerator()}-${item.name}`}
                                        ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                        renderItem={({item}) => <FlatListItem ingredient={item}  />}/>
                                )
                            }

                            {
                                !ingredients || ingredients.length === 0 && (
                                    <Text style={theme.styles.detailsText}>Il n'y a rien.</Text>
                                )
                            }

                            <View style={classes.actionsArea}>

                                <Button
                                    style={classes.modalBtn}
                                    disabled={selectedItems.length === 0 ? true : false}
                                    onPress={() => addToIngredientsList()}
                                    title="Add to cart" />

                                <Button
                                    style={classes.modalBtn}
                                    onPress={() => setIsModalIngredientsOpen(false)}
                                    title="Back" />
                            </View>
                            
                        </View>
                    </View>
                    
                </Modal>

                    <View style={[classes.categoriesContainer, classes.centerColumn]}>
                        <Text style={theme.styles.secondTitle}>Nom du plat</Text>
                        <TextInput
                            style={[classes.textInput, classes.button]}
                            placeholder="Ex: Tomate"
                            value={dish.name}
                            onChangeText={text => onChange(text, "details")}/>
                    </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <Text style={theme.styles.secondTitle}>Détails du plat</Text>
                    <TextInput
                        style={[classes.textInput, classes.button]}
                        placeholder="Ex: Pour 2 personnes"
                        value={dish.details}
                        onChangeText={text => onChange(text, "name")}/>
                </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <Text style={theme.styles.secondTitle}>Catégorie</Text>
                    <TouchableHighlight style={[classes.selectedCategorie, classes.centerRow, classes.button]}
                        activeOpacity={0.6}
                        underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                        onPress={()=>setIsModalCategoriesOpen(true)}>
                        <Text>{dish.category ? dish.category : "Choisir une catégorie"}</Text>
                    </TouchableHighlight>
                </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <Text style={theme.styles.secondTitle}>Liste des ingrédients</Text>
                    <TouchableHighlight style={[classes.selectedCategorie, classes.centerRow, classes.button]}
                        activeOpacity={0.6}
                        underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                        onPress={()=>setIsModalIngredientsOpen(true)}>
                        <Text>Choisir des ingrédients</Text>
                    </TouchableHighlight>
                    <View style={classes.ingredientListContainer}>
                        {
                            dish.ingredients.length > 0 && (
                                <FlatList
                                    data={dish.ingredients}
                                    keyExtractor={item => `ingredient-${item.id + idGenerator()}-${item.name}`}
                                    renderItem={({item}) => <FlatListIngredientItem ingredient={item} />}
                                    ItemSeparatorComponent={() => <FlatListItemSeparator />} />
                            )
                        }

                        {
                            dish.ingredients.length === 0 && (
                                <Text style={theme.styles.detailsText}>Il n'y a pas d'ingrédients.</Text>
                            )
                        }
                        
                    </View>
                </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <TouchableHighlight
                        style={[classes.addBtn, classes.centerRow, isValid === true ? classes.valid : classes.invalid]}
                        activeOpacity={0.6}
                        underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                        disabled={isValid ? false : true}
                        onPress={() => addDishes()}>
                        <Text style={theme.styles.text}>Créer le plat</Text>
                    </TouchableHighlight>
                </View>

                {
                    !isValid && dish.name === '' && (
                        <Text style={classes.textInvalid}>Pas de nom</Text>
                    )
                }

                {
                    !isValid && dish.category === '' && (
                        <Text style={classes.textInvalid}>Pas de catégorie</Text>
                    )
                }

                {
                    !isValid && dish.ingredients.length === 0 && (
                        <Text style={classes.textInvalid}>Pas d'ingrédients</Text>
                    )
                }
            </View>
        </SafeAreaView>
    );
};

const classes = StyleSheet.create({
    test: {
        height: theme.height,
        flexDirection: 'column',
        alignItems: 'center'
    },
    centerRow: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    centerColumn: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        marginBottom: 20
    },
    categoriesContainer: {
        width: "100%",
    },
    textInput: {
        height: 55,
        color: '#000',
        width: "100%",
        margin: 5,
        textAlign: "center",
        fontWeight: "700"
    },
    selectedCategorie: {
        height: 55,
        width: "100%",
        borderRadius: 5,
        margin: 5,
    },
    modalView: {
        
        backgroundColor: "white",
        width: theme.width,
        borderRadius: 5,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 80
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    containerItem: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderColor: theme.TEXT_SECONDARY_COLOR,
        padding: 5,
        margin: 2,
        borderRadius: 5,
    },
    addBtn: {
        height: 50,
        borderRadius: 5,
        marginTop: 25,
        padding: 8
    },
    valid: {
        backgroundColor: theme.MAIN_COLOR
    },
    invalid: {
        backgroundColor: theme.TEXT_SECONDARY_COLOR
    },
    textInvalid: {
        color: 'tomato'
    },
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.TEXT_SECONDARY_COLOR,
    },
    ingredientListContainer: {
        marginTop: 20,
        overflow: 'scroll',
        width: '100%',
        maxHeight: 200
    },
    
    flatListPlannedDishListContainer: {
        width: '100%',
        marginBottom: 20,
        maxHeight: 200 
    },
    flatListIngredientInformations: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flatListIngredientItemName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center' 
    },
    flatListIngredientContainer: {
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
    modalFlatListItems: {
        overflow: 'scroll',
        height: 400
    },
    modalFlatListItemContainer: {
        width: '100%',
        flex:1,
        height: 40,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10
      },
      modalFlatListItemName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center' 
      },
  
      itemName: {
        fontWeight: '700'
      },
  
      modalBtn: {
        backgroundColor: theme.MAIN_COLOR,
        padding: 10,
        borderRadius: 5,
        width: 100
      },
      
      modaleTextInput: {
        margin: 20,
        width: 200,
        height: 40,
        paddingRight: 15,
        borderColor: theme.TEXT_SECONDARY_COLOR,
        borderWidth: 1
      },
      actionsArea: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
      }
});

export default DishFormular;