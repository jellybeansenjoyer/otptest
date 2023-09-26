import React,{useState} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent = ({route}) => {
    const [myOtp,setMyOtp] = useState(['','','','']);
    const navigation = useNavigation();
    const {data} = route.params;    
    const  handleVerification = () =>{
        console.log(myOtp);
        let str = "";
        myOtp.forEach((ele)=>{
            str=str+ele;
        });
        const otpdata = {
            otpCode:str,
            number:data.number
        };
        try{
        axios.post('http://localhost:3000/verify',otpdata).then((response)=>{

            if(response.data.verified===true){
                if(response.data.token!==undefined){
                    const token = response.data.token;
                    AsyncStorage.setItem('AuthToken',token);
                    navigation.navigate('Main');
                }else
                    navigation.navigate('Info');
            }else{
                console.log('incorrect otp');
            }
        }).catch((err)=>{
            
            console.log(err);
        })
        }catch(err){
        console.log(err);
    }
    };
    const handleSignUp = ()=>{
        try{
          const otpData = {
              number:data.number        
          };
          axios.post('http://localhost:3000/signup',otpData).then((response)=>{
          console.log(response);
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
        navigation.navigate('Register');
    }}style = {
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
            Enter OTP
        </Text>
        <Text style={{marginTop:15,fontSize:18,color:'black'}}>
            Enter the 4 digit codes sent to {data.number}
        </Text>
        
   
    </View>
    <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        <TextInput 
        onChangeText={(text)=>{
            myOtp[0] = text;
            setMyOtp(myOtp);
        }} style={styles.textbox} maxLength={1} keyboardType='numeric'>
        </TextInput>
        <TextInput 
        onChangeText={(text)=>{
            myOtp[1] = text;
            setMyOtp(myOtp);
        }} style={styles.textbox} maxLength={1} keyboardType='numeric'>
        </TextInput>
        <TextInput 
        onChangeText={(text)=>{
            myOtp[2] = text;
            setMyOtp(myOtp);
        }} style={styles.textbox} maxLength={1} keyboardType='numeric'>
        </TextInput>
        <TextInput onChangeText={(text)=>{
            myOtp[3] = text;
            setMyOtp(myOtp);
        }} 
        style={styles.textbox} maxLength={1} keyboardType='numeric'>
        </TextInput>
    </View>
    <TouchableOpacity onPress={handleVerification} style={{ alignSelf:'center',width:300,height:50,marginTop:50,justifyContent:'center',backgroundColor:'#e84371',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Verify OTP
          </Text>
      </TouchableOpacity>
    <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontWeight:'bold'}}>Did'nt get it? <Pressable onPress={handleSignUp}><Text style={{color:'#e84371'}}>
            Resend
            </Text>
            </Pressable>
            </Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textbox:{
    textAlign:'center',
    paddingVertical:2,
    paddingHorizontal:4,
    fontSize:20,
    width:50,
    height:50,
    borderRadius:10,
    backgroundColor:'white'}
});

export default MyComponent;