import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Pressable, useState,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";
import { setState } from "react";
import { getDocs,collection,doc,setDoc } from "firebase/firestore";
//import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";

import { useNavigation } from '@react-navigation/native';

import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';

import Icon from 'react-native-vector-icons/FontAwesome';


// async function addNewUserInfo(email,password,confirmpassword){

//    try{

//       if(password != confirmpassword){
//          alert("Passwords do not match");
//          return;
//       }

//       if(email==null || password==null){
//          alert("Please enter all fields");
//          return;
//       }

      

     
//      const user_query =  await query_db("Email", "==", email,users_collection);
//      const org_query =  await query_db("Email", "==", email,organisations_collection);
//      if (!(user_query.empty && org_query.empty)){

//          alert("Email already exists. Please use a different email");
//          return;
//      }


//      const db_doc = {
//          "Name": name,
//          "Age": age,
//          "UserID" : UserID,
//          "About Me": aboutme,
//          "Profession":profession,
//          "Email": email,
//          "Phone": phone,
//          "Location": {
//              "City": city,
//              "State": state,
//              "Pincode": pincode
//          },
//          "Level":1,
//          "Interests":array,
//          "Completed_Jobs":0,
//          "Ongoing_Jobs":0,
//          "Average_Rating":null,


     
     
//      };
//      const redirectpageHTML = loading_html;    
//      document.body.innerHTML = redirectpageHTML;
//      await addNewDoc(db_collection,db_doc);
     

     
//      console.log("New User Details Added");
//      const newredirectpageHTML = user_profile_html;
//      window.location = top_level_url + newredirectpageHTML;

//  }
//  catch(error){
//      console.log(error);
//      alert("Error Occured. Please try again");
 
//  }

// }

export const Signup = ({ setIsSigned, setIsLogged }) => {
   let state = {
      mail: 'demo',
      password: 'demo'
   };
  const navigation = useNavigation();
   // const { passwordVisibility, rightIcon, handlePasswordVisibility } =
   //    useTogglePasswordVisibility();
  let passwordVisibility = true;
  let rightIcon = 'eye';
 
  const handlePasswordVisibility = () => {
     console.log("entered handlePasswordVisibility");
    if (rightIcon === 'eye') {
       rightIcon = 'eye-off';
       passwordVisibility = !passwordVisibility;
    } else if (rightIcon === 'eye-off') {
      rightIcon = 'eye';
      passwordVisibility = !passwordVisibility;
    }
  };

   return (
      
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>
            <View style={styles.container}>
               <Text style={styles.title}>Welcome</Text>
               <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Email</Text>
                     <TextInput style={styles.input} 
                    
                     />
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Password</Text>
                     <View>
                     <TextInput style={styles.input}
                        secureTextEntry={passwordVisibility}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="newPassword"
                     />
                     {/* <Pressable onPress={handlePasswordVisibility}>
                        <Icon name={rightIcon} size={22} color="#232323" />
                     </Pressable> */}
                     </View>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Confirm Password</Text>
                     <TextInput secureTextEntry={true} style={styles.input} />
                  </View>
               </View>
               <TouchableOpacity style={styles.button}
                  onPress={async() => {
                     try{

                        // if(password != confirmpassword){
                        //    Alert.alert("Passwords do not match");
                        //    return;
                        // }
                  
                        // if(email==null || password==null || confirmpassword==null){
                        //    Alert.alert("Please enter all fields");
                        //    return;
                        // }
                        
                        let email = "";
                        let image = "";
                        let name = "";
                        let aboutme = "I'm passionate about helping people and making a difference in the world";
                        let UserID = "";
                        let profession = "Student";
                        let phone = "9074567890";
                        let city = "Mumbai";
                        let state = "Maharashtra";
                        let pincode = 400001;
                        let array = ["Education","Environment","Healthcare","Animal Welfare"];
                        let age = 20;


                        
                        auth.onAuthStateChanged(async function(user) { //If User logged in on startup
    
                           if (user) {
                         
                              email = user.email;
                              image = user.photoURL;
                              name = user.displayName;
                              UserID = user.uid;
                           }
                        });
                       
                        const user_query =  await query_db("Email", "==", email,users_collection);
                        const org_query =  await query_db("Email", "==", email,organisations_collection);
                        if (!(user_query.empty && org_query.empty)){
                     
                              alert("Email already exists. Please use a different email");
                              return;
                        }
                  
                  
                        const db_doc = {
                              "Name": name,
                              "Age": age,
                              "UserID" : UserID,
                              "About Me": aboutme,
                              "Profession":profession,
                              "Email": email,
                              "Phone": phone,
                              "Location": {
                                 "City": city,
                                 "State": state,
                                 "Pincode": pincode
                              },
                              "Level":1,
                              "Interests":array,
                              "Completed_Jobs":0,
                              "Ongoing_Jobs":0,
                              "Average_Rating":null,
                     
                     
                        
                        
                        };
                        const db_collection = users_collection;
                        await addNewDoc(db_collection,db_doc);
                        
                     
                        
                        console.log("New User Details Added");
                        
                     
                        }
                        catch(error){
                           console.log(error);
                           alert("Error Occured. Please try again");
                        
                        }
                     
                     
                     setIsSigned(true);
                     setIsLogged(true);

//                     navigation.navigate("ProfileCreation")

                  }}
               >
                  <Text style={styles.text}>Sign Up</Text>
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