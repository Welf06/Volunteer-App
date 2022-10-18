import { StyleSheet, Text, View,Image } from 'react-native';
import {useState,useEffect} from 'react';

import { Loading } from './Loading.js';
import { query_db,users_collection,organisations_collection,auth} from "./methods.js";
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Profile = ({navigation,profileData,setLogOut}) =>{

    if(profileData["Name"] == undefined){
        return <Loading />
    }   
      return (
      <View style={styles.container}>

          <View style={styles.profilePic}>
            <Text style={styles.profileText}>{profileData.Name.slice(0,1)}</Text>
          </View>  
          <Text style={styles.name}>{profileData.Name}</Text>
          <View style={styles.about}>
          <Text style={styles.aboutText}>{profileData.Description}</Text>
        
        </View>
        <View style={styles.contact}>
        
            <Text style={styles.contactHeading}>Email </Text>
            <Text style={styles.contactText}>{profileData.Email}</Text>
            <Text style={styles.contactHeading}>Contact Number </Text>
            <Text style={styles.contactText}>{profileData.Phone}</Text>
            <Text style={styles.contactHeading}>Address </Text>
            <Text style={styles.contactText}>{profileData.Address}</Text>


        
        </View>
        <TouchableOpacity style={styles.button} onPress={async () => {
            await setLogOut(true);
            // navigation.navigate('SignInEmailOption');
        }}>
          <Icon name="sign-out" size={30} color="#F7FFF7" /> 
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

      </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F7FFF7",
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    profilePic: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#FF6B6B",
      justifyContent: "center",
      alignItems: "center",
    },
    profileText:{       
      fontSize: 100,
      color: "#F7FFF7",
    },
    name: {
      fontSize: 30,
      fontFamily: 'Poppins',
      color: "#1A535C",
      textAlign: 'center',
      marginTop: 20,
    },
    about: {
      marginTop: 20,
      width: 350,
      backgroundColor: "#4ECDC459",
      borderRadius: 15,
      padding: 10,
      paddingVertical: 20,
    },
    aboutText: {
      fontSize: 15,
      fontFamily: 'Poppins',
      color: "#1A535C",
    },
    contact: {
      marginTop: 20,
      width: 350,
    },
    contactHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: "#FF6B6B",
    },
    contactText: {
      fontSize: 15,
      fontFamily: 'Poppins',
      color: "#1A535C",
    }
    ,
    button: {
      // marginTop: 20,
      width: 350,
      backgroundColor: "#1A535C",
      height: 60,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 15,
    },
    buttonText: {
      fontSize: 20,
      paddingLeft: 10,
      fontFamily: 'Poppins',
      color: "#F7FFF7",
    }

  });