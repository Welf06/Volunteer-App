import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Icon from 'react-native-vector-icons/FontAwesome';

export const TaskDescription = ({ route }) => {
   const data = route.params;
   const imgsrc = {
      "Environmental": require("./assets/images/environment.png"),
      "Community": require("./assets/images/community.png"),
      "Animal": require("./assets/images/animal.png"),
      "Education": require("./assets/images/education.png"),
   }
   console.log(data);
   return (
      <View style={styles.container}>
         <Image source={imgsrc[data.data.type]} style={styles.image} />
         <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.data.name}</Text>
         </View>
         <View style={styles.tagContainer}>
            <View style={styles.logoContainer}>
               {data.data.type === "Environmental" && <Icon name="tree" size={15} color="#FF6B6B" />}
               {data.data.type === "Community" && <Icon name="user" size={15} color="#FF6B6B" />}
               {data.data.type === "Animal" && <Icon name="paw" size={15} color="#FF6B6B" />}
               {data.data.type === "Education" && <Icon name="book" size={15} color="#FF6B6B" />}
               {data.data.type === "Health" && <Icon name="medkit" size={15} color="#FF6B6B" />}

               <Text style={styles.logoText}>{`${data.data.type} `}</Text>

            </View>
            <View style={styles.logoContainer}>
               <Icon name="map-marker" size={17} color="#FF6B6B" />
               <Text style={styles.logoText}>{`${data.data.location} `}</Text>
            </View>
            <View style={styles.logoContainer}>
               <Icon name="male" size={17} color="#FF6B6B" />
               <Text style={styles.logoText}>10 Volunteers</Text>
            </View>
         </View>
         <View style={styles.descriptionContainer}>
            <Text style={styles.subtitle}>Job Description</Text>
            <Text style={styles.description}>{data.data.description}</Text>
         </View>
         <View style={styles.descriptionContainer}>
            <Text style={styles.subtitle}>Organisation Description</Text>
            {/* placeholder */}
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elementum velit, eu lobortis eros. Suspendisse vehicula imperdiet nunc, sed tincidunt mi venenatis vel. Suspendisse at lectus vel ligula lobortis porttitor. </Text>
         </View>
         <View style={styles.tagContainer}>
            <View style={styles.logoContainer}>
               <Icon name="phone" size={15} color="#FF6B6B" />
               <Text style={styles.logoText}>9999888811</Text>
            </View>
            <View style={styles.logoContainer}>
               <Icon name="envelope" size={15} color="#FF6B6B" />
               <Text style={styles.logoText}>abc@gmail.com</Text>
            </View>
            <View style={styles.logoContainer}>
               <Icon name="search" size={15} color="#FF6B6B" />
               <Text style={styles.logoText}>abc.org</Text>
            </View>
         </View>
         <View style={styles.volunteerButton}>
               <Text style={styles.volunteerText}>Volunteer</Text>
            </View>
         <StatusBar style="auto" />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F7FFF7",
   },
   image: {
      width: "100%",
      height: 200,
   },
   titleContainer: {
      backgroundColor: "rgba(78, 205, 196, 0.3);",
      padding: 10,
      marginBottom: 5,
   },
   title: {
      color: "#10383F",
      fontSize: 20,
      fontWeight: "bold",
   },
   tagContainer: {
      flexDirection: "row",
      marginBottom: 5,
   },
   logoContainer: {
      flexDirection: "row",
      color: "#FF6B6B",
      alignContent: "center",
      alignItems: "center",
      width: "33%",
      justifyContent: "center",

   },
   logoText: {
      color: "#FF6B6B",
      fontSize: 13,
      fontWeight: "500",
      paddingLeft: 2
   },
   descriptionContainer: {
      padding: 10,
   },
   subtitle: {
      color: "#10383F",
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 2,
   },
   description: {
      color: "#1A535C",
      fontSize: 12,
      fontWeight: "400",
   },
   volunteerButton: {
      backgroundColor: "#1A535C",
      width: "100%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      position: "absolute",
      bottom: 0,
   }, 
   volunteerText: {
      color: "#F7FFF7",
      fontSize: 24,
   }


});


