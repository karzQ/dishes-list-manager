import React from 'react';
import { StyleSheet, View} from 'react-native';

const FlatListItemSeparator = () => {
    return (
        <View style={classes.flatListSeparator} />
    )
}

const classes = StyleSheet.create({
    flatListSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: 'lightgrey'
    }
})

export default FlatListItemSeparator;