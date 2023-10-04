import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import OtpScreen from './screens/OtpScreen';
import TalksScreen from './screens/TalksScreen';
import EventScreen from './screens/EventScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import InfoScreen from './screens/InfoScreen';

const MyComponent = () => {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    function BottomTabs(){
      return (
        <Tab.Navigator>
          <Tab.Screen name="Events"   
                      component={EventScreen}
                      options = {{
                      tabBarLabel:"Events",
                      tabBarLabelStyle:{color:"black"},
                      headerShown:false,
                      tabBarIcon:({focused})=> focused ? (
                        <MaterialCommunityIcons name="message" size={24} color="black" />
                        ) : (
            <Feather name="message-square" size={24} color="black" />
                                  )
                    }}
                      />
          <Tab.Screen name="Feed"   
                      component={FeedScreen}
                      options = {{
                      tabBarLabel:"Feed",
                      tabBarLabelStyle:{color:"black"},
                      headerShown:false,
                      tabBarIcon:({focused})=> focused ? (
<MaterialCommunityIcons name="lightning-bolt" size={24} color="black" />
) : (
<MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="black" />
                        )
                    }}
                      />
          
          <Tab.Screen name="Talks"   
                      component={TalksScreen}
                      options = {{
                      tabBarLabel:"Talks",
                      tabBarLabelStyle:{color:"black"},
                      headerShown:false,
                      tabBarIcon:({focused})=> focused ? (
                        <Ionicons name="tv" size={24} color="black" />
) : (
<Ionicons name="tv-outline" size={24} color="black" />                      )
                    }}
                      />
           <Tab.Screen name="Profile"   
                      component={ProfileScreen}
                      options = {{
                      tabBarLabel:"Profile",
                      tabBarLabelStyle:{color:"black"},
                      headerShown:false,
                      tabBarIcon:({focused})=> focused ? (
                        <Ionicons name="person" size={24} color="black" />
                        ) : (
                        <Ionicons name="person-outline" size={24} color="black" />
                      )
                    }}
                      />
        </Tab.Navigator>
      );
    }
    return (
        <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>

        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>




        <Stack.Screen name="Info" component={InfoScreen} options={{headerShown:false}}/>





        <Stack.Screen name="otp" component={OtpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        </Stack.Navigator>    
        </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;
