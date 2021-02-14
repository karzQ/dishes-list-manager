import React from 'react';
import { View, Text } from 'react-native';

const FlatListIngredientItem = ({ingredient}) => {
    return (
        
        <View>
            <View>
                <Text>{ingredient.name}</Text>
                {
                    ingredient.details !== '' && (
                        <Text> - {ingredient.details}</Text>
                    )
                }
                </View>
            <Text>{ingredient.quantity}{ingredient.unit}</Text>
        </View>
    )
}

export default FlatListIngredientItem;