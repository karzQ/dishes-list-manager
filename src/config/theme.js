import { StyleSheet, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('screen');

export const MAIN_COLOR = '#0067B3';
export const ALERT_COLOR = 'tomato';
export const TEXT_COLOR = 'white';
export const TEXT_SECONDARY_COLOR = 'darkgray';
export const TOUCHABLE_OPACITY_COLOR = 'lightgrey';

export const styles = StyleSheet.create({
    viewContainer: {
      position: 'relative',
      height: height-64-48,
      width: width,
      flex: 1
    },

    container: {
      position: 'relative',
      width: '100%',
      padding: 20
    },

    listTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 6
    },

    mainTitle: {
      fontSize: 24,
      fontWeight: '500',
      marginBottom: 20
    },

    secondTitle: {
      fontSize: 16,
      fontWeight: '300',
      marginBottom: 10
    },

    text: {
      color: TEXT_COLOR,
    },

    detailsText: {
      color: TEXT_SECONDARY_COLOR
    },

    selected: {
      backgroundColor: MAIN_COLOR,
      color: TEXT_COLOR
    },
    capitalized: {
      textTransform: 'capitalize'
    },
    bold: {
      fontWeight: 'bold'
    }
})