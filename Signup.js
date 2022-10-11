import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Pressable,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addNewDoc,users_collection,organisations_collection,auth } from "./methods.js";
import { useNavigation } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase, storage } from "./config.js";
import { ref,getDownloadURL  } from "firebase/storage";






export const Signup = ({ setIsSigned, setIsLogged,isOrganization }) => {

   let state = {
      mail: 'demo',
      password: 'demo'
   };
  const navigation = useNavigation();
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
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
  
   const onHandleSignupEmail = async () => {
      try {
         if (email !== '' && password !== '' && confirmPassword === password) {
           
            await createUserWithEmailAndPassword(auth,email, password);
            console.log("success!");
         }
         else{
            
            throw new Error("Passwords do not match");
         }

      } catch (error) {
         //setSignupError(error.message);
         console.log(error);
         throw error;
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
                     onChangeText={text => setEmail(text)}
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
                        onChangeText={text => setPassword(text)}
                     />
                     {/* <Pressable onPress={handlePasswordVisibility}>
                        <Icon name={rightIcon} size={22} color="#232323" />
                     </Pressable> */}
                     </View>
                  </View>
                  <View style={styles.inputContainer}>
                     <Text style={styles.inputTitle}>Confirm Password</Text>
                     <TextInput secureTextEntry={true} style={styles.input} 
                     onChangeText={text => setConfirmPassword(text)}
                     />
                  </View>
               </View>
               <TouchableOpacity style={styles.button}
                  onPress={async() => {
                  try{
                     await onHandleSignupEmail();                   
                     setIsSigned(true);
                     navigation.navigate("VolunteerOptions");
                  }catch(error){
      
                     console.log(error);
                  }
                     
                     
                   
                  }}
               >
                  <Text style={styles.text}>Sign Up</Text>
               </TouchableOpacity>
            </View>
            <Text style={styles.signintext} >Already Registered? <Text onPress={() => {
                  navigation.navigate("Login")
               }} style={styles.signin}>Sign in</Text> Instead</Text>
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
   signintext: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: "#1A535C",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
 },
 signin: {
    color: "#1A535C",
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
 },

}); 