import { StyleSheet, Text, View,Image } from 'react-native';
import {useState,useEffect} from 'react';

import { query_db,users_collection,organisations_collection,auth} from "./methods.js";



export const Profile = ({profileData,setProfileData}) =>{
  useEffect(() => {
      auth.onAuthStateChanged(async function(user) { //If User logged in on startup
          
      if (user) {
          setProfileData({"Email":user.email});
          const org_query =  await query_db("Email", "==", user.email,organisations_collection);
          if(!org_query.empty){ //If user is an organisation
              setProfileData({"Email":user.email,"Name":org_query.docs[0].data().Name,"Description":org_query.docs[0].data()["About Us"],"Location":org_query.docs[0].data().Location});
          }

          else{
              const user_query =  await query_db("Email", "==", user.email,users_collection);
              if(!user_query.empty){
                  setProfileData({"Email":user.email,"Name":user_query.docs[0].data().Name,"Description":user_query.docs[0].data()["About Me"],"Location":user_query.docs[0].data().Location});
              }
          }
          
        // User is signed in.
      }
    });
  }, []);  
    if(profileData["Name"] != undefined){   
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
      </View>
    );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F7FFF7",
      alignItems: 'center',
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

  });