import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableHighlight, Modal, FlatList, Button, Pressable, Image } from 'react-native';
import {idGenerator} from '../utils/commons';
import {Calendar} from 'react-native-calendars'
import * as theme from '../config/theme';
import moment from 'moment';

import { ADD_PLANNED_DISH } from '../redux/actions';

import FlatListItemSeparator from '../components/FlatListItemSeparator';

import { useDispatch, useSelector } from 'react-redux';

const PlannerScreen = () => {
    const dispatch = useDispatch();
    const [selectedDay, setSelectedDay] = useState(moment(new Date()).format('YYYY-MM-D'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {plannedDishes} = useSelector(state => state.plannedDishesStore);
    const {dishes} = useSelector(state => state.dishesStore);
    const [selectedItems, setSelectedItems] = useState([]);
    const [toggle, setToggle] = useState({name: 'planned', list: plannedDishes});
    const [arrType, setArrType] = useState('');
    const [dishesArr, setDishesArr] = useState({...plannedDishes.find(item => item.date === selectedDay.dateString)});

    const handleDayPressed = (day) => {
        setSelectedDay(day);
    }

    const openModal = (value, type) => {
        setIsModalOpen(value);
        setArrType(type);
    }

    const addToDishesList = () => {
        const obj = { ...dishesArr, [arrType]: [...selectedItems], date: selectedDay.dateString }
        setDishesArr({...obj});
        setIsModalOpen(false);

        if (selectedItems.length === 3) {
            setSelectedItems([]);
        }

        dispatch({type: ADD_PLANNED_DISH, payload: {...dishesArr}})
    }

    const FlatListItem = ({dish}) => {

        const existInSelectedDishes = () => {
            return selectedItems.find(el => el.name === dish.name);
        }

        const handlePressSelectedItem = () => {
            const exist = existInSelectedDishes(dish);
            if (exist === undefined) {
                setSelectedItems(selectedItems.concat(dish))
            } else {
                setSelectedItems([...selectedItems.filter(el => el.name !== dish.name)]);
            }
        }

        return (
            <Pressable
                style={[existInSelectedDishes() !== undefined && (existInSelectedDishes().name === dish.name) ? theme.styles.selected : null , classes.modalFlatListItemContainer]}
                onPress={() => handlePressSelectedItem()}>
                <View>
                    <Text style={existInSelectedDishes() !== undefined && (existInSelectedDishes().name === dish.name) ? theme.styles.text : null }>{dish.name}</Text>
                </View>
            </Pressable>
        )
    }

    const DishItem = ({dish}) => {

        dish.imagePath = 'https://via.placeholder.com/728x90.png';

        return (
            <View style={[classes.flatListItem, classes.flatListItemTouchableArea]}>

                <View style={classes.flatListItemContent}>
                    
                    <Image style={classes.image} source={{uri: dish.imagePath === '#' ? 'https://via.placeholder.com/40x40.png' : dish.imagePath}} />
                    
                    <View style={classes.flatListItemContentName}>
                        <Text>{dish.name}</Text>
                        <Text style={theme.styles.detailsText}>{dish.category}</Text>
                    </View>
                </View>
            </View>
        )
    }

    useEffect(() => {
        let data = plannedDishes.find(item => {
            return item.date === selectedDay.dateString
        });

        if (data === undefined) {
            data = {date: '', midi: [], soir: []};
        }

        setDishesArr({...data});
    }, [selectedDay])

    return (
        <SafeAreaView style={theme.styles.viewContainer}>
            
            <View>
                <Calendar
                    firstDay={1}
                    current={selectedDay.dateString}
                    enableSwipeMonths={true}
                    onDayPress={(day) =>handleDayPressed(day)} />
            </View>

            <View style={[classes.dishesList, theme.styles.container]}>
                <Text style={theme.styles.mainTitle}>List des plats</Text>

                <View style={classes.container}>
                    <Text style={theme.styles.secondTitle}>Midi</Text>
                    {
                        dishesArr.midi.length > 0 && (
                            <FlatList
                                data={dishesArr.midi}
                                keyExtractor={item => `dish-midi-${item.id}`}
                                ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                renderItem={({item}) => <DishItem dish={{...item}} />} />
                        )
                    }

                    {
                        dishesArr.midi.length === 0 && (
                            <Text style={theme.styles.detailsText}>Vous n'avez pas planifié de plat pour le déjeuner.</Text>
                        )
                    }
                    
                    {
                        dishesArr.midi.length < 3 && (
                            <View style={classes.buttonContainer}>
                                <TouchableHighlight style={classes.button}
                                    activeOpacity={0.6}
                                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                                    onPress={()=>openModal(true, 'midi')}>
                                    <Text>Ajouter un déjeuner</Text>
                                </TouchableHighlight>
                            </View>
                        )
                    }
                    
                </View>

                <View>
                    <Text style={theme.styles.secondTitle}>Soir</Text>
                    {
                        dishesArr.soir.length > 0 && (
                            <FlatList
                                data={dishesArr.soir}
                                keyExtractor={item => `dish-soir-${item.id}`}
                                ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                renderItem={({item}) => <DishItem dish={{...item}} />} />
                        )
                    }

                    {
                        dishesArr.soir.length === 0 && (
                            <Text style={theme.styles.detailsText}>Vous n'avez pas planifié de plat pour le diner.</Text>
                        )
                    }
                    
                    {
                        dishesArr.soir.length < 3 && (
                            <View style={classes.buttonContainer}>
                                <TouchableHighlight style={classes.button}
                                    activeOpacity={0.6}
                                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}
                                    onPress={()=>openModal(true, 'soir')}>
                                    <Text>Ajouter un diner</Text>
                                </TouchableHighlight>
                            </View>
                        )
                    }
                </View>
            </View>

            <Modal animationType="slide" transparent='true' visible={isModalOpen}>
                <View style={classes.centeredView}>
                    <View style={classes.modalView}>
                        <Text style={theme.styles.mainTitle}>Liste des plats prévus</Text>
                        <View style={classes.areaToggler}>
                            <TouchableHighlight style={[classes.buttonToggler, toggle.name === 'planned' ? classes.active : null]}
                                    onPress={() => setToggle({name:'planned', list: plannedDishes})}
                                    activeOpacity={0.6}
                                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}>
                                <Text style={toggle.name === 'planned' ? theme.styles.text : null}>Prévu</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={[classes.buttonToggler, toggle.name === 'base' ? classes.active : null]}
                                    onPress={() => setToggle({name:'base', list: dishes})}
                                    activeOpacity={0.6}
                                    underlayColor={theme.TOUCHABLE_OPACITY_COLOR}>
                                <Text style={toggle.name === 'base' ? theme.styles.text : null}>Base</Text>
                            </TouchableHighlight>
                        </View>
                        {
                            toggle.list.length > 0 && (
                                <FlatList 
                                    style={classes.modalFlatListItems}
                                    data={toggle.list}
                                    keyExtractor={item => `dish-${item.id + idGenerator()}-${item.name}`}
                                    ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                    renderItem={({item}) => <FlatListItem dish={item}  />}/>
                            )
                        }

                        {
                            !toggle.list || toggle.list.length === 0 && (
                                <Text style={theme.styles.detailsText}>Il n'y a rien.</Text>
                            )
                        }

                        <View style={classes.actionsArea}>

                            <Button
                                style={classes.modalBtn}
                                disabled={selectedItems.length === 0 ? true : false}
                                onPress={() => addToDishesList()}
                                title="Ajouter" />

                            <Button
                                style={classes.modalBtn}
                                onPress={() => setIsModalOpen(false)}
                                title="Annuler" />
                        </View>
                        
                    </View>
                </View>
                
            </Modal>

        </SafeAreaView>
    )
}

const classes = StyleSheet.create({
    dishesList: {
        flexDirection: 'column',
    },
    container: {
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 20
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.TEXT_SECONDARY_COLOR,
        
        height: 55,
        width: "100%",
        borderRadius: 5,
        margin: 5,
    },
    modalView: {
        minHeight: 500,
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
    modalFlatListItems: {
        overflow: 'scroll',
        height: 400,
        width: '100%'
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
      areaToggler: {
          paddingLeft: 30,
          paddingRight: 30,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around'
      },
      buttonToggler: {
          height: 40,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 40,
          paddingLeft: 40,
        
          borderRadius: 5,
          borderWidth: 1,
          borderColor: theme.TEXT_SECONDARY_COLOR,
          borderRadius: 5,
      },
      active: {
          backgroundColor: theme.MAIN_COLOR
      },
      
    flatListItem: {
        width: '100%',
        position: 'relative',
        minHeight: 30
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
})

export default PlannerScreen;