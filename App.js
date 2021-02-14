import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';

import { store, persistor } from './src/config/reduxConfig';
import { PersistGate } from 'redux-persist/integration/react';

import Navigation from './src/router';

const App = () => {

  const Loading = () => {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  
  return (
    <StoreProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
