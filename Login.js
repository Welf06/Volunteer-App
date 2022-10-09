import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { query_db,users_collection,organisations_collection,auth,provider } from "./methods.js";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth"


async function signInWithGoogleAsync() {
    try{
       const auth_result   = await signInWithPopup(auth, provider)
       const credential = GoogleAuthProvider.credentialFromResult(auth_result);
       const token = credential.accessToken;
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
             return [true,"OrganizationFeed"]
          }
          else{
             return [false,"Feed"]
          }
       }      
   }             
   catch(error){
       console.error(`Could not complete Authentication: ${error}`);
   }
 }

export const Login = ({ setIsOrganisation, setIsLogged }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Email</Text>
                            <TextInput style={styles.input} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput secureTextEntry={true} style={styles.input} />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => setIsLogged(true)}
                    >
                        <Text style={styles.text}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.or} >OR</Text>
                    <TouchableOpacity style={styles.googleButton}
                        onPress={async ()=>{

                            const arr = await signInWithGoogleAsync();
                            setIsLogged(true);
                            setIsLogged(true);
                            if(arr[0]!="new"){
                               setIsOrganisation(arr[0]);
                               navigation.navigate(arr[1]);
                               
                            }
                            else{
                               navigation.navigate("VolunteerOptions");
                            }
                            
       
       
                         }}
                    >
                        <Text style={styles.googleText}>Login with Google</Text>
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
        marginTop: 20,
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
    or: {
        fontSize: 18,
        fontFamily: 'Poppins',
        color: "#1A535C",
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    googleButton: {
        backgroundColor: "#F7FFF7",
        width: 200,
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: "#1A535C",
    },
    googleText: {
        color: "#1A535C",
        fontSize: 14,
        fontFamily: 'Poppins',
    },


}); 