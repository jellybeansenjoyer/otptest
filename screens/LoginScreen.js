import {React,useState,useEffect} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,TouchableOpacity,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Alert from 'react-native-alert';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const MyComponent = () => {
  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try{
      const token = await AsyncStorage("AuthToken");
        if(token){
            navigation.replace("Main");
        }
      }catch(err){
          console.log("error",err);  
      }
    };
  checkLoginStatus();
  },[]);
  const handleSignUp = ()=>{
    try{
      const otpData = {
          number:number        
      };
      const sendData = {
          number:number,
          screen:"Login"
      }
      axios.post('http://localhost:3000/login',otpData).then((response)=>{
      console.log(response);
      setNumber("");
      setUserName("");
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
  const navigation = useNavigation();
    const [number,setNumber] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
  return (
    <View style={styles.container}>
     <View style = {{justifyContent:'center', alignItems:'center'}}>
          
            <Image source={'https://www.oscode.co.in/assets/img/logo.webp'} style={{marginTop:40 ,width:200,height:200}}>
            </Image>
            <Text style={{marginTop:10,fontSize:25,fontWeight:'bold',color:'black'}}>
                LOGIN
            </Text>
            <Text style={{margin:10,marginTop:15,fontSize:18,color:'black', textAlign:'center'}}>
                Enter phone number or username to Log-in
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
            setUserName(text);
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
              Log in
          </Text>
      </TouchableOpacity>
      <Text style={{marginTop:10,fontWeight:'bold'}}>
        Already Have An Account? <Pressable onPress={()=>{
            navigation.navigate('Register');
        }}> <Text style={{color:'#04c8ff'}}>
            Sign up
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