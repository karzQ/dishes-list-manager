import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_DISH_TO_CART } from '../redux/actions';
import FlatListItemSeparator from '../components/FlatListItemSeparator';

import SuggestsCarousel from '../components/SuggestsCarousel';

import * as theme from '../config/theme';
import moment from 'moment';

const HomeScreen = ({ navigation }) => {

    const {dishes} = useSelector(store => store.dishesStore);
    const {plannedDishes} = useSelector(store => store.plannedDishesStore);
    const dispatch = useDispatch();

    const [plannedDishesLastWeek, setPlannedDishesLastWeek] = useState([]);

    const addDishToCart = (item) => {
        dispatch({type: ADD_DISH_TO_CART, payload: {...item} })
    }

    const handlePress = (item) => {
        navigation.navigate('Détails', { selectedDish: item})
    }

    /* const getDishesFromLastWeek = () => {
        const currentDate = new Date();
        const currentDateTime = currentDate.getTime();
        const lastWeekFirstDay = new Date(
            moment(currentDate)
                .subtract(7, 'days')
                .subtract(currentDate.getMilliseconds(), 'milliseconds')
                .subtract(currentDate.getSeconds(), 'seconds')
                .subtract(currentDate.getMinutes(), 'minutes')
                .subtract(currentDate.getHours() - 1, 'hours')
                .format()
        ).getTime();

        console.log({lastWeekFirstDay});
        console.log({currentDateTime});

        const filterDishes = plannedDishes.filter(dish => {
            if (dish.dates.length > 0) {
                return new Date(dish.dates[0]).getTime() > lastWeekFirstDay;
            }
        })

        return filterDishes.filter(dish => {

        })
    } */

    const DishItem = ({dish}) => {

        dish.imagePath = 'https://via.placeholder.com/728x90.png';

        return (
            <View style={classes.flatListItem}>
                <TouchableHighlight
                    style={classes.flatListItemTouchableArea}
                    activeOpacity={0.6}
                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                    onPress={() => handlePress({...dish})}>

                    <View style={classes.flatListItemContent}>
                        
                        <Image style={classes.image} source={{uri: dish.imagePath === '#' ? 'https://via.placeholder.com/40x40.png' : dish.imagePath}} />
                        
                        <View style={classes.flatListItemContentName}>
                            <View>
                                <Text>{dish.name}</Text>
                                {
                                    dish.details && (
                                        <Text style={theme.styles.detailsText}>{dish.details}</Text>
                                    )
                                }

                                {
                                    !dish.details && (
                                        <Text style={theme.styles.detailsText}> - </Text>
                                    )
                                }
                            </View>

                            <View style={classes.addButton}>
                                <TouchableHighlight
                                    style={classes.addButtonTouchableArea}
                                    onPress={() =>  addDishToCart(dish)}
                                    activeOpacity={0.6}
                                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}>

                                        <Text style={[theme.styles.text, classes.text]}>+</Text>

                                </TouchableHighlight>
                            </View>
                            
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
    
    useEffect(() => {
        console.log({plannedDishes});
        // getDishesFromLastWeek();
    }, []);

    return (
        <SafeAreaView style={theme.styles.viewContainer}>
            <View style={theme.styles.container}>

                <View style={classes.suggestions}>
                    <Text style={theme.styles.mainTitle}>Suggestions</Text>
                    <SuggestsCarousel navigation={navigation}  />
                </View>
                
                <View style={classes.flatListContainer}>
                    <Text style={theme.styles.mainTitle}>Ces 7 derniers jours</Text>

                    {
                        plannedDishesLastWeek.length > 0 && (
                            <FlatList
                                data={plannedDishesLastWeek}
                                keyExtractor={item => `dish-${item.id}`}
                                ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                renderItem={({item}) => <DishItem dish={{...item}} />} />
                        )
                    }

                    {
                        plannedDishesLastWeek.length === 0 && (
                            <Text style={theme.styles.detailsText}>Vous n'avez pas encore plannifié de plat.</Text>
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

const classes = StyleSheet.create({
    suggestions: {
        marginBottom: 20
    },
    flatListContainer: {
        overflow: "scroll",
        width: '100%',
        // backgroundColor: "tomato",
        height: theme.height - 470
    },
    flatListItem: {
        position: 'relative',
        minHeight: 40
    },
    flatListItemContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    flatListItemContentName: {
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flatListItemTouchableArea: {
        padding: 20
    },
    image: {
        height: 60,
        width: 60
    },
    addButton: {
        borderRadius: 10,
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

export default HomeScreen;