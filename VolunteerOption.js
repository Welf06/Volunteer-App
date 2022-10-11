import { StyleSheet, Text, TouchableOpacity, View,Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const VolunteerOption = ({ setIsOrganisation }) => {
   
   const navigation = useNavigation();

   return (
      <View style={styles.container}>
         <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.button}
               onPress={() => {
                  setIsOrganisation(false),
                  navigation.navigate('ProfileCreation')}}
            >
               <Icon name="user" style={styles.icon}/>
               <Text style={styles.text}>Volunteer</Text>
            </TouchableOpacity>
            <Text style={styles.or} >OR</Text>
            <TouchableOpacity style={styles.button}
               onPress={() => {setIsOrganisation(true);
                  navigation.navigate('OrgProfileCreation')}}
            >
               <Icon name="building" style={styles.icon}/>
               <Text style={styles.text}>Organization</Text>
            </TouchableOpacity>
            {/* <Text style={styles.signintext} >Already Registered? <Text onPress={() => {
                  navigation.navigate("Login")
               }} style={styles.signin}>Sign in</Text> Instead</Text> */}
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
      flexDirection:'row',
      marginTop: 20,
      backgroundColor: "#1A535C",
      width: 300,
      height: 100,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:5,
   },
   text: {
      paddingLeft:10,
      color: "#F7FFF7",
      fontSize: 25,
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
   icon:{
      fontSize:50,
      color:"#F7FFF7",
   }

});