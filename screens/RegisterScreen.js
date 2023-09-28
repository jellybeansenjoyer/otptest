import {React,useState} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,TouchableOpacity,Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
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
      const sendData = {
        number:number,
        screen:"Register"        
    };
      axios.post('https://oscode-backend-service.onrender.com/signup',otpData).then((response)=>{
      console.log(response);
      setNumber("");
      setUsername("");
      setPassword("");
      navigation.navigate("otp",{data:sendData});
    })
    .catch((error)=>{
      console.log("error",error);
    })
    }catch(err){
      console.log(err);
    }
  };  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={()=>{
          navigation.navigate('Login');
        }} style = {
    {width: 40,
    height: 40,
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
        <Image source={'https://www.oscode.co.in/assets/img/logo.webp'} style={{marginTop:10 ,width:200,height:200}}>
            </Image>
            <Text style={{marginTop:10,fontSize:25,fontWeight:'bold',color:'black'}}>
                SIGN UP
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
      <TouchableOpacity onPress={handleSignUp}style={{width:300,height:50,marginTop:100,justifyContent:'center',backgroundColor:'black',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Sign up
          </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',gap:4,marginTop:10}}>
      <Text style={{fontWeight:'bold'}}>Already Have An Account?</Text>
        <Pressable onPress={()=>{navigation.navigate('Login');}}>
        <Text style={{color:'#04c8ff',fontWeight:'bold'}}>Login</Text>
        </Pressable>
      </View>
      </View>
      </ScrollView>
    </SafeAreaView>
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