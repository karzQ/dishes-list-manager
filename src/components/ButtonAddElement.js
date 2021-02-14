import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {idGenerator} from '../utils/commons';
import { View, Text, FlatList, StyleSheet, Pressable, Modal, Button, TextInput } from 'react-native';
import FlatListItemSeparator from '../components/FlatListItemSeparator';

import * as theme from '../config/theme';

const ButtonAddElement = ({dispatchAction, listItems, listName, quantityIsNeeded}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemQuantity, setItemQuantity] = useState(1);

    const dispatch = useDispatch();

    const closeModale = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    }

    const addItemModale = () => {
        const obj = {...selectedItem, quantity: quantityIsNeeded === true ? itemQuantity : 1};
        setIsModalOpen(false);
        dispatch({type: dispatchAction, payload: obj})
    }

    const FlatListItem = ({item}) => {
        return (
            <>
                {
                    item && (
                        <Pressable
                            style={[selectedItem !== null && (selectedItem.name === item.name) ? theme.styles.selected : null , classes.modalFlatListItemContainer]}
                            onPress={() => setSelectedItem({...item})}>
                            <View>
                                <Text style={selectedItem !== null && (selectedItem.name === item.name) ? theme.styles.text : null }>{item.name}</Text>
                            </View>
                        </Pressable>
                    )
                }
            </>
        )
    }

    const handleChangeQuantity = (value) => {
        setItemQuantity(+value);
    }

    return (
        <>
            <Modal animationType="slide" transparent='true' visible={isModalOpen}>
                <View style={classes.centeredView}>
                    <View style={classes.modalView}>
                        <Text style={theme.styles.mainTitle}>{listName}</Text>
                        { 
                            quantityIsNeeded && (
                                <TextInput
                                    textAlign='right'
                                    style={classes.modaleTextInput}
                                    keyboardType="number-pad"
                                    value={`${itemQuantity}`}
                                    onChangeText={value => handleChangeQuantity(value)} />
                            )
                        }

                        {
                            listItems.length > 0 && (
                                <FlatList 
                                    style={classes.modalFlatListItems}
                                    data={listItems}
                                    keyExtractor={item => `item-${item.id + idGenerator()}-${item.name}`}
                                    ItemSeparatorComponent={() => <FlatListItemSeparator />}
                                    renderItem={({item}) => <FlatListItem item={item}  />}/>
                            )
                        }

                        {
                            !listItems || listItems.length === 0 && (
                                <Text style={theme.styles.detailsText}>Il n'y a rien.</Text>
                            )
                        }

                        <View style={classes.actionsArea}>

                            <Button
                                style={classes.modalBtn}
                                disabled={selectedItem === null || selectedItem === undefined ? true : false}
                                onPress={() => addItemModale()}
                                title="Add to cart" />

                            <Button
                                style={classes.modalBtn}
                                onPress={() => closeModale()}
                                title="Back" />
                        </View>
                        
                    </View>
                </View>
                
            </Modal>
                
            <View style={classes.absoluteButtonAddElementContainer}>
                <Pressable style={classes.absoluteButtonAddElement}
                    onPress={() => setIsModalOpen(true)}>
                    <View style={classes.absoluteButtonAddElementContent}>
                        <Text style={classes.text}>+</Text>
                    </View>
                </Pressable>
            </View>
        </>
    )
}

const classes = StyleSheet.create({
    
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
  
      centerRow: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      },
  
      modalView: {
        backgroundColor: "white",
        width: theme.width - 50,
        borderRadius: 5,
        padding: 25,
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
  
      modalBtn: {
        backgroundColor: theme.MAIN_COLOR,
        padding: 10,
        borderRadius: 5,
        width: 100
      },
      
      absoluteButtonAddElementContainer: {
        position: "absolute",
        height: 60,
        width: '100%',
        bottom: 20,
        right: 20
      },
  
      absoluteButtonAddElement: {
        position: 'absolute',
        width: 60,
        height: '100%',
        backgroundColor: theme.MAIN_COLOR,
        right: 0,
        borderRadius: 50
      },
  
      absoluteButtonAddElementContent: {
        height: '100%',
        width: '100%',
        textAlign: "center",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      modaleTextInput: {
        width: '100%',
        height: 40,
        paddingRight: 15,
        borderColor: theme.TEXT_SECONDARY_COLOR,
        borderWidth: 1
      },
      actionsArea: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
      },
      text: {
        color: theme.TEXT_COLOR,
        fontSize: 20,
        fontWeight: 'bold'
      }
})


export default ButtonAddElement;