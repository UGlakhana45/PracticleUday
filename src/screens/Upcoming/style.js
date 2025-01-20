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
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    row: {
      justifyContent: 'space-between', // Space between items
      marginBottom: 16,
    },
    movieItem: {
      width: width / 2 - 24, 
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      padding: 8,
    },
    movieImage: {
      width: '100%',
      height: 150,
      borderRadius: 8,
    },
    movieTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
      textAlign: 'center',
    },
    movieDate: {
      fontSize: 14,
      color: '#666',
      marginTop: 4,
      textAlign: 'center',
    },
    footerLoading: {
      marginVertical: 20,
    },
  });
};
