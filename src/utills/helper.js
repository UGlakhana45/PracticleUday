import {Dimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {COLORS} from './colors';
import {scale} from 'react-native-size-matters';
import * as Yup from 'yup';
export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

export const showSuccess = message => {
  showMessage({
    message,
    color: COLORS.white,
    textStyle: {
      fontSize: scale(15),
    },
    style: {
      backgroundColor: COLORS.primary,
      padding: height * 0.03,
    },
    type: 'success',
  });
};

export const showError = message => {
  showMessage({
    message,
    type: 'danger',
  });
};

export const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .matches(/^[A-Za-z]+$/i, 'First Name must contain only letters')
    .min(3, 'First Name must be at least 3 characters long'),
  last_name: Yup.string()
    .required('Last Name is required')
    .matches(/^[A-Za-z]+$/i, 'Last Name must contain only letters')
    .min(3, 'Last Name must be at least 3 characters long'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
  cpassword: Yup.string()
    .required('Confirm Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
    address: Yup.string()
    .required('Address is required')
    .min(15, 'Address must be at least 3 characters long'),
});
