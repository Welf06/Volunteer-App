import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';


export const VolunteerOption = ({ setIsOrganisation }) => {

   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button}
               onPress={() => {
                  setIsOrganisation(false),
                  navigation.navigate('Signup')}}
            >
               <Text style={styles.text}>Volunteer</Text>
            </TouchableOpacity>
            <Text style={styles.or} >OR</Text>
            <TouchableOpacity style={styles.button}
               onPress={() => {setIsOrganisation(true);
                  navigation.navigate('ProfileCreation')}}
            >
               <Text style={styles.text}>Organization</Text>
            </TouchableOpacity>
            <Text style={styles.signintext} >Already Registered? <Text onPress={() => {
                  navigation.navigate("Login")
               }} style={styles.signin}>Sign in</Text> Instead</Text>
         </View>
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
   buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
   },
   button: {
      marginTop: 20,
      backgroundColor: "#1A535C",
      width: 300,
      height: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
   },
   text: {
      color: "#F7FFF7",
      fontSize: 20,
      fontFamily: 'Poppins',
   },
   or: {
      color: "#1A535C",
      fontSize: 20,
      fontFamily: 'Poppins',
      marginTop: 20,
   },
   signintext: {
      color: "#1A535C",
      fontSize: 16,
      fontFamily: 'Poppins',
      marginTop: 20,
   },
   signin: {
      color: "#1A535C",
      fontSize: 16,
      fontFamily: 'Poppins',
      fontWeight: 'bold',
   },

});