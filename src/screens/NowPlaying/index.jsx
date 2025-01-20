



import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useStyles } from './style';
import { COLORS } from '../../utills/colors';
import { useFocusEffect } from '@react-navigation/native';

const NowPlaying = ({ navigation }) => {
  const styles = useStyles();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const fetchMovies = async (pageNumber) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjJjOTFhZDNhYTY1Mzc1MWI0NjQ0MzM0Zjg3NmYyMCIsIm5iZiI6MTczNzE4ODg5OS45Niwic3ViIjoiNjc4YjY2MjM2OGUwZDg3MzYzNmRjZDM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1KTn9V-WHcChYqBFam5lBqt4dm3Dzm6IxJseFaqrQUo',
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  useFocusEffect(
    useCallback(() => {
      if (movies.length === 0) {
        setLoading(true);
        fetchMovies(1); 
      }
    }, [movies])
  );

  const loadMoreMovies = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <ActivityIndicator size="large" color={COLORS.primary} style={styles.footerLoading} />;
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
        resizeMode="cover"
      />
      <Text style={styles.movieTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.movieDate}>Release: {item.release_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Now Playing</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Display two items per row
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row} // Styles for wrapping rows
        />
      )}
    </View>
  );
};

export default NowPlaying;
