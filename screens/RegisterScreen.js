import {React,useState} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,TouchableOpacity,Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const MyComponent = () => {
  
  const navigation = useNavigation();
    const [number,setNumber] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
  const handleSignUp = ()=>{
    try{
      const otpData = {
          number:number        
      };
      axios.post('http://localhost:3000/signup',otpData).then((response)=>{
      console.log(response);
      setNumber("");
      setUsername("");
      setPassword("");
      navigation.navigate("otp",{data:otpData});
    })
    .catch((error)=>{
      console.log("error",error);
    })
    }catch(err){
      console.log(err);
    }
  };  
  return (
    <View style={styles.container}>
        <Pressable onPress={()=>{
          navigation.navigate('Login');
        }} style = {
    {width: 40,
    height: 40,
    marginTop:20,
    marginLeft:20,
    borderColor:'gray',
    borderWidth:1,
    borderRadius: 50, 
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center'}} >
        <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
        <View style = {{justifyContent:'center', alignItems:'center'}}>
            <Text style={{marginTop:20,fontSize:25,fontWeight:'bold',color:'black'}}>
                Sign up
            </Text>
            <Text style={{marginTop:15,fontSize:18,color:'black'}}>
                Fill the form below to sign up
            </Text>
            <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setNumber(text);
        }}
        value={number}
        placeholder="Enter phone here"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setUsername(text);
        }}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setPassword(text);
        }}
        value={password}
        placeholder="Password"
      />
        </View>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <TouchableOpacity onPress={handleSignUp}style={{width:300,height:50,marginTop:100,justifyContent:'center',backgroundColor:'#e84371',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Sign up
          </Text>
      </TouchableOpacity>
      <Text style={{marginTop:10,fontWeight:'bold'}}>
        Already Have An Account? <Pressable onPress={()=>{
            navigation.navigate('Login');
        }}> <Text style={{color:'#e84371'}}>
            Log in
        </Text>
        </Pressable>
      </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input:{
    borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        height:50,
        marginTop:20,
        width:300,
        borderRadius:10,
        paddingVertical:5
  }
});

export default MyComponent;