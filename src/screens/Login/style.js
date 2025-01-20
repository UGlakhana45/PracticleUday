import {StyleSheet} from 'react-native';
import {COLORS} from '../../utills/colors';
import {height, width} from '../../utills/helper';
import {fonts} from '../../assets';
import {scale} from 'react-native-size-matters';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollviewContainer: {
      marginHorizontal: height * 0.02,
      marginVertical: height * 0.01,
    },
    mainConatiner: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.card,
      borderRadius: height * 0.01,
      marginVertical: height * 0.02,
    },
    profileContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: height * 0.02,
    },
    logoBg: {
      backgroundColor: COLORS.bg,
      height: height * 0.13,
      width: height * 0.13,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      height: height * 0.08,
      width: height * 0.08,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    text: {
      color: COLORS.white,
      fontFamily: fonts.MontserratBold,
      fontSize: height * 0.04,
    },
    text1: {
      color: COLORS.heading,
      fontFamily: fonts.MontserratBold,
      fontSize: height * 0.04,
    },
    text2: {
      color: COLORS.white,
      fontFamily: fonts.MontserratLight,
      fontSize: height * 0.017,
    },
    logoText: {
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.black,
      textAlign: 'center',
      marginTop: height * 0.06,
      marginBottom: height * 0.02,
      backgroundColor: COLORS.heading,
      alignSelf: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
    },
    errorText: {
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(12),
      color: COLORS.error,
      marginLeft: 15,
    },
    warningContainer: {
      backgroundColor: COLORS.warningBackground,
      paddingHorizontal: height * 0.02,
      paddingVertical: height * 0.01,
      borderRadius: 10,
    },
    profileText: {
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(12),
      color: COLORS.primary,
      marginTop: height * 0.01,
    },
    warningText: {
      fontFamily: fonts.MontserratRegular,
      fontSize: scale(12),
      color: COLORS.warning,
      textAlign: 'left',
    },
    forgotText: {
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.primary,
      textAlign: 'right',
      marginTop: height * 0.01,
    },
    lineView: {
      borderBottomWidth: 1.5,
      borderColor: COLORS.textInputPlaceholder,
      marginVertical: height * 0.015,
    },
    individualText: {
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(14),
      color: COLORS.heading,
      textAlign: 'center',
    },
    btn: {
      marginTop: height * 0.04,
      marginBottom: height * 0.06,
      alignItems: 'center',
    },
  });
};
