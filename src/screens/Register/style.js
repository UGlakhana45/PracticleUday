import {Platform, StyleSheet} from 'react-native';
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
      marginTop: Platform.OS === 'android' ? height * 0.08 : 0,
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
    absolute: {
      position: 'absolute',
      width,
      height,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: width * 0.85,
      backgroundColor: 'white',
      borderRadius: scale(20),
      padding: scale(20),
      alignItems: 'center',
      elevation:5
    },
    modalContent: {
      alignItems: 'center',
      gap: scale(20),
    },
    title: {
      fontSize: scale(14),
      fontFamily: fonts.MontserratSemibold,
      color: COLORS.heading,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: scale(13),
      textAlign: 'center',
      fontFamily: fonts.MontserratMedium,
      color: COLORS.heading,
    },
    phoneNumber: {
      fontSize: scale(20),
      fontFamily: fonts.MontserratExtraBold,
      color: COLORS.heading,
      textAlign: 'center',
    },
    actionRow: {
      gap: scale(10),
      marginTop: height * 0.02,
      marginHorizontal: height * 0.02,
    },
    cancelButton: {
      padding: scale(10),
      borderColor: COLORS.primary,
      borderWidth: 1.5,
      borderRadius: 10,
      width: width * 0.3,
    },
    cancelText: {
      color: COLORS.primary,
      textAlign: 'center',
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(13),
    },
    nextButton: {
      padding: scale(10),
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      width: width * 0.3,
    },
    verifyButton: {
      padding: scale(10),
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      width: width * 0.72,
    },
    nextText: {
      color: COLORS.white,
      textAlign: 'center',
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(13),
    },
    otpInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      width: '80%',
      borderRadius: scale(10),
      padding: scale(10),
      textAlign: 'center',
    },
    resendText: {
      color: COLORS.heading,
      textAlign: 'center',
      fontFamily: fonts.MontserratMedium,
      fontSize: scale(13),
    },
    resendLink: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    successIcon: {
      width: height * 0.1,
      height: height * 0.1,
      marginBottom: scale(10),
    },
  });
};
