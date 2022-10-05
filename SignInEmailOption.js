import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

export const SignInEmailOption = ({ }) => {

   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <ScrollView style={styles.scroll}>
               <TouchableOpacity style={styles.button}
                  onPress={() => navigation.navigate("Signup")}
               >
                  <Text style={styles.text}>Coninue with Email</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.googleButton}
                  onPress={() => navigation.navigate("Signup")}
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