import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {userToken} from '../../redux/reducers/authSlice';
import {useStyles} from './style';
import {COLORS} from '../../utills/colors';
import CustomButton from '../../components/CustomButton';
import {ICONS} from '../../assets';
import {height} from '../../utills/helper';
import {useFocusEffect} from '@react-navigation/native';
import {SCREENS} from '../../utills/const';
import CustomNoDataFound from '../../components/CustomNoDataFound';

const Favorites = ({navigation}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  // Get the current authenticated user's ID
  const getCurrentUser = () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid); // Set the current user's ID
    } else {
      Alert.alert('Not Authenticated', 'Please log in to use this feature.');
    }
  };
  // Fetch favorite movies from Firestore
  const fetchFavoriteMovies = async () => {
    try {
      const moviesSnapshot = await firestore()
        .collection('favorites')
        .doc(userId)
        .collection('movies')
        .get();

      const movies = moviesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavoriteMovies(movies);
    } catch (error) {
      console.error('Error fetching favorite movies:', error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Re-fetch movies on tab switch using useFocusEffect
  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies();
    }, [userId]), // No dependencies ensure this runs every time the screen gains focus
  );

  // Handle logout
  const handleLogout = () => {
    dispatch(userToken(null));
    setLogoutVisible(false);
    navigation.reset({
      index: 0,
      routes: [{name: SCREENS.LOGIN.name}],
    });
  };

  // Render each movie
  const renderMovieItem = ({item}) => (
    <TouchableOpacity style={styles.movieItem} onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
      <Image
        source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
        style={styles.movieImage}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.white}
        translucent={false}
        barStyle="dark-content"
      />

      <Text style={styles.heading}>Favourities</Text>
      <FlatList
        data={favoriteMovies}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View>
          <CustomNoDataFound text={'There is no favorities movies from you!'}  />
        </View>
        }
        columnWrapperStyle={styles.row}
      />
      <View style={styles.logoutContainer}>
        <CustomButton title="Logout" onPress={() => setLogoutVisible(true)} />
      </View>
      {logoutVisible && (
        <Modal
          transparent={true}
          visible={logoutVisible}
          animationType="fade"
          onRequestClose={() => setLogoutVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={() => setLogoutVisible(false)}>
                <Image
                  source={ICONS.close}
                  style={{
                    height: height * 0.03,
                    width: height * 0.03,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Confirm Logout?</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to logout?
              </Text>
              <View style={styles.modalActions}>
                <CustomButton
                  title={'Logout'}
                  smallButton
                  onPress={() => handleLogout()}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Favorites;
