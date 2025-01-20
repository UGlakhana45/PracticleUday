import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, Text} from 'react-native';
import {fonts, ICONS} from '../assets';
import {SCREENS} from '../utills/const';
import {COLORS} from '../utills/colors';
import {height} from '../utills/helper';
import {useNavigation} from '@react-navigation/native';
import NowPlaying from '../screens/NowPlaying';
import Popular from '../screens/Popular';
import Upcoming from '../screens/Upcoming';
import Favorities from '../screens/Favorities';
import { scale } from 'react-native-size-matters';

const MyTabs = () => {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const getIconByRouteName = name => {
    switch (name) {
      case SCREENS.NOWPLAYING.name:
        return ICONS.homeIcon;

      case SCREENS.POPULAR.name:
        return ICONS.homeIcon;

      case SCREENS.UPCOMING.name:
        return ICONS.homeIcon;

      case SCREENS.FAVORITES.name:
        return ICONS.homeIcon;
    }
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          height: height * 0.08,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        },
        tabBarIcon: ({focused}) => {
          return (
            <Image
              source={getIconByRouteName(route.name)}
              style={{
                height: height * 0.03,
                width: height * 0.03,
                resizeMode: 'contain',
                tintColor: !focused ? COLORS.textSecondary : COLORS.primary,
              }}
            />
          );
        },
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={{
                fontSize: scale(12),
                fontFamily: fonts.MontserratBold,
                color: focused ? COLORS.primary : COLORS.textSecondary,
                marginBottom: 5,
              }}>
              {route.name}
            </Text>
          );
        },
      })}>
      <Tab.Screen name={'NowPlaying'} component={NowPlaying} />
      <Tab.Screen name={SCREENS.POPULAR.name} component={Popular} />
      <Tab.Screen name={SCREENS.UPCOMING.name} component={Upcoming} />
      <Tab.Screen name={SCREENS.FAVORITES.name} component={Favorities} />
    </Tab.Navigator>
  );
};
export default MyTabs;
