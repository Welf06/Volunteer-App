import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { addNewDoc,getPage,sign_out,query_db,new_task_details_html,org_profile_html,user_profile_html,users_collection,organisations_collection,auth,provider,top_level_url,index_html,loading_html,temp_html,new_user_details_html,new_organisation_details_html,environment,isNewUser,userType_html,createFile,uploadFile,downloadFile,tasks_collection,user_feed_html,task_images_storage_path,view_task_html,get_param_value,loadTasks,goToTask,volunteers_collection } from "./methods.js";
import { firebase,db,storage} from "./config.js";
import { TextMaskMethods } from 'react-native-masked-text';


auth.onAuthStateChanged(async function(user) { //If User logged in on startup
    
    if (user) {
        const org_query =  await query_db("Email", "==", user.email,organisations_collection);
        if(!org_query.empty){ //If user is an organisation
          
            // window.location = top_level_url + org_profile_html;
            // console.log("org signed in");
        }
        else{
            const user_query =  await query_db("Email", "==", user.email,users_collection);
            if(user_query.empty){
                // alert("User not found. Please sign in again or contact admin");
                // sign_out();


            }
            //window.location = top_level_url + user_feed_html;
            console.log("user signed in");
        }
        
      // User is signed in.
    } else {
      // No user is signed in.
    }
});

export const Login = ({ setIsLogged }) => {
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
                        onPress={() => setIsLogged(true)}
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