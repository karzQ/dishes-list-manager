import React from 'react';
import { View, Text } from 'react-native';

import * as theme from '../config/theme';

const FlatListHeader = ({title}) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}

export default FlatListHeader;