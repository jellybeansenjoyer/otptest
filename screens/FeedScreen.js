import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
        <Image style={{width:'100%',height:200 , aspectRatio:16/9 }} source={{uri:'https://tfipost.in/wp-content/uploads/sites/2/2021/10/coming_soon_hindi_meaning-1140x570.jpg'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;