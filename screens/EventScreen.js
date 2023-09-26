import React, { useEffect ,useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import axios from 'axios';
const MyComponent = () => {
  const [events,setEvents] = useState([]); 
  useEffect(()=>{
    const fetchData = ()=>{
      axios.get('http://localhost:3000/events').then((response)=>{
          setEvents(response.data);
      }).catch((err)=>{
        console.log(err);
      })
    };
    fetchData();  
  },[]);
 console.log("events",events);
  const renderItem = ({ item }) => (
    <Card name={item.name} image={item.image} people={item.people} active={item.active} address={item.address} date={item.date}  />
  );
  return (
    <View style={styles.container}>
      <Text style={{fontSize:24,fontWeight:'bold',marginLeft:15}}>Latest Events:</Text>
      <Text style={{marginTop:8,marginLeft:15}}>Check out the latest upcoming events</Text>
      <FlatList
        style={{marginTop:10}}
        data={events}
        keyExtractor={(item) => item.id}
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