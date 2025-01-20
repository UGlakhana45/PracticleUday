import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useStyles} from './style';
import {fonts, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {SCREENS} from '../../utills/const';
import {height, showError, width} from '../../utills/helper';
import {scale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {userData, userToken} from '../../redux/reducers/authSlice';


const Login = ({navigation}) => {
  const styles = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState();
  const password = useRef(null);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();


  const onSignInPressed = async data => {
    setIsLoading(true);
    const {email, password} = data;
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const {uid} = userCredential.user;
      const token = await userCredential.user.getIdToken();
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        dispatch(userToken(token));
        dispatch(userData(userDoc?.data()));
       navigation.navigate(SCREENS.NOWPLAYING.name);
      } else {
        showError('User record not found in Firestore.');
      }
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/user-not-found') {
        showError('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        showError('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        showError('Invalid email address.');
      } else if (error.code === 'auth/invalid-credential') {
        showError('Invalid Credential');
      } else {
        showError('An error occurred. Please try again.');
      }
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
                Welcome Back
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  fontFamily: fonts.MontserratMedium,
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  width: width * 0.8,
                }}>
                Login to your account using email or social networks
              </Text>
            </View>
          </View>
          <View style={{gap: height * 0.025}}>
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
            <CustomTextInput
              name="password"
              icon={ICONS.password}
              type="password"
              placeholder="Password"
              secureTextEntry
              control={control}
              rules={{
                required: 'Password is required',
              }}
              ref={password}
              KeyboardType={undefined}
              onSubmitEditing={handleSubmit(onSignInPressed)}
              returnKeyType="next"
            />
          </View>
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate(SCREENS.FORGOTPASSWORD.name)}>
            Forgot Your Password?
          </Text>
          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Log In"
              onPress={handleSubmit(onSignInPressed)}
            />
          </View>
          <Text style={styles.individualText}>
            Didn't have an account?{' '}
            <Text
              style={{
                fontFamily: fonts.MontserratMedium,
                fontSize: scale(14),
                color: COLORS.primary,
              }}
              onPress={() => {
                navigation.navigate(SCREENS.REGISTER.name, {
                  isEditable: false,
                  driverData: null,
                });
              }}>
              Register
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
