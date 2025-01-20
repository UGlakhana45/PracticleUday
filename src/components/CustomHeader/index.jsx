import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useStyle} from './style';
import {ICONS} from '../../assets';
import {height} from '../../utills/helper';
import {COLORS} from '../../utills/colors';

const CustomHeader = props => {
  const {
    title,
    icon,
    navigation,
    rightIconOnPress,
    NoLeftIcon,
    pageName,
    onPress,
    titlePress,
    rightICon,
  } = props;
  const styles = useStyle();

  return (
    <View style={styles.view}>
      <View style={styles.firstView}>
        {!NoLeftIcon && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={ICONS.back}
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
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.secondView}
        onPress={titlePress}>
        {title && <Text style={styles.title}>{title}</Text>}
      </TouchableOpacity>
      <View style={styles.thirdView}>
        {pageName && (
          <TouchableOpacity activeOpacity={0.7} onPress={rightIconOnPress}>
            <Text style={styles.rightText} onPress={onPress}>
              {pageName}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.thirdView1}>
        {rightICon && (
          <TouchableOpacity activeOpacity={0.7} onPress={rightIconOnPress}>
            <Image source={rightICon} style={styles.dotItem} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;
