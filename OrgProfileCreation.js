import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { addNewDoc,users_collection,organisations_collection,auth } from "./methods.js";
export const OrgProfileCreation = ({ setIsSigned, setIsLogged }) => {
    const navigation = useNavigation();
    const [orgData, setOrgData] = useState({
        name: '',
        phone: '',
        address: '',
        website: '',
        aboutUs: '',
        
    });

   return (
    
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>
            <View style={styles.container}>
               <Text style={styles.title}>Profile</Text>
               <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Organisation Name</Text>
                     <TextInput style={styles.input} onChangeText={(text) => setOrgData({...orgData, name: text})} value={orgData.name}/>
                  </View>
                  
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Contact Number</Text>
                     <TextInput style={styles.input} keyboardType="phone-pad" onChangeText={(text) => setOrgData({...orgData, phone: text})} value={orgData.phone}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Address</Text>
                     <TextInput style={styles.input} multiline={true} numberOfLines={2} onChangeText={(text) => setOrgData({...orgData, address: text})} value={orgData.address}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Tell Us About Yourself</Text>
                     <TextInput style={styles.input} multiline={true} numberOfLines={2} onChangeText={(text) => setOrgData({...orgData, aboutUs: text})} value={orgData.aboutUs}/>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Website</Text>
                     <TextInput style={styles.input} onChangeText={(text) => setOrgData({...orgData, website: text})} value={orgData.website}/>
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
                          console.log("email"+email);
                        }
                        else{
                            console.log("No user logged in");
                        }
                      });
                      console.log("email"+email);
                    if(orgData.aboutUs && orgData.address && orgData.name && orgData.phone && orgData.website ){{
                       
    
                        const db_doc = {
                            "Name": orgData.name,
                            "Phone": orgData.phone,
                            "Address": orgData.address,
                            "Email": email,
                            "Website": orgData.website,
                            "About Us": orgData.aboutUs,
                            "Completed Projects": [],
                            "Ongoing Projects": [],
                            "OrgID": id,


                        
                        };
                        const db_collection = organisations_collection;
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
                        console.log(orgData);
                        console.log("Org Added to Database");
                        setIsSigned(true);
                        setIsLogged(true);
                        navigation.navigate('OrganizationFeed');
                        // Send data to backend
                    }}else{
                        Alert.alert("Please fill all the fields");
                    }
    
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