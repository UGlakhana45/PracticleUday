import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import {SCREENS} from '../utills/const';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import MyTabs from './BottomTabNavigation';
import MovieDetails from '../screens/MovieDetails';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          key={SCREENS.SPLASHSCREEN.id}
          name={SCREENS.SPLASHSCREEN.name}
          component={SplashScreen}
        />
        <Stack.Screen
          key={SCREENS.LOGIN.id}
          name={SCREENS.LOGIN.name}
          component={Login}
        />
        <Stack.Screen
          key={SCREENS.REGISTER.id}
          name={SCREENS.REGISTER.name}
          component={Register}
        />
        <Stack.Screen
          key={SCREENS.FORGOTPASSWORD.id}
          name={SCREENS.FORGOTPASSWORD.name}
          component={ForgotPassword}
        />
       <Stack.Screen
          key={SCREENS.NOWPLAYING.id}
          name={SCREENS.NOWPLAYING.name}
          component={MyTabs}
        />
          <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;
