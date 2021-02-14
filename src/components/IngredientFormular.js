import React, {useState, useEffect} from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet, Button, TextInput, Modal, TouchableHighlight } from "react-native";

import {DEFAULT_COLOR, TEXT_COLOR} from "./../config/theme"
import {useSelector, useDispatch} from "react-redux";

import * as theme from '../config/theme';

const IngredientFormular = () => {
    const categoriesList = useSelector(store => store.categoriesStore.ingredientCategories);
    const {ingredients} = useSelector(store => store.ingredientsStore);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(false);
    const [ingredient, setIngredient] = useState({
        name: "",
        imagePath: "#",
        category: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onChange = (text, inputName) => {
        setIngredient({
            ...ingredient,
            [inputName]: text
        })
    }

    const changeCategorie = async (name) => {
        await setIngredient({
            ...ingredient,
            category: name
        });
        await setIsModalOpen(false);
    }

    const addIngredients = () => {
        if (findItemByName(ingredient.name) === undefined) {
            dispatch({type: "ADD_INGREDIENT", payload: ingredient})
        } else {
            setIsValid(false);
        }
    }

    const findItemByName = (name) => {
        return ingredients.find(item => item.name === ingredient.name);
    }
    
    useEffect(()=>{
        if(ingredient.name !== "" && ingredient.category !== "" && !ingredients.find(item => item.name === ingredient.name)){
            setIsValid(true);
        }
        else{
            setIsValid(false);
        }
    }, [ingredient])
    
    return (
        <SafeAreaView style={theme.styles.viewContainer}>

            <View style={[theme.styles.container, classes.test]}>

                <Modal animationType="slide" transparent={true} visible={isModalOpen}>
                    <View style={classes.centeredView}>
                        <View style={classes.modalView}>
                            <Text style={theme.styles.mainTitle}>Liste des catégories</Text>
                            {
                                categoriesList.map((item, index)=>(
                                    <Pressable key={index} style={[classes.containerItem, classes.centerRow]} onPress={() => changeCategorie(item.name)}>
                                        <Text style={[ theme.styles.capitalized]}>{item.name}</Text>
                                    </Pressable>
                                ))
                            }
                            
                            <Button
                                onPress={() => setIsModalOpen(false)}
                                title="Back" />
                            
                        </View>
                    </View>
                </Modal>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <Text style={theme.styles.secondTitle}>Nom de l'ingrédient</Text>
                    <TextInput
                        style={[classes.textInput, classes.button]}
                        placeholder="Ex: Tomate"
                        value={ingredient.name}
                        onChangeText={text => onChange(text, "name")}/>
                </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <Text style={theme.styles.secondTitle}>Catégorie</Text>
                    <TouchableHighlight style={[classes.selectedCategorie, classes.centerRow, classes.button]}
                        activeOpacity={0.6}
                        underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                        onPress={()=>setIsModalOpen(true)}>
                        <Text style={theme.styles.capitalized}>{ingredient.category ? ingredient.category : "Choisir une catégorie"}</Text>
                    </TouchableHighlight>
                </View>

                <View style={[classes.categoriesContainer, classes.centerColumn]}>
                    <TouchableHighlight
                        style={[classes.addBtn, classes.centerRow, isValid === true ? classes.valid : classes.invalid]}
                        activeOpacity={0.6}
                        underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                        disabled={isValid ? false : true}
                        onPress={() => addIngredients()}>
                        <Text style={theme.styles.text}>Ajouter aliment</Text>
                    </TouchableHighlight>
                </View>

                {
                    !isValid && ingredient.name === '' && (
                        <Text style={classes.textInvalid}>Pas de nom</Text>
                    )
                }

                {
                    !isValid && ingredient.category === '' && (
                        <Text style={classes.textInvalid}>Pas de catégorie</Text>
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
    }
});

export default IngredientFormular;