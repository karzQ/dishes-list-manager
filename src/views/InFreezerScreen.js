import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableHighlight, StyleSheet, Pressable } from 'react-native';

import FlatListItemSeparator from '../components/FlatListItemSeparator';
import ButtonAddElement from '../components/ButtonAddElement';
// import FlatListIngredientItem from '../components/FlatListIngredientItem';

import { useSelector } from 'react-redux';
import { idGenerator } from '../utils/commons';

import * as theme from '../config/theme';

const InFreezerScreen = () => {

    const {ingredientCategories} = useSelector(store => store.categoriesStore)
    const {storedIngredients} = useSelector(store => store.storedIngredientsStore);
    const {ingredients} = useSelector(store => store.ingredientsStore);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredIngredients, setFilteredIngredients] = useState(storedIngredients);

    const filterData = () => {
        const data = storedIngredients.filter(item => item.category === ingredientCategories[selectedCategory].name);
        return data;
    }

    const handlePressCategory = (index) => {
        if (selectedCategory !== index) {
            setSelectedCategory(index);
        } else {
            setSelectedCategory(null);
        }
    }

    useEffect(() => {
        console.log({ingredientCategories});
        console.log({storedIngredients});
    }, [])

    useEffect(() => {
        if (selectedCategory !== null) {
            const data = filterData();
            setFilteredIngredients([...data]);
        } else {
            setFilteredIngredients([...storedIngredients]);
        }
    }, [selectedCategory, storedIngredients])

    const CategoryItem = ({category, index}) => {
        return (
            <View style={classes.categoryItemContainer}>
                <Pressable
                    onPress={() => handlePressCategory(index)}>

                    <View key={index} style={[classes.categoryItem, selectedCategory !== null && selectedCategory === index ? theme.styles.selected : null]}>
                        <Text style={[selectedCategory !== null && selectedCategory === index ? theme.styles.text : null, classes.categoryItemText]}>{category.name}</Text>
                    </View>
                </Pressable>
            </View>
        )
    }

    const FlatListItem = ({ingredient}) => {
        return (
          <View style={classes.flatListItemContainer}>
            <View style={classes.flatListItemName}>
              <Text>{ingredient.name}</Text>
            </View>
            <Text>{ingredient.quantity}{ingredient.unit}</Text>
          </View>
        )
    
      }

    return (
        <SafeAreaView style={theme.styles.viewContainer}>
            <View style={theme.styles.container}>
                <View style={classes.categoriesListContainer}>
                    <Text style={theme.styles.mainTitle}>Catégories</Text>
                    <View style={classes.categoriesList}>
                        {
                            ingredientCategories.map((cat, index) => (
                                <CategoryItem key={index} category={cat} index={index} />
                            ))
                        }
                    </View>
                </View>

                <View >
                    <Text style={theme.styles.mainTitle}>Liste des ingrédients disponibles</Text>
                    {
                        filteredIngredients.length > 0 && (
                            <FlatList
                                data={filteredIngredients}
                                keyExtractor={item => `ingredient-${item.id + idGenerator()}-${item.name}`}
                                renderItem={({item}) => <FlatListItem ingredient={item} />}
                                ItemSeparatorComponent={() => <FlatListItemSeparator />} />
                        )
                    }

                    {
                        filteredIngredients.length === 0 && (
                            <Text style={theme.styles.detailsText}>Vous n'avez rien dans le réfrigérateur.</Text>
                        )
                    }
                    
                </View>    
            </View>

            <ButtonAddElement dispatchAction="ADD_INGREDIENT_TO_FREEZER" listName="Liste des aliments" listItems={ingredients} quantityIsNeeded={true} />
        </SafeAreaView>
    )
}

const classes = StyleSheet.create({
    categoriesListContainer: {
        marginBottom: 20
    },
    categoriesList: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    categoryItemContainer: {
        margin: 5
    },
    categoryItem: {
        width: 75, 
        height: 75, 
        backgroundColor: 'lightgrey', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 5
    },
    categoryItemText: {
        textTransform: 'capitalize'
    },
    
    flatListItemContainer: {
        width: '100%',
        flex:1,
        height: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10 
    },
    flatListItemName: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center' 
    },

})

export default InFreezerScreen;