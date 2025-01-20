import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import React, { useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {fonts, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {SCREENS} from '../../utills/const';
import {height, showError, width} from '../../utills/helper';
import {scale} from 'react-native-size-matters';
import CustomHeader from '../../components/CustomHeader';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const password = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleAccountCreated = () => {
      setIsModalVisible(false);
      navigation.navigate(SCREENS.LOGIN.name);
    };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async (data) => {
    const { email } = data;
    setIsLoading(true);

    try {
      await auth().sendPasswordResetEmail(email);
      setIsModalVisible(true)
    } catch (error) {
      console.error('Error sending password reset email:', error);
      let errorMessage = 'Something went wrong. Please try again later.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      }
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.white}
        translucent={false}
        barStyle={'light-content'}
      />
      <CustomHeader title="Forgot Password" navigation={navigation} />
      <ScrollView
        style={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainConatiner}>
          <View
            style={{
              marginVertical: height * 0.025,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              gap: height * 0.02,
            }}>
            <Image
              source={IMAGES.logo}
              style={{
                height: height * 0.07,
                width: height * 0.07,
                resizeMode: 'contain',
              }}
            />
            <View style={{gap: 5}}>
              <Text
                style={{
                  fontSize: scale(24),
                  fontFamily: fonts.MontserratExtraBold,
                  color: COLORS.heading,
                  textAlign: 'center',
                }}>
                Forgot Password
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  fontFamily: fonts.MontserratMedium,
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  width: width * 0.8,
                }}>
                Enter email address and we'll send email to reset your password.
              </Text>
            </View>
          </View>

          <CustomTextInput
            name="email"
            placeholder="Email"
            type="text"
            control={control}
            icon={ICONS.email}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address',
              },
            }}
            KeyboardType={undefined}
            onSubmitEditing={() => password?.current?.focus()}
            returnKeyType="next"
          />

          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Forgot Password"
              onPress={handleSubmit(onSignInPressed)}
            />
          </View>
        </View>
      </ScrollView>
      {isModalVisible && 
      <Modal transparent visible={isModalVisible} animationType="fade">
      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Image source={ICONS.check} style={styles.successIcon} />
              <Text style={styles.phoneNumber}>
              Password Reset Email Sent
              </Text>
              <Text style={styles.subtitle}>
              Please check your email to reset your password.
              </Text>
              <CustomButton
                smallButton
                title={'Go to Login'}
                onPress={handleAccountCreated}
              />
            </View>
          </View>
        </View>
      </Modal>
}
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
