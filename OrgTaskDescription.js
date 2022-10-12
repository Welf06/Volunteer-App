import { StyleSheet, Text, View, Image, Linking,Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import { doc,updateDoc } from "firebase/firestore";
import { addNewDoc,query_db,users_collection,organisations_collection,auth,tasks_collection,volunteers_collection } from "./methods.js";
import { db} from "./config.js";



export const OrgTaskDescription = ({ route }) => {

  
   const [org_data, setOrgData] = useState([]);
   const [isVolunteered, setIsVolunteered] = useState(false);
   const [user, setUser] = useState(null);
   const [isUser, setIsUser] = useState(false);
   
   const data = route.params;
   //const [task_data, setTaskData] = useState(data.data);
   //setTaskData(data.data);
   const imgsrc = {
      "Environmental": require("./assets/images/environment.png"),
      "Community": require("./assets/images/community.png"),
      "Animal": require("./assets/images/user.png"),
      "Education": require("./assets/images/education.png"),
      "Health":require("./assets/images/education.png"),
   }
   // let org_address = "";
   // let org_website = "";
   // let org_phone = "";
   // let org_description = "";
   // let org_email = "";

   useEffect(() => {auth.onAuthStateChanged(async function(user) {
      if (user) {

         // currentUser should be available now
         const user_query =  await query_db("Email", "==", user.email,users_collection);
         if(user_query.empty){
           // isUser = false;
           setIsUser(false);
            

         }
         else{
            //isUser = true;
            setIsUser(true);
         }
            const user_info = {
               "Name": user.displayName,
               "Email": user.email,
               "Photo": user.photoURL,
            }
            setUser(user_info);
           // isUser = true;
            let org_dat = {};
            const org_info = await query_db("Name", "==", data.data.organisation,organisations_collection);
            org_info.forEach((doc) => {
               org_dat = {
                  "Name": doc.data().Name,
                  "Address": doc.data().Address,
                  "Phone": doc.data().Phone,
                  "Email": doc.data().Email,
                  "Website": doc.data().Website,
                  "Description": doc.data()["About Us"],
                  "OrgID": doc.data().OrgID,

               }
               setOrgData(org_dat);
            });

            const volunteers_query = await query_db("Email", "==", user.email,volunteers_collection);
            for(const doc of volunteers_query.docs){
               if(doc.data().TaskID == data.data.taskID){ //check if user has already submitted for volunteering
                     setIsVolunteered(true);
               }
            }
         

      }
      else{
            console.log("could not load user info from google");
            // No user logged in.
      }
   });}, []);

   if(org_data.length == 0) {
      return(
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      )
   }
   else{ 
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
                  <Text style={styles.logoText}>
                     {data.data.remote ? "Remote" : data.data.location}
                  </Text>
               </View>
            </View>
            <View style={styles.descriptionContainer}>
               <Text style={styles.subtitle}>Job Description</Text>
               <Text style={styles.description}>{data.data.description}</Text>
            </View>
            <View style={styles.descriptionContainer}>
               <Text style={styles.subtitle}>{org_data.Name}</Text>
               {/* placeholder */}
               <Text style={styles.description}>{`${org_data.Description}`} </Text>
            </View>
            <View style={styles.tagContainer}>
               <View style={styles.logoContainer}>
                  <Icon name="phone" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>{`${org_data.Phone}`}</Text>
               </View>
               <View style={styles.logoContainer}>
                  <Icon name="envelope" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>{`${org_data.Email}`}</Text>
               </View>
               {/* <View style={styles.logoContainer}>
                  <Icon name="search" size={15} color="#FF6B6B" />
                  <Text style={styles.logoText}>abc.org</Text>
               </View> */}
            </View>

            <View style={styles.dataContainer}>
               <View style={styles.dataTile}>
                  <Icon name="clock-o" size={40} color="#FF6B6B" />
                  <Text style={styles.data}>{`${data.data.startDate}`}</Text>
               </View>
               <View style={styles.dataTile}>
                  {/* <Icon name="male" size={17} color="#FF6B6B" /> */}
                  <Text style={styles.dataIcon}>{`${data.data.volunteersCount}`}</Text>
                  <Text style={styles.data}>Volunteers</Text>
               </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
               <Text style={styles.editText}>Edit Task</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
         </View>
      )
   }
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
      fontSize: 25,
      fontWeight: "bold",
   },
   tagContainer: {
      flexDirection: "row",
      marginBottom: 5,
      // justifyContent: "center",
   },
   logoContainer: {
      flex: 1,
      flexDirection: "row",
      color: "#FF6B6B",
      alignItems: "center",
      justifyContent: "center",
   },
   logoText: {
      color: "#FF6B6B",
      fontSize: 14,
      fontWeight: "500",
      paddingLeft: 2
   },
   descriptionContainer: {
      flex:1,
      padding: 10,
   },
   subtitle: {
      color: "#10383F",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 2,
   },
   description: {
      color: "#1A535C",
      fontSize: 14,
      fontWeight: "400",
   },
   volunteerButton: {
      backgroundColor: "#1A535C",
      width: "100%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
   }, 
   volunteerText: {
      color: "#F7FFF7",
      fontSize: 24,
   },
   dataContainer: {
      flexDirection: "row",
      padding: 10,
      marginTop: 10,
      flex: 1,
   },
   dataTile: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

   },
   data: {
      color: "#FF6B6B",
      fontSize: 14,
      fontWeight: "500",
   },
   dataIcon: {
      color: "#FF6B6B",
      fontSize: 30,
      fontWeight: "700",
   },
   loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   editButton: {
      backgroundColor: "#1A535C",
      width: "100%",
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
   }, 
   editText: {
      color: "#F7FFF7",
      fontSize: 24,
   },
});



