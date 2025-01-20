import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux';
import FlashMessage from 'react-native-flash-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/utills/colors';
import AppNavigation from './src/navigation/StackNavigation';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView
          style={{flex: 1, backgroundColor: COLORS.white}}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </GestureHandlerRootView>
        <FlashMessage position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
