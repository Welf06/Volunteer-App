import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Pressable, useState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

// import { useTogglePasswordVisibility } from './useTogglePasswordVisibility';

import Icon from 'react-native-vector-icons/FontAwesome';

export const Signup = ({ setIsSigned, setIsLogged }) => {

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
                     <TextInput style={styles.input} />
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
                  onPress={() => {
                     navigation.navigate("ProfileCreation")
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