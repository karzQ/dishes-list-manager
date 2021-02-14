import React, {useState, useEffect} from 'react'
import {SafeAreaView, Text, View, StyleSheet, FlatList, TouchableHighlight} from 'react-native'
import FlatListItemSeparator from '../components/FlatListItemSeparator';

import * as theme from '../config/theme'

import {useDispatch} from 'react-redux';

const DetailsScreen = ({route}) => {
  const {selectedDish} = route.params;
  const dispatch = useDispatch();

  const FlatListItem = ({ingredient}) => {
    return (
      <View style={classes.flatListItemContainer}>
        <View style={classes.flatListItemName}>
          <Text>{ingredient.name}</Text>
          {
            ingredient.details !== '' && (
              <Text  style={theme.styles.detailsText}> - {ingredient.details}</Text>
            )
          }
        </View>
        <Text>{ingredient.quantity}{ingredient.unit}</Text>
      </View>
    )

  }

  const AddDishToCart = (obj) => {
    dispatch({ type:'ADD_DISH_TO_CART', payload: {...obj}})
  }
  
  return (
    <SafeAreaView style={theme.styles.viewContainer}>

      <View style={theme.styles.container}>
        <View style={classes.mainContent}>
          <View style={classes.dishImagePlaceholder}>
            {/* <Image style={{height: '100%', width:'auto'}} source={{uri: '#'}} /> */}
            <Text style={classes.dishCategory}>{selectedDish.category}</Text>
          </View>

          <View style={classes.separator} />
          
          <Text style={theme.styles.mainTitle}>{selectedDish.name}</Text>
          {
            selectedDish.details && (
              <Text style={theme.styles.detailsText}>{selectedDish.details}</Text>
            )
          }
          {
            !selectedDish.details && (
              <Text style={theme.styles.detailsText}> - </Text>
            )
          }
          
          <View style={classes.btnAddToCartContainer}>
            <TouchableHighlight 
                style={classes.btnAddToCart}
                activeOpacity={0.6}
                underlayColor="#CCCCCC"
                onPress={() => AddDishToCart(selectedDish)}>

                <Text style={classes.btnAddToCartText}>Ajouter à la liste</Text>
            </TouchableHighlight>
          </View>
        </View>

        <Text style={theme.styles.mainTitle}>Liste des ingredients</Text>

        <View>
          <FlatList
            style={classes.dishIngredientsList}
            data={selectedDish.ingredients}
            ItemSeparatorComponent={() => <FlatListItemSeparator />}
            renderItem={({item}) => <FlatListItem ingredient={item}/>}
            keyExtractor={item => `${selectedDish.name}-${item.name}-${item.id}`}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

const classes = StyleSheet.create({
  mainContent: {
    flexDirection: 'column',
    marginBottom: 20
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
  dishImagePlaceholder: {
    position: "relative",
    width: '100%',
    height: 200,
    backgroundColor: 'darkgray',
    marginBottom: 20
  },
  dishCategory: {
    backgroundColor: 'rgba(200,200,200,0.5)',
    textTransform: 'capitalize',
    position: 'absolute',
    left: 0,
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
    marginBottom: 15
  },
  btnAddToCartContainer: {
    zIndex: 50,
    position: 'absolute',
    bottom: 10,
    right: 0
  },
  btnAddToCart: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.MAIN_COLOR,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAddToCartText: {
    color: theme.TEXT_COLOR
  },
  dishIngredientsList: {
    height: (theme.height * 0.4) - 30,
    overflow: 'scroll',
  }
});

export default DetailsScreen;