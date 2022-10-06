import { StyleSheet, Text, View,Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/images/user.png')} style={styles.profilePic} />
      <Text style={styles.name}>Walter White</Text>
      <View style={styles.about}>
        <Text style={styles.aboutText}>
        You clearly don’t know who you’re talking to, so let me clue you in. I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No! I am the one who knocks!
        </Text>
      </View>
      <View style={styles.contact}>
        <Text style={styles.contactHeading}>Email</Text>
        <Text style={styles.contactText}>heisenberg@hotmail.com</Text>
        <Text style={styles.contactHeading}>Contact Number</Text>
        <Text style={styles.contactText}>99999999999</Text>
        <Text style={styles.contactHeading}>Address</Text>
        <Text style={styles.contactText}>
        308 Belmont Avenue
        Ontario, California 91764
        USA 
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#F7FFF7",
      alignItems: 'center',
    },
    profilePic: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderWidth: 10,
      borderColor: "#4ECDC4",
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: "#1A535C",
      textAlign: 'center',
      marginTop: 20,
    },
    about: {
      marginTop: 20,
      width: 350,
      backgroundColor: "#4ECDC459",
      borderRadius: 15,
      padding: 10,
      paddingVertical: 20,
    },
    aboutText: {
      fontSize: 15,
      fontFamily: 'Poppins',
      color: "#1A535C",
    },
    contact: {
      marginTop: 20,
      width: 350,
    },
    contactHeading: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: "#FF6B6B",
    },
    contactText: {
      fontSize: 15,
      fontFamily: 'Poppins',
      color: "#1A535C",
    }

  });