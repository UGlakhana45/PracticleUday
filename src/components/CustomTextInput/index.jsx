import React, {forwardRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {Controller} from 'react-hook-form';
import {useStyles} from './style';
import {COLORS} from '../../utills/colors';
import {scale} from 'react-native-size-matters';
import {fonts, ICONS} from '../../assets';
import {height, width} from '../../utills/helper';
import {TextInputMask} from 'react-native-masked-text';

const CustomTextInput = forwardRef((props, ref) => {
  const {
    placeholder,
    icon,
    type,
    control,
    rules,
    name,
    onSubmitEditing,
    onFocus,
    readOnly,
    KeyboardType,
    onBlur,
    editable,
    multiline,
    isFocused,
    isLabel,
    widthProp,
    rightIcon,
    rightIconOnPress,
  } = props;
  const [focused, setFocused] = useState(false);
  const [eye, setEye] = useState(false);
  const styles = useStyles();
  let returnKeyType = 'next';
  if (name === 'password-repeat') {
    returnKeyType = 'done';
  }
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View style={{gap: 5}}>
          {isLabel && (
            <Text
              style={{
                color: COLORS.black,
                fontSize: scale(13),
                fontFamily: fonts.MontserratMedium,
              }}>
              {isLabel}
            </Text>
          )}

          <View
            style={[
              styles.mainContainer,
              {
                width:
                  name === 'mobile'
                    ? width * 0.61
                    : widthProp
                    ? widthProp
                    : width * 0.9,
              },
            ]}>
            <TouchableWithoutFeedback
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}>
              <View
                style={
                  error
                    ? [
                        multiline
                          ? styles.mainContainerMultilineError
                          : styles.errorView,
                        {
                          backgroundColor: COLORS.white,
                          borderColor: COLORS.error,
                        },
                      ]
                    : focused
                    ? [
                        multiline
                          ? styles.mainContainerMultilinefocus
                          : styles.focusedView,
                        {
                          backgroundColor: COLORS.white,
                          borderColor: COLORS.primary,
                        },
                      ]
                    : [
                        multiline
                          ? styles.mainContainerMultilineView
                          : styles.view,
                        {
                          backgroundColor: COLORS.white,
                        },
                      ]
                }>
                {icon && (
                  <Image
                    source={icon}
                    style={{
                      height: height * 0.03,
                      width: height * 0.03,
                      resizeMode: 'contain',
                      marginRight: height * 0.02,
                    }}
                  />
                )}
                {multiline ? (
                  <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={COLORS.heading}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={[styles.textInput, {color: COLORS.primary}]}
                    secureTextEntry={type === 'password' && !eye}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={false}
                    onFocus={onFocus}
                    keyboardType={KeyboardType}
                    autoCorrect={false}
                    multiline={multiline}
                    numberOfLines={6}
                    editable={editable}
                    textAlignVertical="top"
                  />
                ) : name === 'mobile' ? (
                  <TextInputMask
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={COLORS.heading}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={[
                      styles.textInput,
                      {
                        color:
                          editable === false ? COLORS.heading : COLORS.heading,
                      },
                    ]}
                    secureTextEntry={type === 'password' && !eye}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    keyboardType={'phone-pad'}
                    blurOnSubmit={false}
                    onFocus={onFocus}
                    editable={editable}
                    type="custom"
                    options={{
                      mask: '999-999-9999',
                    }}
                  />
                ) : (
                  <TextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor={COLORS.heading}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    style={[
                      styles.textInput,
                      {
                        color:
                          editable === false ? COLORS.heading : COLORS.heading,
                      },
                    ]}
                    secureTextEntry={type === 'password' && !eye}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={false}
                    onFocus={onFocus}
                    editable={editable}
                    keyboardType={KeyboardType}
                    autoCorrect={false}
                    multiline={multiline}
                  />
                )}

                {type === 'password' && (
                  <TouchableOpacity onPress={() => setEye(!eye)}>
                    <Image
                      source={eye ? ICONS.eye : ICONS.eyeclose}
                      style={{
                        height: height * 0.025,
                        width: height * 0.025,
                        tintColor: COLORS.heading,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                )}
                {rightIcon && (
                  <TouchableOpacity onPress={rightIconOnPress}>
                    <Image
                      source={rightIcon}
                      style={{
                        height: height * 0.025,
                        width: height * 0.025,
                        resizeMode: 'contain',
                        tintColor: COLORS.heading,
                      }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
            {error && (
              <Text style={[styles.errorText, {color: COLORS.error}]}>
                {error.message || 'Error'} *
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
});

export default CustomTextInput;
