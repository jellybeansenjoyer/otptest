import React, { useEffect, useState ,useContext} from 'react';
import { View, Text, StyleSheet,Image, TextInput, Pressable, TouchableOpacity,ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StudentType} from '../studentContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyComponent = () => {
  const {studId,setStudId} = useContext(StudentType);
  const navigation = useNavigation();
  const [showWebView, setShowWebView] = useState(false);
  const [url,setUrl] = useState('');
  const [userData,setUserData] = useState({});
  const [bio,setBio] = useState('');
  useEffect(()=>{
    const fetchUsers = async ()=>{
        const token = await AsyncStorage.getItem("AuthToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.studentId;
        setStudId(userId);
    }
    fetchUsers();
  },[]);
  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data with key "${key}" removed successfully`);
    } catch (error) {
      console.error(`Error removing data with key "${key}":`, error);
    }
  };
  const handleLogout = ()=>{
    removeData("AuthToken");
    navigation.navigate("Login");
  }
  const updateBio = (userId)=>{
    const data = {
      "bio":bio
    }
    axios.put(`https://oscode-backend-service.onrender.com/users/${userId}/update-bio`,data).then((res)=>{
      setUserData(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    const getUserData = (userId)=>{
        axios.get(`https://oscode-backend-service.onrender.com/users/${userId}`).then((response)=>{
          setUserData(response.data);
        }).catch((err)=>{
          console.log(err);
        })
    }
    getUserData(studId);
  },[]);
  return (
    <SafeAreaView style={styles.container}>
       {showWebView ?  (
        <WebView source={{ uri: url }} style={{ flex: 1 }} />):( 
     <ScrollView>
          <View style={{ position: 'relative'}}>

            <Image style={{width:'100%' ,height:150,position:'absolute'}} 
                 source={{uri:'https://static.vecteezy.com/system/resources/thumbnails/007/617/338/small/triangle-shape-background-pattern-green-gradient-yellow-vector.jpg'}}/>
            <View style={styles.overlayingView}>
                <Text style={{fontSize:20,fontWeight:'bold'}}>{userData.name!==undefined?userData.name.charAt(0):userData.name}</Text>
            </View> 
           </View>
           <View style={{marginTop:240,marginLeft:20,marginRight:20}}>
              <Text style={{fontWeight:'bold',fontSize:20}}>{userData.name}</Text>
              <View style={{flexDirection:'row',marginTop:5}}>
              <FontAwesome name="map-pin" size={16} color="black" />
              <Text style={{marginLeft:10,color:'gray'}}>{userData.collegeName}</Text>
              </View>
              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>BIO</Text>
              <TextInput value={bio} onChangeText={(text)=>{
                setBio(text);
              }} style={{marginTop:5,width:'90%',height:50,borderWidth:1,borderRadius:10,borderColor:'gray',padding:5}} multiline={true} placeholder={`${userData.bio}`} ></TextInput>              
              <Pressable onPress={updateBio(studId)}>
                <Text style={{fontSize:14,fontStyle:'bold',color:'darkgray',
                alignSelf:'flex-end',
                marginRight:40,marginTop:5}}>SAVE</Text>
              </Pressable>
              <View style={{height:0.2,backgroundColor:'gray',marginTop:10,width:'90%',
              alignSelf:'center'
              }}></View>
              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>EDUCATION</Text>
              <Text style={{marginTop:5}}>{`${userData.collegeName}, ${userData.course}, ${userData.specialization} `}</Text>
              <View style={{height:0.2,backgroundColor:'gray',marginTop:10,width:'90%',
              alignSelf:'center'
              }}></View>
              
              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>LINKS</Text>
              <View style={{marginTop:5,flexDirection:'row',gap:15}}>
              <Pressable onPress={()=>{
                setUrl(userData.linkedIn);
                setShowWebView(true);
              }}>
                <AntDesign name="github" size={24} color="black" />
              </Pressable>
              <Pressable onPress={()=>{
                setUrl(userData.github);
                setShowWebView(true);
              }}>
              <Ionicons name="logo-linkedin" size={24} color="black" />
              </Pressable>
              </View>
              <View style={{height:0.2,backgroundColor:'gray',marginTop:10,width:'90%',alignSelf:'center'}}></View>

              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>PERSONAL INFORMATION</Text>
              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>PHONE</Text>
              <Text style={{marginTop:5}}>{userData.phone}</Text>
              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>EMAIL</Text>
              <Text style={ {marginTop:5}}>{userData.email}</Text>

              <View style={{height:0.2,backgroundColor:'gray',marginTop:10,width:'90%',
              alignSelf:'center'
              }}></View>

              <Text style={{marginTop:10,fontWeight:'bold',color:'#333333'}}>PORTFOLIO</Text>
              <TouchableOpacity style={{marginTop:5,justifyContent:'center',alignItems:'center',width:'100%',alignSelf:'center',height:40,borderRadius:10,borderWidth:1,borderColor:'gray'}}>
                <Text style={{fontStyle:'bold'}}>+ADD PROJECT</Text>
              </TouchableOpacity>
              
              <Pressable onPress={handleLogout}>
              <View style={{width:90,height:40,top:20,borderRadius:5,borderWidth:1,borderColor:'red',justifyContent:'center',alignItems:'center',marginBottom:100}}>
                  <Text style={{fontStyle:'bold',color:'red'}}>LOG OUT</Text>
              </View>
            </Pressable>
          </View> 
           </ScrollView>)}
      </SafeAreaView>
  );
};
      
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },  
  overlayingView: {
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute', 
    top: 100, 
    width: 115,
    left:30,
    borderRadius:10,
    height: 115,
    borderWidth:1,
    borderColor:'black',
    backgroundColor: 'darkgrey',
    zIndex: 1
  }, 
});  

export default MyComponent;