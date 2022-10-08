import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { getAuth, signInWithPopup,GoogleAuthProvider,signInWithRedirect } from "firebase/auth"
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";


async function signInWithGoogleAsync() {
   try{
      
      
          
      
      const auth_result   = await signInWithPopup(auth, provider)
      
                  
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(auth_result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = auth_result.user;
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

     

      console.log(email);
      // Create a query against the collection.
      
      const user_query = await query_db("Email", "==", email,users_collection);
      const org_query = await query_db("Email", "==", email,organisations_collection);
      console.log("user_query",user_query.empty);
      console.log("org_query",org_query.empty);
      let isNewUser = "";
      if(user_query.empty && org_query.empty){
         isNewUser = true;
      }
      else{
         isNewUser = false;
      }
      
      
      if(isNewUser){
         console.log("new user");
         return ["new","Signup"]//navigation.navigate("Signup");
      }
      else{
         if(!org_query.empty){
            //navigation.navigate("Feed");
            return [true,"OrganizationFeed"]//navigation.navigate("Feed");
         }
         else{
            
            //console.log(setIsOrganisation);
            //setIsOrganisation(true);
            //navigation.navigate("OrganizationFeed");
            return [false,"Feed"]//navigation.navigate("Feed");
         }
      }
      //const details = await getAdditionalUserInfo(auth_result)


      
          
  }          
          
  catch(error){
      console.error(`Could not complete Authentication: ${error}`);
      // const returnPageHTMLOnError = index_html;
      // const returnHTML = await getPage(returnPageHTMLOnError);
      //     //document.body.innerHTML = data; // Do we need this?
      // window.location =  top_level_url + returnPageHTMLOnError; //MIGHT NOT WORK IN APP
      // let logged_in = false;

  }
}

export const SignInEmailOption = ({ setIsOrganisation }) => {

   console.log(setIsOrganisation);
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
                 
                  onPress={async ()=>{

                     const arr = await signInWithGoogleAsync();
                     if(arr[0]!="new"){
                        setIsOrganisation(arr[0]);
                        navigation.navigate(arr[1]);
                     }
                     else{
                        //setIsOrganisation(true);
                        navigation.navigate("VolunteerOptions");
                     }
                     


                  }}   //() => navigation.navigate("Signup")}
               >
                  <Image source={require('./assets/images/google logo.png')} style={styles.googleImage} />
                  <Text style={styles.googleText}>Continue with Google</Text>
               </TouchableOpacity>
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