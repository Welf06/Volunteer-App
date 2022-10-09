import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addNewDoc,users_collection,organisations_collection,auth } from "./methods.js";
export const ProfileCreation = ({ setIsSigned, setIsLogged }) => {
   const navigation = useNavigation();
    const [userData, setUserData] = useState({
      name: '',
      phone: '',
      age:'',
      interests:[],
      city:'',
      state:'',
      pincode:'',
      country:'',
      profession:'',
     
      aboutMe: '',
        
    });

   return (
      
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>
            <View style={styles.container}>
               <Text style={styles.title}>Profile</Text>
               <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>User Name</Text>
                     <TextInput style={styles.input} />
                     <TextInput style={styles.input} onChangeText={(text) => setUserData({...userData, name: text})} value={userData.name}/>
                  </View>
                  <View>
                  <Text style={styles.formLabel} >Age</Text>
        <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => setUserData({...userData, age: text})} value={userData.age}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Contact Number</Text>
                     <TextInput style={styles.input} />
                     <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text) => setUserData({...userData, phone: text})} value={userData.phone}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>City</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, city: text})} value={userData.city}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>State</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, state: text})} value={userData.state}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Pincode</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, pincode: text})} value={userData.pincode}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Country</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, country: text})} value={userData.country}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Profession</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, profession: text})} value={userData.profession}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Tell Us About Yourself</Text>
                     <TextInput style={styles.multilineInput} multiline={true} numberOfLines={4} onChangeText={(text) => setUserData({...userData, aboutMe: text})} value={userData.aboutMe}/>
                  </View>
                  
               </View>
               <TouchableOpacity style={styles.button}
                  onPress={async () => {
                    let email = "";
                    let id = "";
                    await auth.onAuthStateChanged(async function (user) { //If User logged in on startup
                        if (user) {
                          email = user.email;
                          id = user.uid;
                        }
                        else{
                            console.log("No user logged in");
                        }
                      });

                    //if(userData.name && userData.age && userData.phone && userData.city && userData.state && userData.pincode && userData.country && userData.profession && userData.address && userData.aboutMe){{

                       
    
                        const db_doc = {
                            "Name": userData.name,
                            "Phone": userData.phone,
                            "Location": {
                                 "City": userData.city,
                                 "State": userData.state,
                                 "Pincode": userData.pincode,
                                 "Country": userData.country
                              },
                            
                            "Email": email,
                            
                            "About Me": userData.aboutMe,
                            "Completed_Jobs": [],
                            "Ongoing_Jobs": [],
                            "UserID": id,
                            "Age": userData.age,
                            "Average_Rating":null,
                            "Completed_Jobs":0,
                            "Level":0,
                           "Profession":userData.profession,
                           "Interests":["Education","Healthcare","Environment","Social Welfare","Animal Welfare"]                        
                        };
                        const db_collection = users_collection;
                        await addNewDoc(db_collection,db_doc);
                        /*
    
                            "Email": email,
                            "Start Time": start_time,
                            "End Time": end_time,
                            "Start Date": start_date,
                            "End Date": end_date,
                            "VolunteerHours": hours,
                            "OrgID": OrgID,
                            "VolunteersCount":0,
                            "TaskID":taskID,
                            "Country":country,
                        */
                        console.log(userData);
                        console.log("User Added to Database");
                        setIsSigned(true);
                        setIsLogged(true);
                        navigation.navigate('Feed');
                        // Send data to backend
                    
    
                }}>
                    
               
                  <Text style={styles.text}>Continue</Text>
               </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F7FFF7",
      alignItems: 'center',
   },
   scroll: {
      flex: 1,
      margin: 20,
      marginLeft: 0,
      marginRight: 0,
   },
   title: {
      fontSize: 24,
      fontFamily: 'Poppins',
      color: "#1A535C",
      textAlign: 'center',
      marginBottom: 30,
      marginTop: 40,
   },
   formContainer: {
      flex: 1,
      backgroundColor: "#F7FFF7",
   },
   inputContainer: {
      flex: 1,
      backgroundColor: "#F7FFF7",
      marginTop: 10,
   },
   inputTitle: {
      fontSize: 18,
      fontFamily: 'Poppins',
      color: "#1A535C",
      paddingTop: 10,
   },
   input: {
      height: 30,
      marginVertical: 10,
      borderWidth: 2,
      width: 300,
      borderBottomColor: "#10383F",
      borderTopColor: "#F7FFF7",
      borderLeftColor: "#F7FFF7",
      borderRightColor: "#F7FFF7",
      fontFamily: 'Poppins',
      color: "#1A535C",
   },
   button: {
      marginTop: 30,
      backgroundColor: "#1A535C",
      width: 200,
      height: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: "#F7FFF7",
      fontSize: 18,
      fontFamily: 'Poppins',
   },
}); 
