import React, { useEffect ,useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import YoutubeCard from '../components/YoutubeCard';
import axios from 'axios';
const MyComponent = () => {
  const [videos,setVideos] = useState([]); 
  useEffect(()=>{
    const fetchData = ()=>{
      axios.get('http://localhost:3000/youtube').then((response)=>{
          setVideos(response.data);
      }).catch((err)=>{
        console.log(err);
      })
    };
    fetchData();  
  },[]);
 console.log("events",videos);
  const renderItem = ({ item }) => (
    <YoutubeCard name={item.name} image={item.image} description={item.description} url={item.url}  />
  );
  return (
    <View style={styles.container}>
      <Text style={{fontSize:24,fontWeight:'bold',marginLeft:15}}>Podcasts</Text>
      <Text style={{marginTop:8,marginLeft:15}}>Check out the latest podcasts</Text>
      <FlatList
        style={{marginTop:10}}
        data={videos}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
});

export default MyComponent;