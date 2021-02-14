import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {useDispatch, useSelector} from 'react-redux';
import { ADD_DISH_TO_CART } from '../redux/actions';

import * as theme from '../config/theme';

const SuggestsCarousel = ({navigation}) => {

    const {dishes} = useSelector(state => state.dishesStore);
    const dispatch = useDispatch();

    const addDishToCart = (item) => {
        dispatch({type: ADD_DISH_TO_CART, payload: {...item} })
    }

    
    const handlePress = (item) => {
        navigation.navigate('Details', { selectedDish: {...item}})
    }

    const SuggestItem = ({item, index}) => {
        return (
            <View key={index} style={classes.suggestion}>
                <Pressable style={{width: '100%', height: "100%"}} onPress={() => handlePress(item)}>
                    <Image style={classes.image} source={{uri: item.imagePath === '#' ? 'https://via.placeholder.com/200x200.png' : item.imagePath}} />
                    <View style={classes.name}>
                        <Text>{item.name}</Text>
                    </View>

                    <View style={classes.addButton}>
                        <TouchableHighlight
                            style={classes.addButtonTouchableArea}
                            onPress={() =>  addDishToCart(item)}
                            activeOpacity={0.6}
                            underlayColor={theme.TOUCHABLE_OPACITY_COLOR}>

                                <Text style={[theme.styles.text, classes.text]}>+</Text>

                        </TouchableHighlight>
                    </View>
                </Pressable>
            </View>
        )
    }

    return (
        <Carousel
            layout={'default'}
            data={dishes}
            sliderWidth={theme.width}
            renderItem={({item, index}) => <SuggestItem item={item} index={index} />}
            itemWidth={200}
            itemHeight={100}
        />
    )
}

const classes = StyleSheet.create({
    suggestion: {
        height: 200,
        backgroundColor: 'tomato',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    image: {
        height: '100%',
        width: '100%'
    },
    name: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(255,255,255, 0.35)",
        height: 50,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton: {
        position: 'absolute',
        borderRadius: 10,
        top: 10,
        right: 10,
        width: 40,
        height: 40,
        backgroundColor: theme.MAIN_COLOR,
    },
    addButtonTouchableArea: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default SuggestsCarousel;