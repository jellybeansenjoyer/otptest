import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
        <Image style={{width:'100%',height:200 , aspectRatio:16/9 }} source={require('../comingsoon.jpg')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;