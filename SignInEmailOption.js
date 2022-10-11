import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { signInWithPopup,GoogleAuthProvider,signInWithCredential } from "firebase/auth"
import { users_collection,organisations_collection,auth,provider,query_db, isNewUser } from "./methods.js";
import * as Google from 'expo-auth-session/providers/google';
import { useEffect,useState } from 'react';


export const SignInEmailOption = ({ setIsOrganisation,setIsSigned }) => {

   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: '51363481835-ofuhhpcteqcm2rod61bs6rf3rhfjkbrf.apps.googleusercontent.com',
      androidClientId: '133007557332-eqn7ohskg2u004ceknkdtn5pk7kvava4.apps.googleusercontent.com'  
   });

   const [arr,setArr] = useState([]);

   useEffect(() => {
      if (response?.type === 'success') {
         const {id_token} = response.params;
         const credential = GoogleAuthProvider.credential(id_token);
         signInWithCredential(auth,credential).then((auth_result)=>{
         const user = auth_result.user;
         const email = user.email;
         const displayName = user.displayName;
         // Create a query against the collection and wait for the query to complete.
         const user_query = query_db("Email", "==", email,users_collection);
         const org_query = query_db("Email", "==", email,organisations_collection);
         return Promise.all([user_query,org_query]).then((values)=>{
            const user_query = values[0];
            const org_query = values[1];
            if(user_query.empty && org_query.empty){
               setArr(["new","Signup"]);
            }
            else{
               if(!org_query.empty){
                  setArr([true,"OrganizationFeed"]);
               }
               else{
                  setArr([false,"Feed"]);
               }
            }
         }
         )
         })
      }
   }, [response]);

   useEffect(() => {
      if(arr.length>0){
         console.log(true);
         setIsSigned(true);
         if(arr[0]!="new"){
            setIsOrganisation(arr[0]);
            navigation.navigate(arr[1]);
         }
         else{
            console.log("Yessss");
            navigation.navigate("VolunteerOptions");
         }
      }
   }, [arr]);
  
   const navigation = useNavigation();
   return (
      
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>
               <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate("Signup")}
               >
                  <Text style={styles.text}>Continue with Email</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.googleButton}
                 
                  onPress={()=>{
                     promptAsync();
                     
                  }}   
               >
                  <Image source={require('./assets/images/google_logo.png')} style={styles.googleImage} />
                  <Text style={styles.googleText}>Continue with Google</Text>
               </TouchableOpacity>
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
      justifyContent: 'center',
      alignContent: 'center',
   },
   scroll: {
      flex: 1,
      margin: 20,
      marginLeft: 0,
      marginRight: 0,
   },
   button: {
      marginTop: 160,
      backgroundColor: "#1A535C",
      width: 300,
      height: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: "#F7FFF7",
      fontSize: 16,
      fontFamily: 'Poppins',
   },
   googleButton: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: "#F7FFF7",
      width: 300,
      height: 50,
      padding: 10,
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: "#1A535C",
   },
   googleText: {
      flex: 3,
      color: "#1A535C",
      fontSize: 16,
      fontFamily: 'Poppins',
   },
   googleImage: {
      width: 25,
      height: 25,
      marginRight: 30,
      marginLeft: 10,
   },

}); 