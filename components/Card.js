import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// function formatDateToDDMMYYYY(date) {
//     const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
//     const year = date.getFullYear();
  
//     return `${day}/${month}/${year}`;
//   }
const Card = ({ name, image , people, active, address,date  }) => {
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
            <Text style={styles.cardDescription}>{people}</Text> 
        </View>
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
  },
  cardDescription: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default Card;