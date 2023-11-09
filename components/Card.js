import {React,useState,useContext,useEffect} from 'react';
import { View, Text, StyleSheet,Modal, Image,Pressable,TouchableOpacity,TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StudentType} from '../studentContext';
// function formatDateToDDMMYYYY(date) {
//     const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
  
//     return `${day}/${month}/${year}`;
//   }

const Card = ({ id,name, image , people, active, address,date ,registrations }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {studId,setStudId} = useContext(StudentType);
  useEffect(()=>{
    const fetchUsers = async ()=>{
        const token = await AsyncStorage.getItem("AuthToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.studentId;
        console.log(userId);
        setStudId(userId);
    }
    fetchUsers();
  },[]);
  const [studentname,setStudentName] = useState("");
  const [college,setCollegeName] = useState("");
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const registerUser=()=>{
    axios.put(`https://oscode-backend-service.onrender.com/events/${id}/register`, { userId: studId })
    .then(response => {
      console.log('User registered successfully:', response.data);
    })
    .catch(error => {
      console.error('Error registering user:', error);
    });
  };
  const formatDateToDDMMYYYY = (date)=> {
        const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
    }
      
const formattedDate = formatDateToDDMMYYYY(new Date(date));
  return (
    
    <View style={styles.card}>
     
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
        <Text style={styles.cardTitle}>{name}</Text>
        {
            active?(<Text style={{fontSize:14,fontWeight:'bold',marginTop:3,color:'green'}}>ACTIVE</Text>):(<Text style={{fontSize:14,fontWeight:'bold',marginTop:3,color:'red'}}>INACTIVE</Text>)
        }
        </View>
        
        <View style={{flexDirection:'row',gap:3,marginBottom:5}}>
            <EvilIcons name="location" size={24} color="black" style={{marginTop:5}} />
            <Text style={styles.cardDescription}>{address}</Text>
        </View>

        <View style={{flexDirection:'row',gap:5,marginBottom:5}} >
            <Entypo name="calendar" size={24} color="black" style={{marginTop:5}}/>
            <Text style={styles.cardDescription}>{formattedDate}</Text>
        </View>

        <View style={{flexDirection:'row',gap:3,marginBottom:5}}>
            <Octicons name="people" size={24} color="black" style={{marginTop:5}}/>
            <Text style={styles.cardDescription}>{registrations.length}</Text> 
        </View>
        <Pressable onPress={openModal}>
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={closeModal}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Enter your name and college for confirmation. </Text>
              <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setStudentName(text);
        }}
        placeholder="Name"
        value={studentname}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setCollegeName(text);
        }}
        placeholder="College"
        value={college}
      />
       <TouchableOpacity disabled={registrations.includes(studId)?true:false} onPress={registerUser}style={{width:300,height:50,marginTop:20,justifyContent:'center',backgroundColor:'black',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>{registrations.includes(studId)?'USER ALREADY REGISTERED':'CONFIRM & REGISTER'}  
          </Text>
      </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text>DISMISS</Text>
              </TouchableOpacity>
              </View>
          </View>
        </Modal>
        <View style={{ flexDirection:'row' , justifyContent:'flex-end'}}>
          <Text style={{fontWeight:'bold'}}>{registrations.includes(studId)?'REGISTERED':'REGISTER'}</Text>
        </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
    margin: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    width:200
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 200,
      height: 2,
    }
},
input:{
  borderColor: 'gray',
      backgroundColor:'white',
      borderWidth: 1,
      paddingHorizontal: 8,
      height:50,
      marginTop:20,
      width:320,
      borderRadius:10,
      paddingVertical:8
}
}
);

export default Card;