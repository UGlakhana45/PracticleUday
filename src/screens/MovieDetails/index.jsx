import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Install and configure this
import { height, showSuccess, width } from '../../utills/helper';
import { ICONS } from '../../assets';
import { COLORS } from '../../utills/colors';
import auth from '@react-native-firebase/auth';
const MovieDetails = ({ route }) => {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
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

  const checkFavoriteStatus = async () => {
    if (!userId) return;
    try {
      const doc = await firestore()
        .collection('favorites')
        .doc(userId)
        .collection('movies')
        .doc(movie.id.toString())
        .get();

      if (doc.exists) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!userId) {
      Alert.alert('Not Authenticated', 'Please log in to add favorites.');
      return;
    }
    try {
      const movieRef = firestore()
        .collection('favorites')
        .doc(userId)
        .collection('movies')
        .doc(movie.id.toString());

      if (isFavorite) {
        await movieRef.delete();
        setIsFavorite(false);
        showSuccess('Removed from Favorites');
      } else {
        await movieRef.set({
          id: movie.id,
          title: movie.title,
          release_date:movie.release_date,
          overview:movie.overview,
          poster_path: movie.poster_path,
        });
        setIsFavorite(true);
        showSuccess('Added to Favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  
  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    checkFavoriteStatus();
  }, [userId]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.favoriteContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
         <Image 
            source={isFavorite ? ICONS.favFill : ICONS.fav} style={styles.hIcon}
 />           
        </TouchableOpacity>
      </View>
      <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  releaseDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#333',
  },
  hIcon:{
    height:height * 0.03,
    width:height * 0.03,
    tintColor:COLORS.primary
  }
});

export default MovieDetails;
