import React,{useState} from 'react';
import { View, Text, StyleSheet, Platform ,Button,Picker,TextInput ,ScrollView,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyComponent = () => {
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState('Option 1');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [collegeName,setCollegeName] = useState('');
    const [year,setYear] = useState('');
    const [course,setCourse] = useState('');
    const [specz,setSpecz] = useState('');
    const [projects,setProjects] = useState('');
    const [bio,setBio] = useState('');
    const [linkedIn,setLinkedIn] = useState('');
    const [github,setGithub] = useState('');
    const [insta,setInsta] = useState('');
    const [otherSite,setOtherSite] = useState('');
    
    const sendData = ()=>{
        const data =  {
            name:name,
            email:email,
            phone:phone,
            collegeName:collegeName,
            year:year,
            course:course,
            specialization:specz,
            projects:projects,
            bio:bio,
            linkedIn:linkedIn,
            github:github,
            insta:insta,
            others:otherSite
        }
      axios.post('http://localhost:3000/sendInfo',data).then((response)=>{
      console.log(response);
      setPhone("");
      setBio("");
      setCollegeName("");
      setCourse("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setYear("");
      setName("");
      setGithub("");
      setLinkedIn("");
      setOtherSite("");
      setInsta("");
      setSpecz("");
      setProjects("");
      setSelectedValue("");
      AsyncStorage.setItem('AuthToken',token);
      navigation.navigate("Main");
    })
    .catch((error)=>{
      console.log("error",error);
    })
    };

    //   const [date,setDate] = useState(new Date());
//   const [show,setShow] = useState(false);
//   const [dateText,setDateText] = useState('asdf');

//   const onChange = (event,selectedDate) => {
    // const currentDate = selectedDate || date;
    // // setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    // let tempDate = new Date(currentDate);
    // setDateText(tempDate.getDate()+"/"+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear());
    
  

  return (
    <View style={styles.container}>
        <ScrollView>
        <Text style={{marginTop:20,fontSize:20,fontWeight:'bold'}}>
            Enter your details
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-around',gap:20}}>
        <TextInput
        style={[styles.input,{width:150}]}
        onChangeText={(text)=>{
            setFirstName(text);
            setName((firstName+" "+lastName).trim())
              
        }}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={[styles.input,{width:150}]}
        onChangeText={(text)=>{
            setLastName(text);
            setName((firstName+" "+lastName).trim());;
        }}
        value={lastName}
        placeholder="Last Name"
      />
      
      </View>
      
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setEmail(text);
        }}
        placeholder="Email"
        value={email}
      />
      
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setPhone(text);
        }}
        placeholder="Phone"
        value={phone}
      />

    
    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setCollegeName(text);
        }}
        placeholder="College Name"
        value={collegeName}
      />

    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setYear(text);
        }}
        placeholder="Year"
        value={year}
      />

    <Picker 
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select Course" value="Select Course" />
        <Picker.Item label="BE/BTech" value="BE/BTech" />
        <Picker.Item label="BCA" value="BCA" />

      </Picker>
    
    <Picker 
        selectedValue={specz}
        onValueChange={(itemValue) => setSpecz(itemValue)}
        style={styles.dropdown}
      >
        <Picker.Item label="Select Specialization" value="Select Specialization" />
        <Picker.Item label="AIML" value="AIML" />
        <Picker.Item label="CSE" value="CSE" />
        <Picker.Item label="ISE/IT" value="ISE/IT" />
      </Picker>
    
      <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setProjects(text);
        }}
        placeholder="Projects"
        value={projects}
      />

    <TextInput
        style={[styles.input,{height:100}]}         multiline={true}
        textAlignVertical="top"
        onChangeText={(text)=>{
            setBio(text);
        }}
        placeholder="Bio"
        value={bio}
      />

    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setLinkedIn(text);
        }}
        placeholder="LinkedIn"
        value={linkedIn}
      />

    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setGithub(text);
        }}
        placeholder="Github"
        value={github}
      />

    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setInsta(text);
        }}
        placeholder="Instagram"
        value={insta}
      />

    <TextInput
        style={styles.input}
        onChangeText={(text)=>{
            setOtherSite(text);
        }}
        placeholder="Any Other Site"
        value={otherSite}
      />

    <TouchableOpacity onPress={sendData} style={{width:320,height:50,marginTop:20,marginBottom:20,justifyContent:'center',backgroundColor:'#e84371',alignItems:'center',borderRadius:50}}>
          <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>
              Submit
          </Text>
      </TouchableOpacity>


        {/* <Button title="DatePick" onPress={()=>{
            setShow(true);
        }}/>
        <Text>{dateText}</Text>
        {
        show && (
            <DateTimePicker testID='dateTimePicker' value={date} mode={'date'} is24Hour={true} display='default' onChange={onChange} />
        )
    } */}
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  dropdown:{
    paddingHorizontal: 8,
    borderRadius:10,
    marginTop:20,
    width:320,
    height:50,
    paddingVertical:5

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
});

export default MyComponent;