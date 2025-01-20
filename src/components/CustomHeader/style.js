import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {fonts} from '../../assets';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';

export const useStyle = () => {
  return StyleSheet.create({
    view: {
      flexDirection: 'row',
      marginHorizontal: height * 0.02,
      marginTop: height * 0.01,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      textAlign: 'center',
      fontSize: scale(16),
      color: COLORS.heading,
      fontFamily: fonts.MontserratSemibold,
      flexGrow: 1,
    },
    firstView: {
      justifyContent: 'flex-start',
      width: width * 0.15,
    },
    secondView: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.6,
    },
    textBack: {
      color: COLORS.heading,
      fontSize: scale(14),
      fontFamily: fonts.MontserratSemibold,
    },
    rightText: {
      color: COLORS.heading,
      fontSize: scale(14),
      fontFamily: fonts.MontserratSemibold,
    },
    thirdView: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: width * 0.12,
    },
    thirdView1: {
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    dotItem: {
      height: height * 0.025,
      width: height * 0.025,
      tintColor: COLORS.heading,
    },
  });
};
