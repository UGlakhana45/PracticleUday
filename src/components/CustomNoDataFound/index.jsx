import {View, Text, Image} from 'react-native';
import React from 'react';
import {fonts, IMAGES} from '../../assets';
import {height} from '../../utills/helper';
import {COLORS} from '../../utills/colors';
import {scale} from 'react-native-size-matters';
import CustomButton from '../CustomButton';

const CustomNoDataFound = ({text, isCart}) => {
  return (
    <View
      style={{
        flex: 1,
        height: height * 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        gap: isCart ? height * 0.02 : 0,
      }}>
      <Image
        source={IMAGES.noData}
        style={{
          width: height * 0.3,
          height: height * 0.3,
          resizeMode: 'contain',
        }}
      />
      <Text
        style={{
          fontSize: scale(18),
          fontFamily: fonts.MontserratMedium,
          color: COLORS.heading,
          textAlign: 'center',
        }}>
        {text}
      </Text>
      {isCart && (
        <CustomButton
          title={'Go To Product'}
          smallButton
          onPress={() => navigation.navigate(SCREENS.PRODUCTLIST.name)}
        />
      )}
    </View>
  );
};

export default CustomNoDataFound;
