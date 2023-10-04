import {React,useState,useEffect} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput,TouchableOpacity,Image,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const MyComponent = () => {
  const navigation = useNavigation();
  useEffect(()=>{
    const checkLoginStatus = async ()=>{
      try{

        const token = await AsyncStorage.getItem("AuthToken");

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
      axios.post('https://oscode-backend-service.onrender.com/login',otpData).then((response)=>{
      console.log(response);
      setNumber("");
      setUserName("");
      setPassword("");
      navigation.navigate("otp",{data:sendData});
    })
    .catch((error)=>{
      showAlert();
      console.log("error",error);
    })
    }catch(err){
      console.log(err);
    }
  };  
    const [number,setNumber] = useState('');
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const showAlert = () => {
      Alert.alert(
        'Login Failed',
        "Could'nt send otp",
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
          },
        ],
        { cancelable: false }
      );
    };
  return (
    <View style={styles.container}>
     <View style = {{justifyContent:'center', alignItems:'center'}}>
          
            <Image source={require('../oscode.png')} style={{marginTop:120 ,width:200,height:200}}>
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
      {/* <TextInput
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
      /> */}
        </View>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <TouchableOpacity onPress={handleSignUp}style={{width:300,height:50,marginTop:20,justifyContent:'center',backgroundColor:'black',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Log in
          </Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row',gap:4,marginTop:10}}>
      <Text style={{fontWeight:'bold'}}>Already Have An Account?</Text>
        <Pressable onPress={()=>{navigation.navigate('Register');}}>
        <Text style={{color:'#04c8ff',fontWeight:'bold'}}>Sign up</Text>
        </Pressable>
      </View>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
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