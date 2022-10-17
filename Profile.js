import { StyleSheet, Text, View,Image } from 'react-native';


import { query_db,users_collection,organisations_collection,auth} from "./methods.js";


let user_name = "";
let user_email = "";
let contact_number = "";
let user_address = "";
let user_bio = "";
let user_image = "";

auth.onAuthStateChanged(async function(user) { //If User logged in on startup
    
  if (user) {
      user_email = user.email;
      user_image = user.photoURL;
      const org_query =  await query_db("Email", "==", user.email,organisations_collection);
      if(!org_query.empty){ //If user is an organisation
          user_name = org_query.docs[0].data().Name; 
          contact_number = org_query.docs[0].data().Phone;
          user_address = org_query.docs[0].data().Address;
          user_bio = org_query.docs[0].data()["About Us"];
      }
      else{
          const user_query =  await query_db("Email", "==", user.email,users_collection);
          if(!user_query.empty){
              user_name = org_query.docs[0].data().Name; 
              contact_number = user_query.docs[0].data().Phone;
              user_address = user_query.docs[0].data().Location["City"] + ", " + doc.data().Location["Pincode"] + ", " + doc.data().Location["State"];
              user_bio = user_query.docs[0].data()["About Me"];
          }
      console.log("user signed in");
      }
      
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

export const Profile = ({isGoogleAuth}) => {
  return (
    <View style={styles.container}>

        <View style={styles.profilePic}>
          <Text style={styles.profileText}>{user_name.slice(0,1)}</Text>
        </View>  
        <Text style={styles.name}>{user_name}</Text>
        <View style={styles.about}>
        <Text style={styles.aboutText}>{user_bio}</Text>
      
      </View>
      <View style={styles.contact}>
      
          <Text style={styles.contactHeading}>Email </Text>
          <Text style={styles.contactText}>{user_email}</Text>
          <Text style={styles.contactHeading}>Contact Number </Text>
          <Text style={styles.contactText}>{contact_number}</Text>
          <Text style={styles.contactHeading}>Address </Text>
          <Text style={styles.contactText}>{user_address}</Text>


       
      </View>
    </View>
  );
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
      backgroundColor: "#FF6B6B",
      justifyContent: "center",
      alignItems: "center",
    },
    profileText:{       
      fontSize: 100,
      color: "#F7FFF7",
    },
    name: {
      fontSize: 30,
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