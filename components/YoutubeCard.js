import React from 'react';
import { View, Text, StyleSheet, Image,Linking,Pressable } from 'react-native';
const Card = ({ name, image , description , url}) => {
    const openYouTubeURL = () => {
          const youtubeURL = url;          
          Linking.canOpenURL(youtubeURL)
            .then((supported) => {
              if (supported) {
                console.log('Can open YouTube URL');
                Linking.openURL(youtubeURL);
              } else {
                console.log('Cannot open YouTube URL');
              }
            })
            .catch((error) => {
              console.error('Error opening YouTube URL', error);
            });
        };
  return (
    <Pressable onPress={openYouTubeURL}>
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>{description}</Text> 
      </View>
    </View>
    </Pressable>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
    margin: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default Card;