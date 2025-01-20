import {StyleSheet} from 'react-native';
import {COLORS} from '../../utills/colors';
import {fonts} from '../../assets';
import {height} from '../../utills/helper';

export const useStyle = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: height * 0.13,
      height: height * 0.13, // Adjust logo height
      resizeMode: 'contain', // Ensure the logo maintains its aspect ratio
    },
  });
};
