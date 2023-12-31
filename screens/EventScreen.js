import React, { useEffect ,useState } from 'react';
import { View, Text, FlatList, StyleSheet,BackHandler } from 'react-native';
import Card from '../components/Card';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MyComponent = () => {
  const navigation = useNavigation(); 
  const handleBackButton = () => {
    navigation.goBack();
    navigation.goBack();
    // navigation.goBack();
    return true; 
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
    return () => {
      backHandler.remove();
    };
  }, []);
  const [events,setEvents] = useState([]); 
  useEffect(()=>{
    const fetchData = ()=>{
      axios.get('https://oscode-backend-service.onrender.com/events').then((response)=>{
        const newData = response.data;
        newData.reverse();  
        setEvents(newData);
      }).catch((err)=>{
        console.log(err);
      })
    };
    fetchData();  
  },[]);
 console.log("events",events);
  const renderItem = ({ item }) => (
    <Card id = {item._id} name={item.name} image={item.image} people={item.people} active={item.active} address={item.address} date={item.date} registrations={item.registrations}  />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:24,fontWeight:'bold',marginLeft:15}}>Latest Events:</Text>
      <Text style={{marginTop:8,marginLeft:15}}>Check out the latest upcoming events</Text>
      <FlatList
        style={{marginTop:10}}
        data={events}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </SafeAreaView>
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