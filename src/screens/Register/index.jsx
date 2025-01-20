import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useStyles} from './style';
import {fonts, ICONS, IMAGES} from '../../assets';
import CustomTextInput from '../../components/CustomTextInput';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {SCREENS} from '../../utills/const';
import {useDispatch} from 'react-redux';
import {
  height,
  showError,
  showSuccess,
  validationSchema,
  width,
} from '../../utills/helper';
import {scale} from 'react-native-size-matters';
import {yupResolver} from '@hookform/resolvers/yup';
import {BlurView} from '@react-native-community/blur';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
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
    getValues,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      cpassword:'',
      address:'',
    },
    resolver: yupResolver(validationSchema),
  });
  const newPassword = watch('password');
  const onSignInPressed = async data => {
    console.log('data: ', data);
    setIsLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      const user = userCredential.user;
      await user.sendEmailVerification();
      await firestore().collection('users').doc(user.uid).set({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        created_at: new Date(),
        address:data.address,
      });

      setIsLoading(false);
      setIsModalVisible(true);
      showSuccess('User Created Successfully!');
    } catch (error) {
      console.log('error: ', error.message);
      showError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} />
      <ScrollView
        style={styles.scrollviewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainConatiner}>
          <View
            style={{
              marginBottom: height * 0.025,
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
                Create New Account
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  fontFamily: fonts.MontserratMedium,
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  width: width * 0.8,
                }}>
                Set up your username and password.
              </Text>
              <Text
                style={{
                  fontSize: scale(14),
                  fontFamily: fonts.MontserratMedium,
                  color: COLORS.textSecondary,
                  textAlign: 'center',
                  width: width * 0.8,
                }}>
                You can alwaye change it latar.
              </Text>
            </View>
          </View>
          <View style={{gap: height * 0.02}}>
            <CustomTextInput
              name="first_name"
              placeholder="First Name"
              control={control}
              rules={{
                required: 'First Name is required',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'First Name must contain only letters',
                },
                minLength: {
                  value: 3,
                  message: 'First Name must be at least 3 characters long',
                },
              }}
            />
            <CustomTextInput
              name="last_name"
              placeholder="Last Name"
              control={control}
              rules={{
                required: 'Last Name is required',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Last Name must contain only letters',
                },
                minLength: {
                  value: 3,
                  message: 'Last Name must be at least 3 characters long',
                },
              }}
            />
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
             <CustomTextInput
                name="cpassword"
                type="password"
                placeholder="Enter Confirm Password"
                secureTextEntry
                control={control}
                rules={{
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === newPassword || 'Passwords do not match',
                }}
              />
               <CustomTextInput
              name="address"
              placeholder="Address"
              control={control}
              rules={{
                required: 'Address is required',
                minLength: {
                  value: 15,
                  message: 'Address must be at least 3 characters long',
                },
              }}
            />
          </View>

          <View style={styles.btn}>
            <CustomButton
              loading={isLoading}
              disabled={isLoading}
              title="Register"
              onPress={handleSubmit(onSignInPressed)}
            />
          </View>
          <Text style={styles.individualText}>
            Already have an account?{' '}
            <Text
              style={{
                fontFamily: fonts.MontserratMedium,
                fontSize: scale(14),
                color: COLORS.primary,
              }}
              onPress={() => {
                navigation.navigate(SCREENS.LOGIN.name);
              }}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
      {isModalVisible && 
      <Modal transparent visible={isModalVisible} animationType="fade">
      
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Image source={ICONS.check} style={styles.successIcon} />
              <Text style={styles.phoneNumber}>
                Account Created Successfully
              </Text>
              <Text style={styles.subtitle}>
                Your account has been created successfully. Listen to your
                favorite music.
              </Text>
              <CustomButton
                smallButton
                title={'Go to Home'}
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

export default Register;
