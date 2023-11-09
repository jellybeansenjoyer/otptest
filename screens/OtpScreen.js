import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet,Pressable,TextInput ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import {StudentType} from '../studentContext';
import jwt_decode from 'jwt-decode';

const MyComponent = ({route}) => {
    const [error,setError] = useState('');
    const {studId,setStudId} = useContext(StudentType);
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
        axios.post('https://oscode-backend-service.onrender.com/verify',otpdata).then((response)=>{

            if(response.data.verified===true){
                console.log(response.data.token);
                if(response.data.token!==undefined){
                    const token = response.data.token;
                    AsyncStorage.setItem('AuthToken',token);
                    if(data.screen==='Login')
                        navigation.navigate('Main');
                    else{
                        
                    }
                }else{
                    const dataToSend = {
                        name:data.username,
                        phone:data.number,
                    }
                    axios.post('https://oscode-backend-service.onrender.com/sendInfo',dataToSend).then((response)=>{
                        const decodedToken = jwt_decode(response.data.token);
                        const userId = decodedToken.studentId;
                        console.log(userId);
                        setStudId(userId);
                          AsyncStorage.setItem('AuthToken',response.data.token);
                        navigation.navigate('Info');

                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            }else{
                console.log('incorrect otp');
            }
        }).catch((err)=>{
            setError(err.response.data.message)
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
          if(data.screen!=='Login'){
            axios.post('https://oscode-backend-service.onrender.com/signup',otpData).then((response)=>{
                console.log(response);
              })
              .catch((error)=>{
                console.log("error",error);
              });
          }else{
            axios.post('https://oscode-backend-service.onrender.com/login',otpData).then((response)=>{
            setStudId(response.data._id);
            console.log(response.data);
        })
        .catch((error)=>{
          console.log("error",error);
        });
          }
          
        }catch(err){
          console.log(err);
        }
      };

  const [timeInSeconds, setTimeInSeconds] = useState(120);
  
  useEffect(() => {
    
    if (timeInSeconds > 0) {
      const timer = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeInSeconds]);

  // Format the remaining time as minutes and seconds
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;


    return (
    <SafeAreaView style={styles.container}>
    <Pressable onPress={()=>{
        navigation.navigate('Login');
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
    <TouchableOpacity onPress={handleVerification} style={{ alignSelf:'center',width:300,height:50,marginTop:50,justifyContent:'center',backgroundColor:'black',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Verify OTP
          </Text>
      </TouchableOpacity>
    <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontWeight:'bold'}}>Did'nt get it? <Pressable onPress={()=>{
            handleSignUp()
            setTimeInSeconds(300);
            }} disabled={timeInSeconds===0?false:true}><Text style={{color:timeInSeconds===0?'#04c8ff':'gray'}}>Resend</Text>
            </Pressable>
        </Text>
        
    <Text style={{color:'black'}}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</Text>
    <Text style={{color:'red',textWeight:'bold'}}>{error===''?'':error}</Text>
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:20,
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